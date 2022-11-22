// FROM: https://github.com/curlconverter/curlconverter

import { CurlRequest } from './opts';
import { QueryDict, parseQueryString } from './utils';
import { parseCurlCommand } from './parseCommand';

const supportedArgs = new Set([
  'url',
  'request',
  'user-agent',
  'cookie',
  'data',
  'data-raw',
  'data-ascii',
  'data-binary',
  'data-urlencode',
  'json',
  'referer',
  'form',
  'form-string',
  'get',
  'header',
  'head',
  'no-head',
  'insecure',
  'no-insecure',
  'user',
]);

type JSONOutput = {
  url: string;
  raw_url: string;
  method: string;
  cookies?: { [key: string]: string };
  headers?: { [key: string]: string | null };
  queries?: QueryDict;
  data?: { [key: string]: string };
  // raw_data?: string[],
  files?: { [key: string]: string };
  // raw_files: string[],
  insecure?: boolean;
  auth?: { user: string; password: string };
};

function getDataString(request: CurlRequest): {
  data?: { [key: string]: string | string[] };
} {
  if (!request.data) {
    return {};
  }
  const [parsedQuery, parsedQueryDict] = parseQueryString(request.data);
  if (
    !parsedQuery ||
    !parsedQuery.length ||
    parsedQuery.some((p) => p[1] === null)
  ) {
    const data: { [key: string]: string } = {};
    data[request.data] = '';
    return { data };
  }
  if (parsedQueryDict) {
    const data: { [key: string]: string | string[] } = {};
    for (const [k, v] of Object.entries(parsedQueryDict)) {
      if (Array.isArray(v)) {
        data[k] = v.map((v: string | null) => v ?? '');
      } else {
        data[k] = v ?? '';
      }
    }
    return { data };
  } else {
    return Object.fromEntries(parsedQuery.map((q) => [q[0], q[1] ?? '']));
  }
}

function getFilesString(
  request: CurlRequest,
):
  | { files?: { [key: string]: string }; data?: { [key: string]: string } }
  | undefined {
  if (!request.multipartUploads) {
    return undefined;
  }
  const data: {
    files: { [key: string]: string };
    data: { [key: string]: string };
  } = {
    files: {},
    data: {},
  };

  // TODO: this isn't great.
  for (const m of request.multipartUploads) {
    if ('contentFile' in m) {
      data.files[m.name] = m.contentFile;
    } else {
      data.data[m.name] = m.content;
    }
  }

  return {
    files: Object.keys(data.files).length ? data.files : undefined,
    data: Object.keys(data.data).length ? data.data : undefined,
  } as any;
}

export const toJSON = (curlCommand: string, warnings: string[][] = []) => {
  const request = parseCurlCommand(curlCommand, supportedArgs, warnings);

  const requestJson: JSONOutput = {
    url: (request.queryDict ? request.urlWithoutQuery : request.url).replace(
      /\/$/,
      '',
    ),
    raw_url: request.url,
    method: request.method.toLowerCase(), // lowercase for backwards compatibility
  };

  if (request.cookies) {
    requestJson.cookies = Object.fromEntries(request.cookies);
  }

  if (request.headers) {
    requestJson.headers = Object.fromEntries(request.headers);
  }

  if (request.queryDict) {
    requestJson.queries = request.queryDict;
  }

  if (request.data && typeof request.data === 'string') {
    Object.assign(requestJson, getDataString(request));
  } else if (request.multipartUploads) {
    Object.assign(requestJson, getFilesString(request));
  }

  if (request.insecure) {
    requestJson.insecure = false;
  }

  if (request.auth) {
    const [user, password] = request.auth;
    requestJson.auth = {
      user: user,
      password: password,
    };
  }

  return requestJson;
};
