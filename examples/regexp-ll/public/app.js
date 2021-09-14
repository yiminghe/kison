import { parse, compile } from "../src/index.js";
import "./async.js";

let currentText;
let currentAst;

function getAst(value) {
  if (currentText === value) {
    return currentAst;
  }
  console.log("parse ***********************", value);
  currentText = value;
  currentAst = parse(value, {
    lexerOptions: { unicode: $("unicode").checked }
  });
  console.log(currentAst);
  if (currentAst.error) {
    console.error(currentAst.error.errorMessage);
  }
  console.log("***********************");
  return currentAst;
}

function $(id) {
  return document.getElementById(id);
}

const pattern = $("pattern");
const input = $("input");
const parseBtn = $("parseBtn");
const evaluate = $("evaluate");
const g = $("g");
const evaluate2 = $("evaluate2");

function getOptions() {
  return {
    bfs: $("bfs").checked,
    caseInsensitive: $("caseInsensitive").checked,
    multiline: $("multiline").checked,
    sticky: $("sticky").checked,
    unicode: $("unicode").checked,
    dotMatchesLineSeparators: $("dotMatchesLineSeparators").checked
  };
}

evaluate.addEventListener("click", () => {
  const start = Date.now();
  const options = getOptions();
  const patternInstance = compile(pattern.value, options);
  const matcher = patternInstance.matcher(input.value);
  let m;
  console.log(
    "*********************** " + input.value + ".match(/" + pattern.value + "/)"
  );
  let ok;
  while ((m = matcher.match())) {
    ok = true;
    console.log(m);
    if (!g.checked) {
      break;
    }
  }
  if (!ok) {
    console.log("no match!!");
  }
  console.log("***********************", Date.now() - start);
  console.log("");
});

evaluate2.addEventListener("click", () => {
  const start = Date.now();
  let flag = "g";
  const options = getOptions();
  if (options.multiline) {
    flag += "m";
  }
  if (options.caseInsensitive) {
    flag += "i";
  }
  if (options.dotMatchesLineSeparators) {
    flag += "s";
  }
  if (options.sticky) {
    flag += "y";
  }
  if (options.unicode) {
    flag += "u";
  }
  const reg = new RegExp(pattern.value, flag);
  const str = input.value;
  let m;
  console.log(
    "*********************** js native:" +
      input.value +
      ".match(/" +
      pattern.value +
      "/)"
  );
  let ok;
  while ((m = reg.exec(str))) {
    ok = true;
    console.log(m);
    if (!g.checked) {
      break;
    }
  }
  if (!ok) {
    console.log("no match!!");
  }
  console.log("***********************", Date.now() - start);
  console.log("");
});

range.addEventListener("click", () => {
  pattern.value = "(a|b){2,4}";
  input.value = "ababab";
});

$("lazy").addEventListener("click", () => {
  pattern.value = "a*?a";
  input.value = "aaa";
});

$("evil").addEventListener("click", () => {
  pattern.value = "(a*)*c";
  input.value = "a";
});

$("backreference").addEventListener("click", () => {
  pattern.value = "(a)(?<c>b)\\1\\k<c>";
  input.value = "ababab";
});

$("lookahead").addEventListener("click", () => {
  pattern.value = "(?=(a))(\\w)";
  input.value = "aba";
});
$("nagativeLookahead").addEventListener("click", () => {
  pattern.value = "(?!(b))(\\w)";
  input.value = "aba";
});

$("lookbehind").addEventListener("click", () => {
  pattern.value = "(?<=(b)(a))(\\w)";
  input.value = "dbacbac";
});

$("nagativeLookbehind").addEventListener("click", () => {
  pattern.value = "(?<!(d)(b))(\\w)";
  input.value = "dbacbac";
});

$("characterGroup").addEventListener("click", () => {
  pattern.value = "[1-9a.]";
  input.value = "222accbcc";
});

$("sticky_tc1").addEventListener("click", () => {
  pattern.value = "a";
  input.value = "aaxa";
});

$("unicode_tc1").addEventListener("click", () => {
  pattern.value = "\\uD83D";
  input.value = "\uD83D\uDC2A";
});

$("unicode_tc2").addEventListener("click", () => {
  pattern.value = "\uD83D";
  input.value = "\uD83D\uDC2A \uD83D";
});

$("unicode_tc3").addEventListener("click", () => {
  pattern.value = "^[\uD83D\uDC2A]$";
  input.value = "\uD83D\uDC2A";
});

$("unicode_tc4").addEventListener("click", () => {
  pattern.value = "^[\\uD83D\\uDC2A]$";
  input.value = "\uD83D";
});

$("unicode_tc5").addEventListener("click", () => {
  pattern.value = ".";
  input.value = "\uD83D\uDE80";
});

$("unicode_tc6").addEventListener("click", () => {
  pattern.value = "\uD83D\uDE80{2}";
  input.value = "\uD83D\uDE80\uD83D\uDE80";
});

$("unicode_tc7").addEventListener("click", () => {
  pattern.value = "\\uD83D\\uDE80{2}";
  input.value = "\uD83D\uDE80\uD83D\uDE80";
});

$("bfs_btn").addEventListener("click", () => {
  pattern.value = "(a|ab)b+";
  input.value = "abbb";
});

$("bfs_group_bug").addEventListener("click", () => {
  pattern.value = "((x)|(x|y))y";
  input.value = "xy";
});

parseBtn.addEventListener(
  "click",
  () => {
    currentText = undefined;
    getAst(pattern.value);
  },
  false
);
