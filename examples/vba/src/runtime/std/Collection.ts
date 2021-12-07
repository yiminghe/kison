import { ClassBinding, VBPointer } from '../types';

interface Item {
  value: VBPointer;
  key: string | undefined;
}

const Collection: ClassBinding = {
  type: 'ClassBinding',
  name: 'collection',
  value(context) {
    const arrayValues: Item[] = [undefined!];
    const mappedValues = new Map();
    return {
      subs: {
        add: {
          argumentsInfo: [
            {
              name: 'item',
            },
            {
              name: 'key',
              asType: {
                type: 'string',
              },
              optional: true,
            },
            {
              name: 'before',
              asType: {
                type: 'integer',
              },
              optional: true,
            },
            {
              name: 'after',
              asType: {
                type: 'integer',
              },
              optional: true,
            },
          ],
          async value(args) {
            const value = (await args.getPointer('item'))!;
            const key = (await args.getValue('key'))!;
            const before = (await args.getValue('before'))!;
            const after = (await args.getValue('after'))!;
            let keyValue: string | undefined = key.value as any;
            let beforeValue: number | undefined = before.value as any;
            let afterValue: number | undefined = after.value as any;
            const item = {
              value,
              key: keyValue,
            };
            if (keyValue !== undefined) {
              if (mappedValues.has(keyValue)) {
                context.throwError('KEY_ALREADY_EXISTS');
              }
              mappedValues.set(keyValue, item);
            }
            if (beforeValue !== undefined) {
              beforeValue = beforeValue <= 1 ? 1 : beforeValue;
              arrayValues.splice(beforeValue, 0, item);
            } else if (afterValue !== undefined) {
              afterValue = afterValue <= 1 ? 1 : afterValue;
              arrayValues.splice(afterValue + 1, 0, item);
            } else {
              arrayValues.push(item);
            }
          },
        },
        item: {
          argumentsInfo: [
            {
              name: 'index',
            },
          ],
          async value(args) {
            const index = (await args.getValue('index'))!.value;
            let item;
            if (typeof index === 'number') {
              item = arrayValues[index];
            } else {
              item = mappedValues.get(index);
            }
            return item ? item.value : context.createEmpty();
          },
        },
        remove: {
          argumentsInfo: [
            {
              name: 'index',
            },
          ],
          async value(args) {
            const index = (await args.getValue('index'))!;
            if (index.type === 'integer') {
              const indexValue = index.value;
              const item = arrayValues[indexValue];
              if (!item) {
                return;
              }
              arrayValues.splice(indexValue, 1);
              if (item.key !== undefined) {
                mappedValues.delete(item.key);
              }
            } else if (index.type === 'string') {
              const key = index.value;
              const item = mappedValues.get(key);
              if (!item) {
                return;
              }
              mappedValues.delete(key);
              for (let i = 1; i < arrayValues.length; i++) {
                if (arrayValues[i].key === key) {
                  arrayValues.splice(i, 1);
                  break;
                }
              }
            } else {
              context.throwError('TYPE_MISMATCH');
            }
          },
        },
      },
      get(name) {
        if (name === 'count') {
          return context.createInteger(arrayValues.length - 1);
        }
      },
      set() {
        context.throwError('READ_ONLY');
      },
      vbIterator() {
        let i = 1;
        let len = arrayValues.length - 1;
        return {
          next() {
            if (i > len) {
              return {
                value: context.createEmpty(),
                done: true,
              };
            }
            return {
              value: arrayValues[i++].value,
              done: false,
            };
          },
        };
      },
      getElement(indexes) {
        const index = indexes[0];
        let item;
        if (typeof index === 'number') {
          item = arrayValues[index];
        } else {
          item = mappedValues.get(index);
        }
        return item ? item.value : context.createEmpty();
      },
      setElement() {
        context.throwError('READ_ONLY');
      },
    };
  },
};

export default [Collection];
