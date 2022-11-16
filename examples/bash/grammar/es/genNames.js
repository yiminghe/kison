const keywords = [
  'for',
  'select',
  'in',
  'while',
  'util',
  'done',
  'do',
  'if',
  'then',
  'fi',
  'elif',
  'else',
  'case',
  'esac',
  'function',
  'declare',
  'typeset',
  'export',
  'readonly',
  'local',
  'unsetenv',
  'unset',
];

const lexer = [
  'raw_string',
  'string_content',
  'ansii_c_string',
  'simple_variable_name',
  'special_character',
  'word',
  'test_operator',
  // \n
  'line_end',
  // ((
  'DOUBLE_left_parentheses',
  // ))
  'DOUBLE_right_parentheses',
  // ;;&
  'double_semicolon_and',
  // ;&
  'semicolon_and',
  // ;;
  'double_semicolon',

  // =~
  'eq_curl',
  // \!=
  'not_eq',
  // ==
  'eq_eq',

  // +=
  'add_eq',
  // -=
  'minus_eq',
  // <(
  'less_brace',
  // >(
  'greater_brace',
  // >|
  'greater_pipe',
  // &>>
  'and_double_greater',
  // >>
  'double_greater',
  // >&
  'greater_and',
  // &>
  'and_greater',

  // <&
  'less_and',
  // <<<
  'triple_less',
  // <<-
  'double_less_minus',
  // <<
  'double_less',

  // <=
  'less_eq',
  // >=
  'greater_eq',
  // |&
  'pipe_and',
  // &&
  'double_and',
  // ||
  'double_pipe',

  // [[
  'double_left_bracket',
  // ]]
  'double_right_bracket',
  // :-
  'comma_minus',
  // :?
  'comma_marl',
  // ++
  'double_add',
  // --
  'double_minus',

  // \?
  'mark',
  // \!
  'exclamation',
  // $(
  'dollar_brace',
  // ${
  'dollar_left_brace',
  // $
  'dollar',
  // "
  'quote',
  // #
  'hash',
  // /
  'slash',
  // [
  'left_bracket',
  // ]
  'right_bracket',
  // |
  'pipe',
  // )
  'right_parentheses',
  // (
  'left_parentheses',
  // {
  'left_brace',
  // }
  'right_brace',
  // ;
  'semicolon',
  // =
  'eq',
  // >
  'greater',
  // <
  'less',
  // :
  'comma',
  // +
  'add',
  // -
  'minus',
  // %
  'mod',
  // `
  'back_slash',
  // *
  'mul',
  // @
  'at',
  // _
  'underscore',
].map((v) => v.toUpperCase());

const symbols = [
  'progam',
  'statements',
  'statement',
  'heredoc_body',
  'terminator',
  'statements2',
  'terminated_statement',
  'redirected_statement',
  'variable_assignment',
  'command',
  'declaration_command',
  'unset_command',
  'test_command',
  'negated_command',
  'for_statement',
  'c_style_for_statement',
  'while_statement',
  'if_statement',
  'case_statement',
  'pipeline',
  'list',
  'subshell',
  'compound_statement',
  'function_definition',
  'file_redirect',
  'heredoc_redirect',
  'herestring_redirect',
  'literal',
  'do_group',
  'expression',
  'elif_clause',
  'else_clause',
  'case_statement',
  'case_item',
  'last_case_item',
  'function_definition',
  'variable_assignment',
  'command_name',
  'regex',
  'variable_name',
  'subscript',
  'array',
  'empty_value',
  'concat',
  'heredoc_start',
  'simple_heredoc_body',
  'heredoc_body_beginning',
  'expansion',
  'simple_expansion',
  'command_substitution',
  'heredoc_body_middle',
  'heredoc_body_end',
  'unary_expression',
  'ternary_expression',
  'binary_expression',
  'postfix_expression',
  'parenthesized_expression',
  'concatenation',
  'primary_expression',
  'string_expansion',
  'string',

  'array',
  'special_variable_name',
];

const names = Array.from(new Set(keywords.concat(lexer).concat(symbols)));

const code = [];
for (const k of names) {
  if (!k) {
    continue;
  }
  code.push(`export const ${k}Name = '${k}';`);
}

code.push('export const makeExtendSymbols = (options:any)=>({');

for (const k of names) {
  if (!k) {
    continue;
  }
  code.push(`${k}Optional: options.makeOptionalSymbol('${k}'),`);
  code.push(`${k}ZeroOrMore: options.makeZeroOrMoreSymbol('${k}'),`);
  code.push(`${k}OneOrMore: options.makeOneOrMoreSymbol('${k}'),`);
}
code.push('});');

code.push(`export const KEYWORDS=${JSON.stringify(keywords)};`);

code.push(`
export const makeProductions = (arr:any)=>{
  return arr.map((a:any)=>{
    if(Array.isArray(a)) {
       return {
         symbol: a[0],
         rhs: a.slice(1)
       };
    }
    return a;
  });
};

export const makeLexerRules = (arr:any) => {
  return arr.map((a:any) => {
    if (Array.isArray(a)) {
      const ret:any = {
        token: a[0],
        regexp: a[1],
      };
      if (a[2]) {
        ret.action = a[2];
      }
      return ret;
    }
    return a;
  });
};
`);

code.push(`export const PREFIX = "PREFIX";`);

require('fs').writeFileSync(__dirname + '/names.ts', code.join('\n'));
