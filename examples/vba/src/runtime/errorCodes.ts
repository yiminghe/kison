import type { ParseError } from '../parser';

export const errorCodes = {
  INTERNAL_ERROR: (type: string) => `internal error: ${type}`,
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
};

let i = 0;

const errorNumbers: any = {};

for (const k of Object.keys(errorCodes)) {
  errorNumbers[k] = ++i;
}

type ErrorCode = keyof typeof errorCodes;

export class VBRuntimeError extends Error {
  public vbErrorType: string = 'runtime';
  public vbFileName: string = '';
  public vbFirstLine: number = -1;
  public vbErrorNumber: number = -1;
  constructor(public vbErrorCode: ErrorCode, public vbArgs: any[] = []) {
    super('');
    this.vbErrorNumber = errorNumbers[vbErrorCode];
    const error = errorCodes[vbErrorCode] as any;
    if (typeof error === 'string') {
      this.message = error;
    } else {
      this.message = error(...vbArgs);
    }
  }

  setVBPosition(vbFileName: string, vbFirstLine: number) {
    this.vbFileName = vbFileName;
    this.vbFirstLine = vbFirstLine;
    this.message += ` (line ${vbFirstLine} at file ${vbFileName})`;
  }
}

export class VBParseError extends Error {
  public vbErrorType: string = 'parse';
  constructor(public parseError: ParseError) {
    super(parseError.errorMessage);
  }
}

export function makeVBRuntimeError(errorCode: ErrorCode, ...args: any[]) {
  return new VBRuntimeError(errorCode, args);
}

export function throwVBRuntimeError(
  errorCode: ErrorCode,
  ...args: any[]
): never {
  throw makeVBRuntimeError(errorCode, args);
}
