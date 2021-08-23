import { getTableNameByPosition } from "../languageService.js";
import { getAst } from "../cachedParser.js";

export default function createFormulaCompletionItemProvider(getNames) {
  return {
    triggerCharacters: ["[", "@"],
    provideCompletionItems(model, position, context) {
      let kind = "function";
      const suggestions = [];

      var word = model.getWordUntilPosition(position);
      let data = [];
      if (
        context.triggerCharacter === "[" ||
        context.triggerCharacter === "@"
      ) {
        const table = getTableNameByPosition(
          getAst(model.getValue()).terminalNodes,
          position
        );
        if (table) {
          kind = "table column";
          if (context.triggerCharacter === "[") {
            data = ["@"];
          }
          data = data.concat(
            getNames({
              table,
              kind
            })
          );
          if (context.triggerCharacter === "[") {
            data = data.concat(["#All", "#Data", "#Headers", "#Totals"]);
          }
        } else {
          return;
        }
      }

      data = data || getNames({ kind });

      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      data.forEach(function(fnName) {
        let oneSuggestion = {
          label: fnName,
          kind: monaco.languages.CompletionItemKind.Function,
          documentation: `${kind}: ${fnName}`,
          insertText: fnName,
          range: range
        };
        suggestions.push(oneSuggestion);
      });

      return { suggestions };
    }
  };
}
