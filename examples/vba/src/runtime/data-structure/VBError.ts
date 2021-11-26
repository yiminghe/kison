import type { ParseError } from '../../parser';
import { Context } from '../Context';
import { VBFile } from './runtime';

export const errorCodes = {
  INTERNAL_ERROR: (type: string) => `internal error${type ? ': ' + type : ''}`,
  BINDING_ERROR: 'error when binding',
  NOT_FOUND_CLASS: (name: string) =>
    `can not find class` + (name ? `: ${name}` : ''),
  NOT_FOUND_FILE: (name: string) => `can not find file name: ${name}`,
  NOT_FOUND_FILE_ID: (name: string) => `can not find file id: ${name}`,
  NO_OPTIONAL_ARGUMENT: (name: string) => `no optional argument: ${name}`,
  NO_MATCH_ARGUMENT_PARAMETER: `argument length is not same with parameter size`,
  NOT_FOUND_SUB: (name: string) => `can not find sub: ${name}`,
  NOT_FOUND_LINE_LABEL: (name: string) => `can not find line label: ${name}`,
  SYNTAX_ERROR: `syntax error`,
  INDEX_OUT_OF_RANGE: `subscript out of range`,
  INDEX_NUMBER: `index must be number type`,
  NO_PRIVATE_TYPE: (type: string) => `can not access non-public ${type}`,
  NO_PRIVATE_MEMBER: `can not access non-public member`,
  NOT_FOUND_SET_ELEMENT_CLASS_BINDER: `no setElement on class binder`,
  NOT_FOUND_GET_ELEMENT_CLASS_BINDER: `no getElement on class binder`,
  SET_CONST: `can not set const variable`,
  UNEXPECTED_ERROR: (type: string) => `unexpected ${type}`,
  PARAMARRAY_LAST_ARGUMENT: `paramarray must be the last argument`,
  PARAMARRAY_TYPE: `paramarray must be of array type`,
  PARAMARRAY_BY_REF: `paramarray must be byRef`,
  PARAMARRAY_VARIANT: `paramarray must be variant`,
  DEFAULT_VALUE_TYPE: 'default value must be basic type',
  EXPECTED_ARRAY_TYPE: (name: string) => `expect array type at ${name}`,
  TYPE_MISMATCH: 'Type Mismatch',
};

type ErrorCodesKey = keyof typeof errorCodes;

let i = 0;

const orderToMatch: Record<string, ErrorCodesKey> = {
  13: 'TYPE_MISMATCH',
};

const errorNumbers: Record<ErrorCodesKey, number> = {} as Record<
  ErrorCodesKey,
  number
>;

for (const o of Object.keys(orderToMatch)) {
  const v = orderToMatch[o];
  errorNumbers[v] = parseInt(o, 10);
}

function findAvailableNumber(n: number) {
  while (orderToMatch[n]) {
    ++n;
  }
  return n;
}

for (const tk of Object.keys(errorCodes)) {
  const k = tk as ErrorCodesKey;
  if (!errorNumbers[k]) {
    const n = findAvailableNumber(++i);
    errorNumbers[k] = n;
    orderToMatch[n + ''] = k as ErrorCodesKey;
  }
}

type ErrorCode = keyof typeof errorCodes;

export class VBRuntimeError extends Error {
  public vbErrorType: string = 'runtime';
  public vbFile: VBFile | undefined;
  public vbFirstLine: number = -1;
  public vbErrorNumber: number = -1;
  public vbErrorCode: ErrorCode = 'INTERNAL_ERROR';
  public vbErrorSource: string = '';
  constructor(public code: ErrorCode | number, public vbArgs: any[] = []) {
    super('');
    if (typeof code === 'string') {
      this.vbErrorCode = code;
      this.vbErrorNumber = errorNumbers[code];
    } else {
      this.vbErrorNumber = code;
      this.vbErrorCode = orderToMatch[code];
    }
    if (this.vbErrorCode) {
      const error = errorCodes[this.vbErrorCode] as any;
      if (typeof error === 'string') {
        this.message = error;
      } else if (typeof error === 'function') {
        this.message = error(...vbArgs);
      }
    }
  }

  completeVBPositionInfo() {
    if (this.vbFile) {
      this.message += ` (line ${this.vbFirstLine} at file ${this.vbFile.name})`;
    }
  }
}

export class VBParseError extends Error {
  public vbErrorType: string = 'parse';
  constructor(public parseError: ParseError) {
    super(parseError.errorMessage);
  }
}

function makeVBRuntimeError(code: ErrorCode | number, ...args: any[]) {
  return new VBRuntimeError(code, args);
}

export function throwVBRuntimeError(
  context: Context,
  code: ErrorCode | number,
  ...args: any[]
): never {
  const error = makeVBRuntimeError(code, args);
  error.vbFile = context.currentFile;
  error.vbFirstLine = context.currentAstNode?.firstLine || -1;
  throw error;
}