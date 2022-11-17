import { tokenize } from './tokenize';
import {
  curlLongOpts,
  curlShortOpts,
  LongOpts,
  ShortOpts,
  changedShortOpts,
  canBeList,
  CurlHeaders,
  CurlRequest,
} from './opts';
import { ParsedArguments, pushArgValue, toBoolean, has } from './utils';
import { buildRequest } from './buildRequest';

const parseArgs = (
  args: string[],
  longOpts: LongOpts,
  shortOpts: ShortOpts,
): ParsedArguments => {
  const parsedArguments: ParsedArguments = {};
  for (let i = 0, stillflags = true; i < args.length; i++) {
    let arg: string | string[] = args[i];
    let argRepr = arg;
    if (stillflags && arg.startsWith('-')) {
      if (arg === '--') {
        /* This indicates the end of the flags and thus enables the
           following (URL) argument to start with -. */
        stillflags = false;
      } else if (arg.startsWith('--')) {
        const lookup = arg.slice(2);
        const longArg = longOpts[lookup];
        if (longArg === null) {
          throw new Error('option ' + arg + ': is ambiguous');
        }
        if (typeof longArg === 'undefined') {
          // TODO: extract a list of deleted arguments to check here
          throw new Error('option ' + arg + ': is unknown');
        }

        if (longArg.type === 'string') {
          if (i + 1 < args.length) {
            i++;
            pushArgValue(parsedArguments, longArg.name, args[i]);
          } else {
            throw new Error('option ' + arg + ': requires parameter');
          }
        } else {
          parsedArguments[longArg.name] = toBoolean(arg.slice(2)); // TODO: all shortened args work correctly?
        }
      } else {
        // Short option. These can look like
        // -X POST    -> {request: 'POST'}
        // or
        // -XPOST     -> {request: 'POST'}
        // or multiple options
        // -ABCX POST -> {A: true, B: true, C: true, request: 'POST'}
        // or multiple options and a value for the last one
        // -ABCXPOST  -> {A: true, B: true, C: true, request: 'POST'}

        // "-" passed to curl as an argument raises an error,
        // curlconverter's command line uses it to read from stdin
        if (arg.length === 1) {
          if (has(shortOpts, '')) {
            arg = ['-', ''];
            argRepr = '-';
          } else {
            throw new Error('option ' + argRepr + ': is unknown');
          }
        }
        for (let j = 1; j < arg.length; j++) {
          if (!has(shortOpts, arg[j])) {
            if (has(changedShortOpts, arg[j])) {
              throw new Error(
                'option ' + argRepr + ': ' + changedShortOpts[arg[j]],
              );
            }
            // TODO: there are a few deleted short options we could report
            throw new Error('option ' + argRepr + ': is unknown');
          }
          const lookup = arg[j];
          const shortFor = shortOpts[lookup];
          const longArg = longOpts[shortFor];
          if (longArg === null) {
            // This could happen if curlShortOpts points to a renamed option or has a typo
            throw new Error('ambiguous short option -' + arg[j]);
          }
          if (longArg.type === 'string') {
            let val;
            if (j + 1 < arg.length) {
              // treat -XPOST as -X POST
              val = arg.slice(j + 1);
              j = arg.length;
            } else if (i + 1 < args.length) {
              i++;
              val = args[i];
            } else {
              throw new Error('option ' + argRepr + ': requires parameter');
            }
            pushArgValue(parsedArguments, longArg.name, val as string);
          } else {
            // Use shortFor because -N is short for --no-buffer
            // and we want to end up with {buffer: false}
            parsedArguments[longArg.name] = toBoolean(shortFor);
          }
        }
      }
    } else {
      pushArgValue(parsedArguments, 'url', arg);
    }
  }

  for (const [arg, values] of Object.entries(parsedArguments)) {
    if (Array.isArray(values) && !canBeList.has(arg)) {
      parsedArguments[arg] = values[values.length - 1];
    }
  }
  return parsedArguments;
};

export function parseCurlCommand(
  curlCommand: string | string[],
  supportedArgs: Set<string>,
  warnings: string[][],
): CurlRequest {
  let cmdName: string,
    args: string[],
    stdin: undefined | string,
    stdinFile: undefined | string;
  if (Array.isArray(curlCommand)) {
    [cmdName, ...args] = curlCommand;
    if (typeof cmdName === 'undefined') {
      throw new Error('no arguments provided');
    }
  } else {
    ({ cmdName, args, stdin, stdinFile } = tokenize(curlCommand));
  }
  if (cmdName.trim() !== 'curl') {
    const shortenedCmdName =
      cmdName.length > 30 ? cmdName.slice(0, 27) + '...' : cmdName;
    if (cmdName.startsWith('curl ')) {
      throw new Error(
        'command should begin with a single token "curl" but instead begins with ' +
          JSON.stringify(shortenedCmdName),
      );
    } else {
      throw new Error(
        'command should begin with "curl" but instead begins with ' +
          JSON.stringify(shortenedCmdName),
      );
    }
  }

  const parsedArguments = parseArgs(args, curlLongOpts, curlShortOpts);
  const request = buildRequest(parsedArguments, warnings);
  if (stdinFile) {
    request.stdinFile = stdinFile;
  }
  if (stdin) {
    request.stdin = stdin;
  }
  return request;
}
