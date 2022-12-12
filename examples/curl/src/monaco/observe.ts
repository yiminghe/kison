import { langId } from './utils';
import { getAst } from './cachedParser';
import type * as Monaco from 'monaco-editor';
import { Position } from 'bash-parse';

export default function observe(monaco: typeof Monaco) {
  const disposables: Monaco.IDisposable[] = [];
  const listeners: Record<string, () => void> = {};
  let decorations: string[] = [];

  disposables.push(monaco.editor.onDidCreateModel(onModelAdded));
  disposables.push(monaco.editor.onWillDisposeModel(onModelRemoved));
  disposables.push(
    monaco.editor.onDidChangeModelLanguage((event) => {
      onModelRemoved(event.model);
      onModelAdded(event.model);
    }),
  );

  disposables.push({
    dispose() {
      monaco.editor.getModels().forEach((model) => {
        onModelRemoved(model);
      });
    },
  });

  monaco.editor.getModels().forEach(onModelAdded);

  function onModelRemoved(model: Monaco.editor.ITextModel) {
    monaco.editor.setModelMarkers(model, langId, []);
    const key = model.uri.toString();
    if (listeners[key]) {
      listeners[key]();
      delete listeners[key];
    }
  }

  function getLanguageId(model: Monaco.editor.ITextModel) {
    return model.getLanguageId
      ? model.getLanguageId()
      : (model as any).getModeId();
  }

  function onModelAdded(model: Monaco.editor.ITextModel) {
    if (getLanguageId(model) !== langId) {
      return;
    }

    let handle: number = 0;
    const changeSubscription = model.onDidChangeContent(() => {
      clearTimeout(handle);
      handle = window.setTimeout(() => {
        onModelChange(model);
      }, 500);
    });

    listeners[model.uri.toString()] = () => {
      changeSubscription.dispose();
      clearTimeout(handle);
    };

    onModelChange(model);
  }

  function onModelChange(model: Monaco.editor.ITextModel) {
    diagnose(model);
  }

  function diagnose(model: Monaco.editor.ITextModel) {
    const value = model.getValue();

    if (!value.trim()) {
      monaco.editor.setModelMarkers(model, langId, []);
      return;
    }

    const ret = getAst(value);
    const { errorNode, tokens } = ret;

    if (!errorNode || model.isDisposed()) {
      // model was disposed in the meantime
      monaco.editor.setModelMarkers(model, langId, []);
      return;
    }

    let token: Position = errorNode;

    if (errorNode.token === '$EOF') {
      token = tokens[tokens.length - 2] || errorNode;
    }

    const { expected } = errorNode.error;
    let markers: Monaco.editor.IMarkerData[] = [];
    const info = {
      severity: monaco.MarkerSeverity.Error,
      startLineNumber: token.firstLine,
      startColumn: token.firstColumn,
      endLineNumber: token.lastLine,
      endColumn: token.lastColumn,
    };

    if (expected.length) {
      markers = expected.map((e) => {
        return {
          ...info,
          message: `'${e}' expected.`,
        };
      });
    } else {
      markers.push({
        ...info,
        message: 'syntax error.',
      });
    }

    monaco.editor.setModelMarkers(model, langId, markers);
  }
}
