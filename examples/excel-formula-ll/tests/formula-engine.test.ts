import { utils, FormulaEngine, CellValue } from '../src/index';
const { parseCoord, toCoordString } = utils;
import { makeString, makeNumber, makeFormula } from './utils';

describe('dependency graph', () => {
  it.only('compute works', () => {
    const g = new FormulaEngine();

    // h-> g->f->d -> c -> b
    // f->h
    // k->f
    // e->c
    g.initWithValues([
      [
        makeNumber(1),
        makeFormula('a1'),
        makeFormula('b1+1'),
        makeFormula('c1+1'),
        makeFormula('c1+2'),
        makeFormula('d1+h1'),
        makeFormula('f1'),
        makeFormula('g1'),
        makeFormula('f1'),
      ],
    ]);
    expect(g.width).toBe(9);
    expect(g.height).toBe(1);
    const ret: CellValue[] = [];
    for (let col = 1; col <= 9; col++) {
      ret.push(g.getCellValue({ row: 1, col }));
    }
    expect(ret).toMatchInlineSnapshot(`
      Array [
        Object {
          "type": "number",
          "value": 1,
        },
        Object {
          "formula": "a1",
          "type": "formula",
          "value": Object {
            "type": "number",
            "value": 1,
          },
        },
        Object {
          "formula": "b1+1",
          "type": "formula",
          "value": Object {
            "type": "number",
            "value": 2,
          },
        },
        Object {
          "formula": "c1+1",
          "type": "formula",
          "value": Object {
            "type": "number",
            "value": 3,
          },
        },
        Object {
          "formula": "c1+2",
          "type": "formula",
          "value": Object {
            "type": "number",
            "value": 4,
          },
        },
        Object {
          "formula": "d1+h1",
          "type": "formula",
          "value": Object {
            "message": "",
            "type": "error",
            "value": "#CYCLE!",
          },
        },
        Object {
          "formula": "f1",
          "type": "formula",
          "value": Object {
            "message": "",
            "type": "error",
            "value": "#CYCLE!",
          },
        },
        Object {
          "formula": "g1",
          "type": "formula",
          "value": Object {
            "message": "",
            "type": "error",
            "value": "#CYCLE!",
          },
        },
        Object {
          "formula": "f1",
          "type": "formula",
          "value": Object {
            "message": "",
            "type": "error",
            "value": "#CYCLE!",
          },
        },
      ]
    `);
  });
});

export {};
