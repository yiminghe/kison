// TODO: this type doesn't work.
export function has<T, K extends PropertyKey>(
  obj: T,
  prop: K,
): obj is T & Record<K, unknown> {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export type Query = Array<[string, string | null]>;
export interface QueryDict {
  [key: string]: string | null | Array<string | null>;
}

export function pushProp<Type>(
  obj: { [key: string]: Type[] },
  prop: string,
  value: Type,
) {
  if (!has(obj, prop)) {
    // TODO: I have no idea what
    // Type 'never[]' is not assignable to type 'never'.
    // means
    (obj[prop] as Type[]) = [];
  }
  obj[prop].push(value);
  return obj;
}

export function toBoolean(opt: string): boolean {
  if (opt.startsWith('no-disable-')) {
    return true;
  }
  if (opt.startsWith('disable-') || opt.startsWith('no-')) {
    return false;
  }
  return true;
}

export type FormParam = { value: string; type: 'string' | 'form' };
export type DataParam = [
  'data' | 'raw' | 'binary' | 'urlencode' | 'json',
  string,
];

export interface ParsedArguments {
  request?: string; // the HTTP method
  data?: DataParam[];
  jsoned?: boolean;
  form?: FormParam[];
  // TODO
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function pushArgValue(
  obj: ParsedArguments,
  argName: string,
  value: string,
) {
  switch (argName) {
    case 'data':
    case 'data-ascii':
      return pushProp(obj, 'data', ['data', value]);
    case 'data-binary':
      return pushProp(obj, 'data', [
        // Unless it's a file, --data-binary works the same as --data
        value.startsWith('@') ? 'binary' : 'data',
        value,
      ]);
    case 'data-raw':
      return pushProp(obj, 'data', [
        // Unless it's a file, --data-raw works the same as --data
        value.startsWith('@') ? 'raw' : 'data',
        value,
      ]);
    case 'data-urlencode':
      return pushProp(obj, 'data', ['urlencode', value]);
    case 'json':
      obj.jsoned = true;
      return pushProp(obj, 'data', ['json', value]); // TODO: just "data"?
    // TODO: case "url-query":

    case 'form':
      return pushProp(obj, 'form', { value, type: 'form' });
    case 'form-string':
      return pushProp(obj, 'form', { value, type: 'string' });
  }

  return pushProp(obj, argName, value);
}

type Cookie = [string, string];
export type Cookies = Array<Cookie>;

export const parseCookiesStrict = (cookieString: string): Cookies | null => {
  const cookies: Cookies = [];
  const map = new Map<string, number>();
  for (let cookie of cookieString.split(';')) {
    cookie = cookie.replace(/^ /, '');
    const [name, value] = cookie.split(/=(.*)/s, 2);
    if (value === undefined) {
      return null;
    }
    // only assign once
    if (map.has(name)) {
      continue;
    }
    map.set(name, 1);
    cookies.push([name, value]);
  }
  return cookies;
};

export const parseCookies = (cookieString: string): Cookies => {
  const cookies: Cookies = [];
  const map = new Map<string, number>();
  for (let cookie of cookieString.split(';')) {
    cookie = cookie.trim();
    if (!cookie) {
      continue;
    }
    const [name, value] = cookie.split(/=(.*)/s, 2);
    // only assign once
    if (map.has(name)) {
      continue;
    }
    map.set(name, 1);
    cookies.push([name, value || '']);
  }
  return cookies;
};

export const percentEncodeChar = (c: string): string =>
  '%' + c.charCodeAt(0).toString(16).padStart(2, '0').toUpperCase();
// Match Python's urllib.parse.quote() behavior
// https://stackoverflow.com/questions/946170/equivalent-javascript-functions-for-pythons-urllib-parse-quote-and-urllib-par
export const percentEncode = (s: string): string =>
  encodeURIComponent(s).replace(/[()*!']/g, percentEncodeChar); // .replace('%20', '+')

export function parseQueryString(
  s: string | null,
): [Query | null, QueryDict | null] {
  // if url is 'example.com?' => s is ''
  // if url is 'example.com'  => s is null
  if (s && s.startsWith('?')) {
    s = s.slice(1);
  }

  if (!s) {
    return [null, null];
  }

  const asList: Query = [];
  for (const param of s.split('&')) {
    const [key, _val] = param.split(/=(.*)/s, 2);
    const val = _val === undefined ? null : _val;
    let decodedKey;
    let decodedVal;
    try {
      // https://url.spec.whatwg.org/#urlencoded-parsing recommends replacing + with space
      // before decoding.
      decodedKey = decodeURIComponent(key.replace(/\+/g, ' '));
      decodedVal =
        val === null ? null : decodeURIComponent(val.replace(/\+/g, ' '));
    } catch (e) {
      if (e instanceof URIError) {
        // Query string contains invalid percent encoded characters,
        // we cannot properly convert it.
        return [null, null];
      }
      throw e;
    }
    asList.push([decodedKey, decodedVal]);
  }

  // Group keys
  const asDict: QueryDict = {};
  let prevKey = null;
  for (const [key, val] of asList) {
    if (prevKey === key) {
      (asDict[key] as Array<string | null>).push(val);
    } else {
      if (!has(asDict, key)) {
        (asDict[key] as Array<string | null>) = [val];
      } else {
        // If there's a repeated key with a different key between
        // one of its repetitions, there is no way to represent
        // this query string as a dictionary.
        //return [asList, null];
        // !merge it!
        (asDict[key] as Array<string | null>).push(val);
      }
    }
    prevKey = key;
  }

  // Convert lists with 1 element to the element
  for (const [key, val] of Object.entries(asDict)) {
    if ((val as Array<string | null>).length === 1) {
      asDict[key] = (val as Array<string | null>)[0];
    }
  }

  return [asList, asDict];
}
