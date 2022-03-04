import { utils, FormulaEngine, CellValue } from '../src/index';
import { makeNumber, makeFormula } from './utils';

const { parseCoord, toCoordString } = utils;

describe('excel-formula-engine', () => {
  let g: FormulaEngine = undefined!;

  beforeEach(() => {
    g = new FormulaEngine();

    // h-> g->f->d -> c -> b
    // f->h
    // k->f
    // e->c
    g.initWithValues([
      [
        makeNumber(1), // a1
        makeFormula('a1+1'), // b1
        makeFormula('b1+2'), // c1
        makeFormula('c1+3'), // d1
        makeFormula('c1+4'), // e1
        makeFormula('d1+h1'), // f1
        makeFormula('f1'), // g1
        makeFormula('g1'), // h1
        makeFormula('f1'), // i1
      ],
      [
        makeFormula('sum(a1:c1)'), //a2
        makeNumber(9), // b2
        makeNumber(11), // b2
        makeNumber(13), // b2
      ],
    ]);
  });

  type Cell = { adr: string; value: CellValue };

  function getCellValues() {
    const ret: Cell[][] = [[], []];
    for (let row = 1; row <= g.height; row++) {
      for (let col = 1; col <= g.width; col++) {
        const addr = { row, col };
        const value = g.getCellValue(addr);
        if (value) {
          ret[0].push({
            adr: toCoordString(addr),
            value,
          });
        }
      }
    }
    return ret;
  }

  it('compute works', () => {
    expect(g.width).toBe(9);
    expect(g.height).toBe(2);

    const ret = getCellValues();

    expect(ret).toMatchSnapshot();
  });

  it('insertRow works', () => {
    g.insertRows(1, 2);
    const ret = getCellValues();

    expect(ret).toMatchSnapshot();
  });

  it('recompute works', () => {
    g.setCellValue(parseCoord('c1'), makeNumber(10));

    const ret = getCellValues();

    expect(ret).toMatchSnapshot();
  });

  it('array works', () => {
    function e(formula: string) {
      return {
        formula,
        value: g.evaluateFormula(formula),
      };
    }

    expect(e('A1:A2+B1:B2')).toMatchSnapshot();

    expect(e('A1:A2+B1:C1')).toMatchSnapshot();

    expect(e('A1:B2+C1:D2')).toMatchSnapshot();

    expect(e('9+C1:D2')).toMatchSnapshot();
  });
});
