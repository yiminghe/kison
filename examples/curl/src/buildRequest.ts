import {
  ParsedArguments,
  parseCookiesStrict,
  parseCookies,
  has,
  percentEncode,
  parseQueryString,
} from './utils';

import { CurlHeaders, CurlRequest } from './opts';

const _hasHeader = (headers: CurlHeaders, header: string): boolean => {
  const lookup = header.toLowerCase();
  for (const h of headers) {
    if (h[0].toLowerCase() === lookup) {
      return true;
    }
  }
  return false;
};

const _setHeaderIfMissing = (
  headers: CurlHeaders,
  header: string,
  value: string,
  lowercase: boolean | number = false,
): boolean => {
  if (_hasHeader(headers, header)) {
    return false;
  }
  headers.push([lowercase ? header.toLowerCase() : header, value]);
  return true;
};

export function buildRequest(
  parsedArguments: ParsedArguments,
  warnings: string[][] = [],
): CurlRequest {
  // TODO: handle multiple URLs
  if (!parsedArguments.url || !parsedArguments.url.length) {
    // TODO: better error message (could be parsing fail)
    throw new Error('no URL specified!');
  }
  if (parsedArguments.url.length > 1) {
    warnings.push([
      'multiple-urls',
      'found multiple URLs, only the last one will be used',
    ]);
  }
  let url = parsedArguments.url[parsedArguments.url.length - 1];

  const headers: CurlHeaders = [];
  if (parsedArguments.header) {
    for (const header of parsedArguments.header) {
      if (header.includes(':')) {
        const [name, value] = header.split(/:(.*)/s, 2);
        if (!value.trim()) {
          headers.push([name, null]);
        } else {
          headers.push([name, value.replace(/^ /, '')]);
        }
      } else if (header.includes(';')) {
        const [name] = header.split(/;(.*)/s, 2);
        headers.push([name, '']);
      }
    }
  }
  const lowercase =
    headers.length > 0 && headers.every((h) => h[0] === h[0].toLowerCase());

  let cookies;
  const cookieFiles: string[] = [];
  const cookieHeaders = headers.filter((h) => h[0].toLowerCase() === 'cookie');
  if (cookieHeaders.length === 1 && cookieHeaders[0][1] !== null) {
    const parsedCookies = parseCookiesStrict(cookieHeaders[0][1]);
    if (parsedCookies) {
      cookies = parsedCookies;
    }
  } else if (cookieHeaders.length === 0 && parsedArguments.cookie) {
    // If there is a Cookie header, --cookies is ignored
    const cookieStrings: string[] = [];
    for (const c of parsedArguments.cookie) {
      // a --cookie without a = character reads from it as a filename
      if (c.includes('=')) {
        cookieStrings.push(c);
      } else {
        cookieFiles.push(c);
      }
    }
    if (cookieStrings.length) {
      const cookieString = parsedArguments.cookie.join(';');
      _setHeaderIfMissing(headers, 'Cookie', cookieString, lowercase);
      cookies = parseCookies(cookieString);
    }
  }

  if (parsedArguments['user-agent']) {
    _setHeaderIfMissing(
      headers,
      'User-Agent',
      parsedArguments['user-agent'],
      lowercase,
    );
  }

  if (parsedArguments.referer) {
    // referer can be ";auto" or followed by ";auto", we ignore that.
    const referer = parsedArguments.referer.replace(/;auto$/, '');
    if (referer) {
      _setHeaderIfMissing(headers, 'Referer', referer, lowercase);
    }
  }

  // curl expects you to uppercase methods always. If you do -X PoSt, that's what it
  // will send, but most APIs will helpfully uppercase what you pass in as the method.
  let method = 'GET';
  if (parsedArguments.head) {
    method = 'HEAD';
  } else if (
    has(parsedArguments, 'request') &&
    // Safari adds `-X null` if it can't determine the request type
    // https://github.com/WebKit/WebKit/blob/f58ef38d48f42f5d7723691cb090823908ff5f9f/Source/WebInspectorUI/UserInterface/Models/Resource.js#L1250
    parsedArguments.request !== 'null'
  ) {
    method = parsedArguments.request as string;
  } else if (parsedArguments['upload-file']) {
    // --upload-file '' doesn't do anything.
    method = 'PUT';
  } else if (
    (has(parsedArguments, 'data') || has(parsedArguments, 'form')) &&
    !parsedArguments.get
  ) {
    method = 'POST';
  }

  // curl automatically prepends 'http' if the scheme is missing,
  // but many libraries fail if your URL doesn't have it,
  // we tack it on here to mimic curl
  //
  // RFC 3986 3.1 says
  //   scheme      = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
  // but curl will accept a digit/plus/minus/dot in the first character
  // curl will also accept a url with one / like http:/localhost
  const schemeMatch = url.match(/^([a-zA-Z0-9+-.]*):\/\/?/);
  if (schemeMatch) {
    const scheme = schemeMatch[1].toLowerCase();
    if (scheme !== 'http' && scheme !== 'https') {
      warnings.push(['bad-scheme', `Protocol "${scheme}" not supported`]);
    }
    url = scheme + '://' + url.slice(schemeMatch[0].length);
  } else {
    // curl's default scheme is actually https://
    // but we don't do that because, unlike curl, most libraries won't downgrade to http if you ask for https
    url = 'http://' + url;
  }

  let dataStr = '';
  if (parsedArguments.data && parsedArguments.data.length) {
    for (const [i, x] of parsedArguments.data.entries()) {
      const [type, value] = x;
      if (i > 0 && type !== 'json') {
        dataStr += '&';
      }
      // curl prefers @ over = for --data-urlencode
      if (type === 'urlencode' && !value.includes('@')) {
        if (value.includes('=')) {
          const [name, content] = value.split(/=(.*)/s, 2);
          if (name) {
            dataStr += name + '=';
          }
          dataStr += percentEncode(content);
        } else {
          dataStr += percentEncode(value);
        }
      } else {
        dataStr += value;
      }
    }
  }

  let urlObject = new URL(url); // eslint-disable-line

  if (parsedArguments['upload-file']) {
    // TODO: it's more complicated
    if (
      (!urlObject.pathname || urlObject.pathname === '/') &&
      !urlObject.hash
    ) {
      url += '/' + parsedArguments['upload-file'];
    } else if (url.endsWith('/')) {
      url += parsedArguments['upload-file'];
    }
    urlObject = new URL(url); // eslint-disable-line
  }
  // if GET request with data, convert data to query string
  // NB: the -G flag does not change the http verb. It just moves the data into the url.
  // TODO: this probably has a lot of mismatches with curl
  if (parsedArguments.get) {
    urlObject.search = urlObject.search ? urlObject.search : '';
    if (has(parsedArguments, 'data') && parsedArguments.data !== undefined) {
      let urlQueryString = '';
      if (url.includes('?')) {
        urlQueryString += '&';
      } else {
        url += '?';
      }
      if (dataStr) {
        urlQueryString += dataStr;
      }

      urlObject.search += urlQueryString;
      // TODO: url and urlObject will be different if url has an #id
      url += urlQueryString;
      parsedArguments.data = undefined;
    }
  }
  if (urlObject.search && urlObject.search.endsWith('&')) {
    urlObject.search = urlObject.search.slice(0, -1);
  }
  const [queryAsList, queryAsDict] = parseQueryString(urlObject.search);
  const useParsedQuery =
    queryAsList &&
    queryAsList.length &&
    queryAsList.every((p) => p[1] !== null);
  // Most software libraries don't let you distinguish between a=&b= and a&b,
  // so if we get an `a&b`-type query string, don't bother.
  let urlWithoutQuery;
  if (useParsedQuery) {
    urlObject.search = ''; // Clean out the search/query portion.
    urlWithoutQuery = urlObject.toString();
  } else {
    urlWithoutQuery = url; // TODO: rename?
  }

  const request: CurlRequest = { url, method, urlWithoutQuery };
  if (useParsedQuery) {
    request.query = queryAsList;
    if (queryAsDict) {
      request.queryDict = queryAsDict;
    }
  }

  if (cookies) {
    // generators that use .cookies need to do
    // deleteHeader(request, 'cookie')
    request.cookies = cookies;
  }
  // TODO: most generators support passing cookies with --cookie but don't
  // support reading cookies from a file. We need to somehow warn users
  // when that is the case.
  if (cookieFiles.length) {
    request.cookieFiles = cookieFiles;
  }
  if (parsedArguments['cookie-jar']) {
    request.cookieJar = parsedArguments['cookie-jar'];
  }

  if (parsedArguments.compressed) {
    request.compressed = true;
  }

  if (parsedArguments['upload-file']) {
    request.uploadFile = parsedArguments['upload-file'];
  }

  if (parsedArguments.data) {
    if (parsedArguments.jsoned) {
      _setHeaderIfMissing(
        headers,
        'Content-Type',
        'application/json',
        lowercase,
      );
      _setHeaderIfMissing(headers, 'Accept', 'application/json', lowercase);
    } else {
      _setHeaderIfMissing(
        headers,
        'Content-Type',
        'application/x-www-form-urlencoded',
        lowercase,
      );
    }
  } else if (parsedArguments.form) {
    request.multipartUploads = [];
    for (const multipartArgument of parsedArguments.form) {
      if (!multipartArgument.value.includes('=')) {
        throw new Error(
          'invalid value for --form/-F: ' +
            JSON.stringify(multipartArgument.value),
        );
      }

      // TODO: https://curl.se/docs/manpage.html#-F
      // -F is the most complicated option, we only handle
      // name=value and name=@file and name=<file
      const [name, value] = multipartArgument.value.split(/=(.*)/s, 2);
      const isString = multipartArgument.type === 'string';

      if (!isString && value.charAt(0) === '@') {
        const contentFile = value.slice(1);
        const filename = contentFile;
        request.multipartUploads.push({ name, contentFile, filename });
      } else if (!isString && value.charAt(0) === '<') {
        const contentFile = value.slice(1);
        request.multipartUploads.push({ name, contentFile });
      } else {
        const content = value;
        request.multipartUploads.push({ name, content });
      }
    }
  }

  if (headers.length > 0) {
    for (let i = headers.length - 1; i >= 0; i--) {
      if (headers[i][1] === null) {
        // TODO: ideally we should generate code that explicitly unsets the header too
        headers.splice(i, 1);
      }
    }
    request.headers = headers;
  }

  if (parsedArguments.user) {
    const [user, pass] = parsedArguments.user.split(/:(.*)/s, 2);
    request.auth = [user, pass || ''];
  }
  if (parsedArguments.digest) {
    request.digest = parsedArguments.digest;
  }
  if (parsedArguments.data && parsedArguments.data.length) {
    request.dataArray = parsedArguments.data;
    request.data = dataStr;
    request.isDataRaw = parsedArguments.data.some((x) => x[0] === 'raw');
    request.isDataBinary =
      !request.isDataRaw && parsedArguments.data.some((x) => x[0] === 'binary');
  }

  if (parsedArguments.insecure) {
    request.insecure = true;
  }
  // TODO: if the URL doesn't start with https://, curl doesn't verify
  // certificates, etc.
  if (parsedArguments.cert) {
    // --key has no effect if --cert isn't passed
    request.cert = parsedArguments.key
      ? [parsedArguments.cert, parsedArguments.key]
      : parsedArguments.cert;
  }
  if (parsedArguments.cacert) {
    request.cacert = parsedArguments.cacert;
  }
  if (parsedArguments.capath) {
    request.capath = parsedArguments.capath;
  }
  if (parsedArguments.proxy) {
    // https://github.com/curl/curl/blob/e498a9b1fe5964a18eb2a3a99dc52160d2768261/lib/url.c#L2388-L2390
    request.proxy = parsedArguments.proxy;
    if (parsedArguments['proxy-user']) {
      request.proxyAuth = parsedArguments['proxy-user'];
    }
  }
  if (parsedArguments['max-time']) {
    request.timeout = parsedArguments['max-time'];
  }
  if (parsedArguments.location || parsedArguments['location-trusted']) {
    request.followRedirects = true;
  }
  if (parsedArguments['max-redirs']) {
    if (isNaN(parseInt(parsedArguments['max-redirs']))) {
      warnings.push([
        'max-redirs-not-int',
        '--max-redirs value is not a number: ' +
          JSON.stringify(parsedArguments['max-redirs']),
      ]);
    }
    request.maxRedirects = parsedArguments['max-redirs'].trim();
  }
  if (parsedArguments.output) {
    request.output = parsedArguments.output;
  }

  if (parsedArguments.http2) {
    request.http2 = parsedArguments.http2;
  }
  if (parsedArguments.http3) {
    request.http3 = parsedArguments.http3;
  }

  return request;
}
