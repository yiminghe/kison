import {
  initMonaco,
  cachedParser,
  FormulaEngine,
  evaluate,
  CellAddress,
  utils,
} from '../src/index';
import type { LiteralToken } from '../src/index';
import functionNames from './functionNames';
import { getCellData } from './getCellData';
import type * as Manaco from 'monaco-editor';
import { makeFormula, makeString } from '../tests/utils';

const { toCoordString, parseCoord, isFormula } = utils;
const { getAst } = cachedParser;

// console.log(evaluators);

declare var require: any;
declare var monacoBase: string;
declare var monaco: typeof Manaco;

require.config({
  paths: {
    vs: monacoBase,
  },
});

const $ = (v: string) => document.getElementById(v)!;

const formulaKey = 'excel-formula';
const cellsKey = 'excel-cells';

require(['vs/editor/editor.main'], () => {
  function getEditorValue() {
    const v = editor.getModel()!.getValue().trim();
    localStorage.setItem(formulaKey, v);
    return v;
  }
  // @ts-ignore
  $('cells').value =
    localStorage.getItem(cellsKey) ||
    `
  A1: =2+c1
  A2: =3+a1
  B1: =4+a2
  B2: =5+b1
  c1: 10
  c2: 30
  d2: =2*sum(a1:b2)
  `
      .trim()
      .replace(/\n\s+/g, '\n');

  $('cells').style.height = '200px';
  $('cells').style.width = '500px';
  $('cells').style.display = 'block';

  initMonaco({
    monaco,
    getNames({ kind, table }) {
      if (kind === 'function') {
        return functionNames;
      }
      return [`${table}_column_1`, `${table}_column_2`];
    },
  });

  const editorContainer = $('monaco-editor');
  editorContainer.innerHTML = '';
  editorContainer.style.height = '100px';

  let editor = monaco.editor.create(editorContainer, {
    value:
      localStorage.getItem(formulaKey) ||
      'sum(A1:B2, 10, "OK", namedRange) + \n avg(A1:A3 \n',
    language: 'lang-formula',
    theme: 'lang-formula-theme',
    minimap: {
      enabled: false,
    },
    autoClosingBrackets: 'always',
    lineNumbers: 'on',
    folding: false,
  });

  $('fix').addEventListener('click', () => {
    let fixed = false;
    const value = getEditorValue();
    const { recoveryTokens } = getAst(value, {
      onErrorRecovery({ errorNode }, { action }) {
        if (action === 'add') {
          let token: LiteralToken = ')';
          const {
            parent: { symbol },
            error: { expected },
          } = errorNode;
          const hasToken = expected.indexOf(token) !== -1;
          if (
            (symbol === 'argumentsList' || symbol === 'functionExp') &&
            hasToken
          ) {
            fixed = true;
            return {
              action,
              token,
              text: token,
            };
          }
        }
      },
    });
    if (fixed) {
      const val = recoveryTokens
        .map((t) => (t.token === 'STRING' ? `"${t.text}"` : t.text))
        .join('');
      console.log('`' + value + '` will fixed to `' + val + '`');
      editor.getModel()!.setValue(val);
    }
  });

  function getCurrentAst() {
    const value = getEditorValue();
    return { value, ret: getAst(value, {}) };
  }

  $('parse').addEventListener('click', () => {
    console.log(getCurrentAst().ret);
  });

  $('evaluateData').addEventListener('click', () => {
    editor.getModel()!.setValue(`sum(a1:c2) + sum(a1:a2*b1:c1)`);
  });

  let engine: FormulaEngine = undefined!;

  function initSheet() {
    // @ts-ignore
    const cellStr = $('cells').value;
    localStorage.setItem(cellsKey, cellStr);
    const cells = getCellData(cellStr);
    console.log('cells data: ', cells);
    engine = new FormulaEngine();
    engine.initWithValues(cells);
  }

  $('initSheet').addEventListener('click', () => {
    initSheet();
  });

  initSheet();

  $('evaluate').addEventListener('click', () => {
    const {
      ret: { ast, error },
      value,
    } = getCurrentAst();
    if (error) {
      console.error('syntax error:', error);
    } else {
      const calValue = evaluate(ast, {
        dependencyGraph: engine.dependencyGraph,
      });
      console.log(value, ' = ', calValue);
    }
  });

  function refreshSheet() {
    let contents: string[] = [];
    function push(addr: CellAddress, content: any) {
      contents.push(toCoordString(addr) + ': ' + content);
    }
    for (let col = 1; col <= engine.width; col++) {
      for (let row = 1; row <= engine.height; row++) {
        const addr = { row, col };
        const cell = engine.getCellValue(addr);
        if (cell) {
          if (cell.type === 'formula') {
            push(addr, '=' + cell.formula);
          } else {
            push(addr, cell.value);
          }
        }
      }
    }
    // @ts-ignore
    $('cells').value = contents.join('\n');
  }

  $('insertRows').addEventListener('click', () => {
    const content = prompt('insert,count=1') || '';
    const cs = content.split(',');
    let before = parseInt(cs[0]);
    let count = parseInt(cs[1]) || 1;
    engine.insertRows(before, count);
    refreshSheet();
  });

  $('deleteRows').addEventListener('click', () => {
    const content = prompt('at,count=1') || '';
    const cs = content.split(',');
    let at = parseInt(cs[0]);
    let count = parseInt(cs[1]) || 1;
    engine.deleteRows(at, count);
    refreshSheet();
  });

  $('printCells').addEventListener('click', () => {
    let contents: any = {};
    function push(addr: CellAddress, content: any) {
      contents[toCoordString(addr)] = content;
    }
    for (let col = 1; col <= engine.width; col++) {
      for (let row = 1; row <= engine.height; row++) {
        const addr = { row, col };
        const cell = engine.getCellValue(addr);
        if (cell) {
          if (cell.type === 'formula') {
            push(addr, cell.value?.value);
          } else {
            push(addr, cell.value);
          }
        }
      }
    }
    console.log(contents);
  });

  $('setCell').addEventListener('click', () => {
    const l = prompt('cell') || '';
    const comma = l.indexOf(':');
    const indexStr = l.slice(0, comma);
    const value = l.slice(comma + 1).trim();
    let addr = parseCoord(indexStr);
    engine.setCellValue(
      addr,
      isFormula(value) ? makeFormula(value) : makeString(value),
    );
    refreshSheet();
  });
});
