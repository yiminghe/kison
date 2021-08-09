# regexp in js

https://github.com/yiminghe/kison

## usage

```js
import * as regexp from '@yiminghe/regexp';

// parse ast
console.log(regexp.parse('(a|b)*z'));

// match
const patternInstance = regexp.compile('(a|b)*z');
const options={
  multiline:false,
  caseInsensitive:false,
  dotMatchesLineSeparators:false,
};
const matcher = patternInstance.matcher('abzaaz', options);
let m;
while (m = matcher.match()) {
  console.log(m);
}
```

## Features

### Character Classes

A character class matches any one of a set of characters.

- <code><b>[</b><i>character_group</i><b>]</b></code> – matches any single character in *character_group*, e.g. `[ae]`
- <code><b>[^</b><i>character_group</i><b>]</b></code> – negation, matches any single character that is not in *character_group*, e.g. `[^ae]`
- <code><b>[</b><i>first</i><b>-</b><i>last</i><b>]</b></code> – character range, matches any single character in the given range from *first* to *last*, e.g. `[a-z]`
- <code><b>.</b></code> – wildcard, matches any single character except `\n`
- <code><b>\w</b></code> - matches any word character (negation: <code><b>\W</b></code>)
- <code><b>\s</b></code> - matches any whitespace character (negation: <code><b>\S</b></code>)
- <code><b>\d</b></code> - matches any decimal digit (negation: <code><b>\D</b></code>)
- <code><b>\z</b></code> - matches end of string (negation: <code><b>\Z</b></code>)

### Character Escapes

The backslash (<code>\\</code>) either indicates that the character that follows is a special character or that the keyword should be interpreted literally.

- <code><b>\\</b><i>keyword</i></code> – interprets the keyword literally, e.g. `\{` matches the opening bracket
- <code><b>\\<i></b>special_character</i></code> – interprets the special character, e.g. `\b` matches word boundary (more info in "Anchors")
- <code><b>\\u<i></b>hexadecimal_number</i></code> – interprets the hexadecimal number to char, e.g. `\u0061` matches character 'a'
- <code><b>\\x<i></b>hexadecimal_number</i></code> – interprets the hexadecimal number to char, e.g. `\x61` matches character 'a'


### Anchors

Anchors specify a position in the string where a match must occur.

- <code><b>^</b></code> – matches the beginning of the string (or beginning of the line when `.multiline` option is enabled)
- <code><b>$</b></code> – matches the end of the string or `\n` at the end of the string (end of the line in `.multiline` mode)
- <code><b>\A</b></code> – matches the beginning of the string (ignores `.multiline` option)
- <code><b>\Z</b></code> – matches the end of the string or `\n` at the end of the string (ignores `.multiline` option)
- <code><b>\z</b></code> – matches the end of the string (ignores `.multiline` option)
- <code><b>\G</b></code> – match must occur at the point where the previous match ended
- <code><b>\b</b></code> – match must occur on a boundary between a word character and a non-word character (negation: `\B`)

## Assertions

- <code><b>x(?=y)</b></code> – <b>Lookahead assertion</b>: Matches "x" only if "x" is followed by "y". For example, /Jack(?=Sprat)/ matches "Jack" only if it is followed by "Sprat".
/Jack(?=Sprat|Frost)/ matches "Jack" only if it is followed by "Sprat" or "Frost". However, neither "Sprat" nor "Frost" is part of the match results.

- <code><b>x(?!y)</b></code> – <b>Negative lookahead assertion</b>: Matches "x" only if "x" is not followed by "y". For example, /\d+(?!\.)/ matches a number only if it is not followed by a decimal point. /\d+(?!\.)/.exec('3.141') matches "141" but not "3".

- <code><b>(?<=y)x</b></code> – <b>Lookbehind assertion</b>: Matches "x" only if "x" is preceded by "y". For example, /(?<=Jack)Sprat/ matches "Sprat" only if it is preceded by "Jack". /(?<=Jack|Tom)Sprat/ matches "Sprat" only if it is preceded by "Jack" or "Tom". However, neither "Jack" nor "Tom" is part of the match results.

- <code><b>(?<!y)x</b></code> – <b>Negative lookbehind assertion</b>: Matches "x" only if "x" is not preceded by "y". For example, /(?<!-)\d+/ matches a number only if it is not preceded by a minus sign. /(?<!-)\d+/.exec('3') matches "3". /(?<!-)\d+/.exec('-3')  match is not found because the number is preceded by the minus sign.

### Grouping Constructs

Grouping constructs delineate the subexpressions of a regular expression and capture the substrings of an input string.

- <code><b>(</b><i>subexpression</i><b>)</b></code> – captures a *subexpression* in a group
- <code><b>(?&lt;name&gt;</b><i>subexpression</i><b>)</b></code> – captures a *subexpression* in a named group
- <code><b>(?:</b><i>subexpression</i><b>)</b></code> – non-capturing group

### Backreferences

Backreferences provide a convenient way to identify a repeated character or substring within a string.

- <code><b>\\</b><i>number</i></code> – matches the capture group at the given ordinal position e.g. `\4` matches the content of the fourth group

- <code><b>\\k&lt;</b><i>name</i><b>&gt;</b></code> – matches the capture group at the given name e.g. `\k<c>` matches the content of the named group `c`

### Quantifiers

Quantifiers specify how many instances of a character, group, or character class must be present in the input for a match to be found.

- <code><b>\*</b></code> – match zero or more times
- <code><b>+</b></code> – match one or more times
- <code><b>?</b></code> – match zero or one time
- <code><b>{</b><i>n</i><b>}</b></code> – match exactly *n* times
- <code><b>{</b><i>n</i><b>,}</b></code> – match at least *n* times
- <code><b>{</b><i>n</i><b>,</b><i>m</i><b>}</b></code> – match from *n* to *m* times, closed range, e.g. `a{3,4}`

All quantifiers are **greedy** by default, they try to match as many occurrences of the pattern as possible. Append the `?` character to a quantifier to make it lazy and match as few occurrences as possible, e.g. `a+?`.

> Warning: **lazy** quantifiers might be used to control which groups and matches are captured, but they shouldn't be used to optimize matcher performance which already uses an algorithm which can handle even nested greedy quantifiers.

### Alternation

- <code><b>|</b></code> – match either left side or right side

### Options

- `caseInsensitive` – match letters in the pattern independent of case.
- `multiline` –  control the behavior of `^` and `$` anchors. By default, these match at the start and end of the input text. If this flag is set, will match at the start and end of each line within the input text.
- `dotMatchesLineSeparators` – allow `.` to match any character, including line separators.
- `bfs` - whether match by breadth first search strategy. Can only be used when check whether is matched);