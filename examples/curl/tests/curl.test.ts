import { toJSON } from '../src/';

describe('bash parser', () => {
  it('basic auth works', () => {
    const code = `
    curl "https://api.test.com/" -u "some_username:some_password"
`.trim();
    const ret = toJSON(code);
    expect(ret).toMatchInlineSnapshot(`
      Object {
        "auth": Object {
          "password": "some_password",
          "user": "some_username",
        },
        "method": "get",
        "raw_url": "https://api.test.com/",
        "url": "https://api.test.com",
      }
    `);
  });

  it('get works', () => {
    const code = `
curl 'http://en.wikipedia.org/' \
    -H 'Accept-Encoding: gzip, deflate, sdch' \
    -H 'Accept-Language: en-US,en;q=0.8' \
    -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36' \
    -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' \
    -H 'Referer: http://www.wikipedia.org/' \
    -H 'Connection: keep-alive' --compressed
`.trim();
    const ret = toJSON(code);
    expect(ret).toMatchInlineSnapshot(`
      Object {
        "headers": Object {
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
          "Accept-Encoding": "gzip, deflate, sdch",
          "Accept-Language": "en-US,en;q=0.8",
          "Connection": "keep-alive",
          "Referer": "http://www.wikipedia.org/",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
        },
        "method": "get",
        "raw_url": "http://en.wikipedia.org/",
        "url": "http://en.wikipedia.org",
      }
    `);
  });

  it('post works', () => {
    const code = `
    curl 'http://fiddle.jshell.net/echo/html/' \
    -H 'Origin: http://fiddle.jshell.net' \
    -H 'Accept-Encoding: gzip, deflate' \
    -H 'Accept-Language: en-US,en;q=0.8' \
    -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36' \
    -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' \
    -H 'Accept: */*' \
    -H 'Referer: http://fiddle.jshell.net/_display/' \
    -H 'X-Requested-With: XMLHttpRequest' \
    -H 'Connection: keep-alive' \
    --data 'msg1=wow&msg2=such&msg3=data' --compressed
    `.trim();
    const ret = toJSON(code);
    expect(ret).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "msg1": "wow",
          "msg2": "such",
          "msg3": "data",
        },
        "headers": Object {
          "Accept": "*/*",
          "Accept-Encoding": "gzip, deflate",
          "Accept-Language": "en-US,en;q=0.8",
          "Connection": "keep-alive",
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          "Origin": "http://fiddle.jshell.net",
          "Referer": "http://fiddle.jshell.net/_display/",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36",
          "X-Requested-With": "XMLHttpRequest",
        },
        "method": "post",
        "raw_url": "http://fiddle.jshell.net/echo/html/",
        "url": "http://fiddle.jshell.net/echo/html",
      }
    `);
  });
});
