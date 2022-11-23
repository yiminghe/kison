import { toJSON } from '../src/';
// @ts-ignore
import { toJsonString } from 'curlconverter';
import cookie from 'cookie';

function curl2json(s: string) {
  return JSON.parse(toJsonString(s));
}

describe('bash parser', () => {
  it('basic auth works', () => {
    const code = `
    curl "https://api.test.com/x?t=1" -u "some_username:some_password"
`;
    const ret = toJSON(code);
    expect(ret[0]).toEqual(curl2json(code));
    expect(ret).toMatchInlineSnapshot(`
      Array [
        Object {
          "auth": Object {
            "password": "some_password",
            "user": "some_username",
          },
          "method": "get",
          "queries": Object {
            "t": "1",
          },
          "raw_url": "https://api.test.com/x?t=1",
          "url": "https://api.test.com/x",
        },
      ]
    `);
  });

  it('array works', () => {
    const code = `
    curl "https://api.test.com/x?t=1" -u "some_username:some_password"

    curl "https://api2.test.com/x2?t=2" -u "some_username2:some_password2"
`;
    const ret = toJSON(code);
    expect(ret).toMatchInlineSnapshot(`
      Array [
        Object {
          "auth": Object {
            "password": "some_password",
            "user": "some_username",
          },
          "method": "get",
          "queries": Object {
            "t": "1",
          },
          "raw_url": "https://api.test.com/x?t=1",
          "url": "https://api.test.com/x",
        },
        Object {
          "auth": Object {
            "password": "some_password2",
            "user": "some_username2",
          },
          "method": "get",
          "queries": Object {
            "t": "2",
          },
          "raw_url": "https://api2.test.com/x2?t=2",
          "url": "https://api2.test.com/x2",
        },
      ]
    `);
  });

  it('get works', () => {
    const code = `
curl 'http://en.wikipedia.org/' \\
    -H 'Accept-Encoding: gzip, deflate, sdch' \\
    -H 'Accept-Language: en-US,en;q=0.8' \\
    -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36' \\
    -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' \\
    -H 'Referer: http://www.wikipedia.org/' \\
    -H 'Connection: keep-alive' --compressed
`;
    const ret = toJSON(code);
    expect(ret[0]).toEqual(curl2json(code));
    expect(ret).toMatchInlineSnapshot(`
      Array [
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
        },
      ]
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
    `;
    const ret = toJSON(code);
    expect(ret[0]).toEqual(curl2json(code));
    expect(ret).toMatchInlineSnapshot(`
      Array [
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
        },
      ]
    `);
  });

  it('post with query works', () => {
    const code = `
    curl -X post 'http://ww.x.com/i?t=2&x=1&t=\${uid}' --data 'z=2'
    `;
    const r1 = curl2json(code);
    const r2: any = toJSON(code)[0];
    expect(r2).toMatchInlineSnapshot(`
      Object {
        "data": Object {
          "z": "2",
        },
        "headers": Object {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        "method": "post",
        "queries": Object {
          "t": Array [
            "2",
            "\${uid}",
          ],
          "x": "1",
        },
        "raw_url": "http://ww.x.com/i?t=2&x=1&t=\${uid}",
        "url": "http://ww.x.com/i",
      }
    `);
    delete r2.headers;
    // ??
    r2.queries!.t![1] = `'${r2.queries!.t[1]}'`;
    expect(r2).toEqual(r1);
  });

  it('cookie works', () => {
    const code = `
curl 'http://en.wikipedia.org/' \
--header 'Cookie: d_t=8ceb8db40c49fc; n_m=NVRnqmStM; sessionid=36684d0c584632db6a; sessionid_ss=36684d0c4632db6a; sid_grd=36684d84632db6a%7C1666491976%7C5184000%7CThu%2C+22-Dec-2022+02%3A26%3A16+GMT; si_=36684d784632db6a; uid_=1706925e60ce; uid_s=17069285e60ce; MOOR_WD=9dd4aee2f60c2; ot=1bdab34ad92c12704d860f03bb8b96; t_csrf_token=208e8766096; t_csrf_t_d=208e84c4347e36096; inid=1966008919; eq=1$c9f62cd5; ken=49sKVZujfAD-tg==; ken=kHmZj4Of6abyGVzlZr4Lu6mtGQ==' \
`;
    const r1 = curl2json(code);
    const r2 = toJSON(code)[0];
    const c = cookie.parse(r2.headers!.Cookie!, {
      decode(s) {
        return s;
      },
    });
    expect(r2.cookies).toEqual(c);
    delete r2.headers!.Cookie;
    expect(r2).toEqual(r1);
  });
});
