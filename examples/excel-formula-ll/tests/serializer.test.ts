import { serialize } from '../src/serializer';
import { parser as formula } from '../src';

function serialize2(f: string) {
  return {
    f,
    f2: serialize(formula.parse(f).ast),
  };
}

describe('excel-formula-serializer', () => {
  it('works for simple', () => {
    expect(serialize2(`sum(a1:a2,b1)`)).toMatchInlineSnapshot(`
      Object {
        "f": "sum(a1:a2,b1)",
        "f2": "sum(a1:a2,b1)",
      }
    `);
  });

  it('works for row rangge', () => {
    expect(serialize2(`sum(4:5)`)).toMatchInlineSnapshot(`
      Object {
        "f": "sum(4:5)",
        "f2": "sum(4:5)",
      }
    `);
  });

  it('works for reference operation', () => {
    expect(serialize2(`(E4:H4,F:F K8)`)).toMatchInlineSnapshot(`
      Object {
        "f": "(E4:H4,F:F K8)",
        "f2": "(E4:H4,F:F K8)",
      }
    `);
  });

  it('works for reference operation as argument', () => {
    expect(serialize2(`SUM((E4:H4,F:F K8))`)).toMatchInlineSnapshot(`
      Object {
        "f": "SUM((E4:H4,F:F K8))",
        "f2": "sum((E4:H4,F:F K8))",
      }
    `);
  });

  it('works for 3d reference', () => {
    expect(serialize2(`sum(shee1:sheet2!a1:a2)`)).toMatchInlineSnapshot(`
      Object {
        "f": "sum(shee1:sheet2!a1:a2)",
        "f2": "sum(shee1:sheet2!a1:a2)",
      }
    `);
  });

  describe('array formula', () => {
    it('allow @ and #', () => {
      expect(serialize2('@sum(@a1:a2 a3#)')).toMatchInlineSnapshot(`
        Object {
          "f": "@sum(@a1:a2 a3#)",
          "f2": "@sum(@a1:a2 a3#)",
        }
      `);
    });
  });
});
