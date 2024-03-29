import { parser as formula } from '../src';
import { prettyJson } from 'kison/__tests__/utils';

function parse(input: string) {
  return formula.parse(input);
}

describe('excel-formula-parser', () => {
  it('works for env', () => {
    expect(
      prettyJson(
        formula.parse(`sum(a1:a2;b1)`, {
          lexerOptions: { env: 'de' },
        }).ast,
      ),
    ).toMatchSnapshot();
  });

  it('works for simple', () => {
    expect(prettyJson(parse(`sum(a1:a2,b1)`).ast)).toMatchSnapshot();
  });

  it('works for row rangge', () => {
    expect(prettyJson(parse(`sum(4:5)`).ast)).toMatchSnapshot();
  });

  it('works for reference operation', () => {
    expect(prettyJson(parse(`(E4:H4,F:F K8)`).ast)).toMatchSnapshot();
  });

  it('works for reference operation as argument', () => {
    expect(prettyJson(parse(`SUM((E4:H4,F:F K8))`).ast)).toMatchSnapshot();
  });

  it('works for 3d reference', () => {
    expect(prettyJson(parse(`sum(shee1:sheet2!a1:a2)`).ast)).toMatchSnapshot();
  });

  describe('structure reference', () => {
    it('works', () => {
      expect(
        prettyJson(parse(`sum(t[[#total],[y]],t[x])`).ast),
      ).toMatchSnapshot();
    });

    it('works for space inside column name', () => {
      expect(prettyJson(parse('t2[a b]').ast)).toMatchSnapshot();
    });

    it('works for Reference operators', () => {
      expect(
        prettyJson(parse('DeptSales[[Sales Person]:[Region]]').ast),
      ).toMatchSnapshot();
      expect(
        prettyJson(
          parse('DeptSales[Sales Amount],DeptSales[Commission Amount]').ast,
        ),
      ).toMatchSnapshot();
      expect(
        prettyJson(
          parse(
            'DeptSales[[Sales Person]:[Sales Amount]] DeptSales[[Region]:[% Commission]]',
          ).ast,
        ),
      ).toMatchSnapshot();
    });

    it('works for thisRow', () => {
      expect(
        prettyJson(parse(`DeptSales[@Commission Amount]`).ast),
      ).toMatchSnapshot();

      expect(
        prettyJson(parse(`DeptSales[@[Commission Amount]]`).ast),
      ).toMatchSnapshot();

      expect(
        prettyJson(parse(`DeptSales[[#This Row], [Commission Amount]]`).ast),
      ).toMatchSnapshot();
    });
  });

  describe('array formula', () => {
    it('allow @ and #', () => {
      expect(prettyJson(parse('@sum(@a1:a2 a3#)').ast)).toMatchSnapshot();
    });
  });
});
