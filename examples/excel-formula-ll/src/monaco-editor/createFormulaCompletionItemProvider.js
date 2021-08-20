export default function createFormulaCompletionItemProvider(functionNames) {
  return {
    provideCompletionItems(model, position) {
      const suggestions = [];

      var word = model.getWordUntilPosition(position);

      var range = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn
      };

      functionNames.forEach(function(fnName) {
        let oneSuggestion = {
          label: fnName,
          kind: monaco.languages.CompletionItemKind.Function,
          documentation: `function: ${fnName}`,
          insertText: fnName,
          range: range
        };
        suggestions.push(oneSuggestion);
      });

      return { suggestions };
    }
  };
}
