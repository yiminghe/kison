import { langId } from './utils';
import { getAst } from '../cachedParser';
import type * as Monaco from 'monaco-editor';
import { Position } from '../parser';

const colors = [
  '#0000ff',
  // '#008000',
  '#9900cc',
  '#800000',
  '#00cc33',
  '#cc6600',
  '#cc0099',
  '#BB99FF',
  '#D999CC',
  '#288C44',
  '#4B6EEE',
  '#4D0D90',
  '#FF4AAA',
  '#B33066',
  '#F76522',
  '#6EB400',
  '#7890FF',
  '#8C4CC4',
  '#F48FB4',
  '#FF696F',
  '#FF9933',
  '#00AA88',
  '#29BBEE',
  '#966B9B',
  '#D77D7F',
  '#FC8C99',
  '#FFBF16',
  '#9F9922',
  '#88AEEE',
  '#FE4333',
  '#BA6A00',
];

let injected = false;

const prefix = `lang-formula-cell`;

function getLanguageId(model: Monaco.editor.ITextModel) {
  return model.getLanguageId
    ? model.getLanguageId()
    : (model as any).getModeId();
}

function injectStyle() {
  if (injected) {
    return;
  }
  injected = true;
  var css = colors.map((c, i) => `.${prefix}-${i} { color: ${c};}`).join('\n'),
    head = document.head || document.getElementsByTagName('head')[0],
    style = document.createElement('style');
  head.appendChild(style);
  style.type = 'text/css';
  style.appendChild(document.createTextNode(css));
}

export default function observe(monaco: typeof Monaco) {
  injectStyle();

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
    decorateCellAddress(model);
  }

  function decorateCellAddress(model: Monaco.editor.ITextModel) {
    const { tokens } = getAst(model.getValue());
    let colorId = 1;

    const decorationRangeList: Monaco.editor.IModelDeltaDecoration[] = [];

    const cellAddressIndex: Record<string, number> = {};

    tokens.forEach((token) => {
      if (token.token === 'CELL') {
        const tokenText = token.text.toLowerCase();
        if (!cellAddressIndex[tokenText]) {
          cellAddressIndex[tokenText] = colorId++;
        }
        let colorIndex = cellAddressIndex[tokenText];
        decorationRangeList.push({
          range: new monaco.Range(
            token.firstLine,
            token.firstColumn,
            token.lastLine,
            token.lastColumn,
          ),
          options: {
            inlineClassName: `${prefix}-${colorIndex}`,
          },
        });
      }
    });

    decorations = model.deltaDecorations(decorations, decorationRangeList);
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
