#!/usr/bin/env node

/**
 * Generate parser function using LALR algorithm.
 * @author yiminghe@gmail.com
 */

var Utils = require("../lib/utils"),
  KISON = require("../lib/"),
  fs = require("fs"),
  path = require("path"),
  encoding = "utf-8";

var program = require("commander");
program
  .option("-g, --grammar <grammar>", "Set kison grammar file")
  .option("-n, --name [name]", "Set file name")
  .option("-m, --mode [mode]", "lalr or ll")
  .option("-w, --watch", "Watch grammar file change")
  .option("--es [es]", "generate es module")
  // defaults bool true
  .option("--no-compressSymbol", "Set compress symbol")
  .option("--compressLexerState", "Set compress lexer state")
  .parse(process.argv);

var options = program.options;

var grammar = path.resolve(program.grammar);

options.forEach(function(o) {
  var name = o.name();
  if (o.required && !(name in program)) {
    program.optionMissingArgument(o);
  }
});

var kisonCfg = {
  compressLexerState: program.compressLexerState,
  compressSymbol: program.compressSymbol
};

var grammarBaseName = program.name
  ? program.name
  : path.basename(grammar, "-grammar.js");

const mode = program.mode || "lalr";

var modulePath = path.resolve(grammar, "../" + grammarBaseName + ".js");

var codeTemplate = `
  /*
    Generated by kison.
  */
  var ${grammarBaseName} = (function(undefined){
  ${"{{code}}"}
  return parser;
  })();
`;

if (program.es) {
  codeTemplate += `
    export default ${grammarBaseName};
`;
} else {
  codeTemplate += `
  if(typeof module !== 'undefined') {
    module.exports = ${grammarBaseName};
  }
`;
}

function myJsBeautify(str) {
  try {
    return require("prettier").format(str, {
      parser: "babel"
    });
  } catch (e) {
    console.log(e);
  }
  return str;
}

function genParser() {
  var grammarObj = require(grammar);

  if (typeof grammarObj === "function") {
    grammarObj = grammarObj();
  }

  const Cons = mode === "lalr" ? KISON.LALRGrammar : KISON.LLGrammar;

  console.info("start generate grammar module: " + modulePath + "\n");
  var start = Date.now();
  /*jshint evil:true*/
  var code = new Cons(grammarObj).genCode(kisonCfg);

  var moduleCode = codeTemplate.replace("{{code}}", myJsBeautify(code));

  fs.writeFileSync(modulePath, moduleCode, encoding);

  console.info(
    "generate grammar module: " +
      modulePath +
      " at " +
      new Date().toLocaleString()
  );
  console.info("duration: " + (Date.now() - start) + "ms");
}

var bufferCompile = Utils.buffer(genParser);

if (program.watch) {
  fs.watch(grammar, bufferCompile);
  genParser();
} else {
  bufferCompile();
}
