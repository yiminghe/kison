import { langId, getAst } from "./utils.js";

const colors = [
  "#0000ff",
  // '#008000',
  "#9900cc",
  "#800000",
  "#00cc33",
  "#cc6600",
  "#cc0099",
  "#BB99FF",
  "#D999CC",
  "#288C44",
  "#4B6EEE",
  "#4D0D90",
  "#FF4AAA",
  "#B33066",
  "#F76522",
  "#6EB400",
  "#7890FF",
  "#8C4CC4",
  "#F48FB4",
  "#FF696F",
  "#FF9933",
  "#00AA88",
  "#29BBEE",
  "#966B9B",
  "#D77D7F",
  "#FC8C99",
  "#FFBF16",
  "#9F9922",
  "#88AEEE",
  "#FE4333",
  "#BA6A00"
];

let injected;

const prefix = `lang-formula-cell`;

function injectStyle() {
  if (injected) {
    return;
  }
  injected = true;
  var css = colors.map((c, i) => `.${prefix}-${i} { color: ${c};}`).join("\n"),
    head = document.head || document.getElementsByTagName("head")[0],
    style = document.createElement("style");
  head.appendChild(style);
  style.type = "text/css";
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

export default class InspectModel {
  constructor(monaco) {
    injectStyle();

    this._disposables = [];
    this._listener = {};
    this._decorations = [];
    this.monaco = monaco;

    this._disposables.push(monaco.editor.onDidCreateModel(this.onModelAdded));
    this._disposables.push(
      monaco.editor.onWillDisposeModel(this.onModelRemoved)
    );
    this._disposables.push(
      monaco.editor.onDidChangeModelLanguage(event => {
        this.onModelRemoved(event.model);
        this.onModelAdded(event.model);
      })
    );

    this._disposables.push({
      dispose() {
        monaco.editor.getModels().forEach(model => {
          this.onModelRemoved(model);
        });
      }
    });

    monaco.editor.getModels().forEach(this.onModelAdded);
  }

  onModelRemoved = model => {
    this.monaco.editor.setModelMarkers(model, langId, []);
    const key = model.uri.toString();
    if (this._listener[key]) {
      this._listener[key]();
      delete this._listener[key];
    }
  };

  onModelAdded = model => {
    if (model.getModeId() !== langId) {
      return;
    }

    let handle = undefined;
    const changeSubscription = model.onDidChangeContent(() => {
      clearTimeout(handle);
      handle = setTimeout(() => {
        this.injectModel(model);
      }, 500);
    });

    this._listener[model.uri.toString()] = () => {
      changeSubscription.dispose();
      clearTimeout(handle);
    };

    this.injectModel(model);
  };

  injectModel(model) {
    this._doValidate(model);
    this._decorateCellAddress(model);
  }

  dispose() {
    this._disposables.forEach(d => {
      d && d.dispose();
    });
    this._disposables = [];
  }

  _decorateCellAddress(model) {
    const { tokens } = getAst(model.getValue());
    let colorId = 1;

    const decorationRangeList = [];

    const cellAddressIndex = {};

    tokens.forEach(token => {
      if (token.token === "CELL") {
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
            token.lastColumn
          ),
          options: {
            inlineClassName: `${prefix}-${colorIndex}`
          }
        });
      }
    });

    this._decorations = model.deltaDecorations(
      this._decorations,
      decorationRangeList
    );
  }

  _doValidate(model) {
    const ret = getAst(model.getValue());
    const { errorNode, tokens } = ret;

    let token = errorNode;

    if (!errorNode || model.isDisposed()) {
      // model was disposed in the meantime
      this.monaco.editor.setModelMarkers(model, langId, []);
      return;
    }

    if (errorNode.token === "$EOF") {
      token = tokens[tokens.length - 2] || errorNode;
    }

    const markers = [
      {
        severity: monaco.MarkerSeverity.Error,
        startLineNumber: token.firstLine,
        startColumn: token.firstColumn,
        endLineNumber: token.lastLine,
        endColumn: token.lastColumn,
        message: errorNode.error.errorMessage
      }
    ];

    this.monaco.editor.setModelMarkers(model, langId, markers);
  }
}
