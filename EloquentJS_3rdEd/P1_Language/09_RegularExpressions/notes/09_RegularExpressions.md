# REGULAR EXPRESSIONS

"Some people, when confronted with a prolem, thik 'I know, I'll use regular expressions.' Now 
they have two problem." -- James Zawinski

"When you cut against the grain of the wood, much strength is needed. When you program 
against the grain of the problem, much code is needed." -- Maser Yuan-Ma, *The Book of Programming*

Programming tools and techniques survive and spread in a chaotic, evolutionary way. It's not always 
the best or most brilliant ones that win, but rather the ones that function well enough within 
the right niche or that happen to be integrated with another successful piece of technology. 

In this chapter, teach will discuss one such tool, *regular expressions*. Regular expressions 
are a way to describe patterns in string data. They form a small, separate language that is part 
of JS and many other languages and systems. 

Regular expressions are both terribly awkward and extremely useful. Their syntax is cryptic 
and the programming interface JS provides for them is clumsy. But they are a powerful tool for 
inspecting and processing strings. Properly understanding regular expressions will make you a more 
effective programmer. 

## CREATING A REGULAR EXPRESSION

A regular expression is a type of object. It can be either constructed with the `RegExp` constructor 
or written as a literal by enclosing the pattern in forward slash (`/`) characters:

```js
let re1 = new RegExp("abc");
let re2 = /abc/;
```

Both of the regular expression objects above represent the same pattern: an *a* character 
followed by a *b* followed by a *c*. 

When using the `RegExp` constructor, the pattern is written as a normal string, so the 
usual rules apply for backslashes. 

The second notnation, where the pattenr appears between slash characters, treats backslashes 
somewhat differently. First, since a forward slash ends the pattern, we need to put a 
backslash before any forward slash that we want to be *part* of the pattern. In addition, 
backslashes that aren't part of special character codes (like `\n`) will be *preserved*, 
rather than ignored as they are in strings, and change the meaning of the pattern. Some 
characters, such as question amrkes and plus signs, have speical meanings in regular 
expressions and must be preceded by a backslash if they are meant to represent the character
itself:

```js
let aPlus = /A\+/;
```

## TESTING FOR MATCHES

Regular expression objects have a number of methods. The simplest one is `test`. If one passes it 
a string, it will return a Boolean indicating whether the string contains a match of the pattern 
in the expression:

```js
console.log(/abc/.test("abcde"));
// → true
console.log(/abc/.test("abxde"));
// → false
```

A regular expression consisting of only nonspecial characters simply represents the 
sequence of characters. If *abc* occurs anywhere in the string we are testing again (not 
just the start), `test` will return `true`. 

## SETS OF CHARACTERS

Finding out whether a string contains *abc* could just as well be done with a call to 
`indexOf`. Regular expressions are useful because they allow us to describe more 
complicated patterns.

Say one wants to match any number. In a regular expression, putting a set of characters 
between square brackets makes that part of the expression match any of the characters between 
the brackets. 

Both of the following expressions match all strings that contain a digit:

```js
console.log(/[0123456789]/.test("in 1992"));
// → true
console.log(/[0-9]/.test("in 1992"));
// → true
```

Within the square brackets, a hyphen (`-`) between two characters can be used to 
indicate a range of characters, where the ordering is determined by the character's 
Unicode number. Characters 0 to 9 sit right next to each other in this ordering (codes 48
to 57), so `[0-9]` covers all of them and matche any digit. 

A number of common character groups have their own built-in shortcuts. Digits are one of 
them: `\d` means the same things as `[0-9]`:

* `\d`: Any digit character

* `\w`: An alphanumeric character ("word character")

* `\s`: Any whitespace character (space, tab, newline, and similar)

* `\D`: A character that is *not* a digit

* `\W`: A nonalphanumeric character

* `\S`: A nonwhitespace character

* `.` : Any character except newline

One could match a date and time format like '01-30-2003 15:20' with the following expression:

```js
let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test("01-30-2003 15:20"));
// → true
console.log(dateTime.test("30-jan-2003 15:20"));
// → false
```

That regular expression looks completely awful, doesn't it? Half of it is backslashes, producing 
a background noise that makes it hard to spot the actual pattern expressed. We'll see a slightly 
improved version of this expression later. 

These backslash codes can also be used inside square brackets. For example, `[\d.]` means any digit 
or a period character. The period itself, between square brackets, loses its special meaning. The 
same goes for the other special characters, such as the plus sign (`+`).

To *invert* a set of characters -- that is, to express that one wants to match any character *except*
the ones in the set -- one can write a caret (`^`) character after the opening bracket: 

```js
let nonBinary = /[^01]/;
console.log(nonBinary.test("1100100010100110"));
// → false
console.log(nonBinary.test("0111010112101001"));
// → true
```

## INTERNATIONAL CHARACTERS

Because of JS' initial simplistic implementation and the fact that this simplistic approach was later
set in stone as standard behavior, JS' regular expressions are rather dumb about characters that do 
not appear in the English language. For example, as far as JS' regular expression are concernced, a 
"word character" in only one of the 26 characters in the Latin alphabet (uppercase or lowercase), 
decimal digits, and, for some reaosn, the underscore character. Things like `é` or `β`, which most 
definitely are word characters, will notmatch `\w` (and *will* match uppercase, `\W`, the nonword
category).

By a strange historical accident, `\s` (whitespace) does not have this problem and matches all 
characters that the Unicode standard considers whitespace, including things like the nonbreaking 
space and the Mongolian vowel separator. 

It is possible to use `\p` in a regular expression to match all characters to which the Unicode standard 
assigns a given property. This allows us to match things like letters in a more cosmopolitan way. However, 
again due to compatibility with the original language standards, those are recognized only when one
puts a character (for Unicode) after the regular expression. 

* `\p{L}`: Any letter

* `\p{N}`: Any numeric character

* `\p{P}`: Any punctuation character

* `\P{L}`: Any nonletter (uppercase P inverts)

* `\p{Script=Hangul}`: Any character from the given script (see 'C5')

Using `\w` for text processing that may need to handle non-English text (or even English text with borrowed words
like `"cliché"`) is a liability, since it won't treat characters like `"é"` as letters. Though they tend to be a bit
more verbose, `\p` property groups are more robust:

```js
console.log(/\p{L}/u.test("α"));
// → true
console.log(/\p{L}/u.test("!"));
// → false
console.log(/\p{Script=Greek}/u.test("α"));
// → true
console.log(/\p{Script=Arabic}/u.test("α"));
// → false
```

On the other hand, if one is matching numbers in order to do something with them, one often 
does want `\d` for digits, since converting arbitrary numeric characters into a JS number 
is not something that a function like `Number` can do for you. 

## REPEATING PARTS OF A PATTERN

We now know how to match a single digit. What if we want to match a whole number -- a sequence of 
one or more digits?

When one puts a plus sign (`+`) after something in a regular expression, it indicates that the element 
may be repeated more than once. Thus, `/\d+/` matches one or more digit characters. 

```js
console.log(/'\d+'/.test("'123'"));
// → true
console.log(/'\d+'/.test("''"));
// → false
console.log(/'\d*'/.test("'123'"));
// → true
console.log(/'\d*'/.test("''"));
// → true
```

The start (`*`) has a similar meaning but also allows the pattern to match zero times. 
Something with a start after itnever prevents a pattern form matching -- it'll just match 
zero instances if it can't find any suitable texxt to match. 

A question mark (`?`) makes a part of a pattern *optional*, meaning it may occur zero 
times or one time. In the following example, the *u* character is allowed to occur, but 
the pattenr also matches when it is missing:

```js
let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour"));
// → true
console.log(neighbor.test("neighbor"));
// → true
```

To indicate that a pattern should occur a precise number of times, use braces. 
Putting `{4}` after an element, for example, requires it to occur exactly 4 times. 
It is also possible to specify a range this way: `{2,4}` means the element must occur 
at least twice and at most four times.

Here is another version of the date and time pattern that allows both single- 
and double-digit days, months, and hours. It is also slightly easier to decipher. 

```js
let dateTime = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime.test("1-30-2003 8:45"));
// → true
```

One can also specify open-ended ranges when using braced by omitting the number 
after the comma. For example, `{5,}` means five or more times.

## GROUPING SUBEXPRESSIONS

To use an operator like `*` or `+` on more than one element at a time, one must 
use parentheses. A part of a regular exprssion that is enclosed in parentheses 
counts as a single element as far as the operators following it are connected. 

```js
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test("Boohoooohoohooo"));
// → true
```

The first and second `+` characters apply only to the second `o` in `boo` and 
`hoo`, respectively. The third `+` applies to the whole group `(hoo+)`, matching
one or more sequences like that. 

The `i` at the end of the expression in the exaple makes this regular expression 
case insensitive, allowing it to match the uppercase *B* in the inpput string, 
even though the pattern is itself all lowercase. 

## MATCHES AND GROUPS

The `test` method is the absolute simplest way to match a regular expression. It indicates 
only whether it matched and nothing else. Regular expressions also have an `exec` (execute) 
method that will return `null` if no match was found and return an object with information 
about the match otherwise:

```js
let match = /\d+/.exec("one two 100");
console.log(match);
// → ["100"]
console.log(match.index);
// → 8
```

An object returned from `exec` has an `index` property that tells us *where* in the string 
the successful match begins. Other than that, the object looks like (and in fact is) an 
array of strings, whose first element is the string that was matched. In the previous 
example, this is the sequence of digits that we were looking for. 

String values have a `match` method that behaves similarly. 

```js
console.log("one two 100".match(/\d+/));
// → ["100"]
```

When the regular expression contains subexpressions grouped with parentheses, the text that 
matched those groups will also show up in the array. The whole match is always the first element. 
The next element is the part matched by the first group (the one whose opening parenthesis comes 
first in the expression), then the second group, and so on.

```js
let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));
// → ["'hello'", "hello"]
```

When a group does not end up being matched at all (for example, when followed by a question mark),
its position in the output array will hold `undefined`. When a group is matched multiple times
(for example, when followed by a `+`), only the lats match ends up in the array.

```js
console.log(/bad(ly)?/.exec("bad"));
// → ["bad", undefined]
console.log(/(\d)+/.exec("123"));
// → ["123", "3"]
```

If one wants to use parentheses purely for grouping, without having them show up in the array matches, 
one can put `?:` after the opening parenthesis:

```js
console.log(/(?:na)+/.exec("banana"));
// → ["nana"]
```

Groups can be useful for extracting parts of a string. If we don't just want to verify whether a 
string contains a date but also extract it and construct an object that represents it, we can wrap
parentheses around the digit patterns and directly pick the date out of the result of `exec`. 

But first, we'll take a brief detour to discuss the built-in way to represent date and time values 
in JS. 

## THE DATE CLASS

JS has a standard `Date` class for representing dates, or rather, points in time. If one simply creates
a date object using `new`, one gets the current date and time. 

```js
console.log(new Date());
// → Fri Feb 02 2024 18:03:06 GMT+0100 (CET)
```

One can also create an object for a specific time.

```js
console.log(new Date(2009, 11, 9));
// → Wed Dec 09 2009 00:00:00 GMT+0100 (CET)
console.log(new Date(2009, 11, 9, 12, 59, 59, 999));
// → Wed Dec 09 2009 12:59:59 GMT+0100 (CET)
```

JS uses a convention where month numbers start at zero (so December is `11`), yet day numbers 
start at one. This is confusing and silly. Be careful. 

The last four arguments (hours, minutes, seconds, and milliseconds) are optional and taken to 
be zero when not given. 

Timestamps are stored as the number of milliseconds since the start of 1970, in the UTC time zone. 
This follows a convention set by "Unix time", which was invneted around that time. One can use 
negative numbers for times before 1970. The `getTime` method on a date object returns this number. 
It is big, as one can imagine:

```js
console.log(new Date(2013, 11, 19).getTime());
// → 1387407600000
console.log(new Date(1387407600000));
// → Thu Dec 19 2013 00:00:00 GMT+0100 (CET)
```

If one gives the `Date` constructor a single argument, that argument is treated as such a millisecond count. 
One can get the current millisecond count by creating a new `Date` object and callign `getTime` on it or 
by calling the `Date.now` function. 

Date objects provide methods such as `getFullYear`, `getMonth`, `getDate`, `getHours`, `getMinutes`, 
and `getSeconds` to extract their components. Besides `getFullYear`, there's also `getYear`, which 
gives you the year minus '1900' (such as '98' or `125') and is mostly useless.

Putting parentheses around the parts of the expression that we are interested in, we can create a date 
object from a string. 

```js
function getDate(string) {
  let [_, month, day, year] =
    /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  return new Date(year, month - 1, day);
}
console.log(getDate("1-30-2003"));
// → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)
```

The underscore (`_`) binding is ignored and used only to skip the full match element in the array 
returned by `exec`. 

## BOUNDARIES AND LOOK-AHEAD

Unfortunately, `getDate` will also happily extract a date from the string `"100-1-30000"`. A match 
may happen anywhere in the string, so in this case, it'sll just start at the second character and 
at the second-to-last character.

If we want to enforce that the match must span the whole string, we can add the markers `^` and `$`. 
The caret matches the start of the input string, whereas the dollar sign matches the end. Thus, 
`/^\d+$/` matches a string consisting entirely of one or more digits, `/^!` matches any string that 
starts with an exlamation mark, and `/x^/` does not match any string (there cannot be an `x` before the 
start of the string).

There is also a `\b` marker that maches *word boundaries*, positions that have a word characer on 
one side, an da nonword character on the other. Unfortunately, these use the same simplistic concept of
word characters as `\w` and are therefore not very reliable. 

Note that these boundary markers don't match any actual chracters. They just enforce that a given condition 
holds at the place where it appears in the pattern.

*Look-ahead* tests do something similar. They provide a pattern and will make the match fail if the input
doesn't match that pattern, but dont' actually move the match position forward. They are written between 
`(?=` and `)`.

```js
console.log(/a(?=e)/.exec("braeburn"));
// → ["a"]
console.log(/a(?! )/.exec("a b"));
// → null
```

The `e` in the first example is necessary to match, but is not part of the matched string. The `(?! )` notation 
expresses a *negative* look-ahead. This matches only if the pattern in the parentheses *doesn't* match, causing 
the second example to match only `a` characters that dont' have a space after them. 

## CHOICE PATTERNS

Say one wants to know whether a piece of text contains not only a number but a number follwoed by one of the 
words *pig*, *cow*, or *chicken*, or any of their plural forms. 

We could write three regular expression and test them in turn, but there is a nicer way. The pipe character `|`
denotes a choice between the pattern to its left and the pattern to its right. We can use it in expressions like 
this: 

```js
let animalCount = /\d+ (pig|cow|chicken)s?/;
console.log(animalCount.test("15 pigs"));
// → true
console.log(animalCount.test("15 pugs"));
// → false
```

Parentheses can be used to limit the part of the pattern to which the pipe operator 
applies, and one can put multiple such operators next to each other to express a 
choice between more than two alternatives.

## THE MECHANICS OF MATCHING

Conceptually, when one uses `exec` or `test`, the regular expression engine looks 
for a match in your string by trying to match the expression first from the start of 
the string, then from the second character, and so on until it finds a match or 
reaches the end of the string. It'll either return the first match that can be found 
or fail to find any match at all. 

To do the actual matching, teh engine treates a regular expression something like a
flow diagram. This is the diagram for the livestock expression in the previous 
example:

![RE flow diagram 1](../../../to_ignore/09_RegExpr/re_flow_diag_01.png)

If we can find a path from the left side of the diagram to the right side, our 
expression matches. We keep a current position in the string, and every tie 
we move through a box, we verify that the part of the string after our current 
position matches that box. 

## BACKTRACKING

The regular expression `/^([01]+b|[\da-f]+h|\d+)$/` matches either a binary number
follwoed by a `b`, a hexadecimal number (that is, base 16, with the letters `a` to `f`
standing for the digits `10` to `15`) followed by an `h`, or a regular decimal number 
with no suffix character. This is the corresponding diagram:

![RE flow diagram 2](../../../to_ignore/09_RegExpr/re_flow_diag_02.png)

When matching this expression, the top (binary) branch will often be entered even though
the input does not actually contain a binary number. When matching the string `"103"`, for
example, it becomes clear that only at the `3` that we are in the wrong branch. The string 
*does* match the expression, just not the branch we are currently in.

So the match *backtracks*. When entering a branch, it remembers its current position (in this 
case, at the start of the string, just past the first boundary box in the diagram) so that it 
can go back and try another branch if the current one does not work out. For the string `"103"`,
after encountering the `3` character, the matcher starts trying the branch for hexadecimal 
numbers, which fails again because there is no `h` after the number. It then tries the 
decimal number branch. This one fits, and a match is reported after all.

The matcher stops as soon as it finds a full match. This means that if multiple branches 
could potentially match a string, only the first one (ordered by where the branhes appear 
in the regular expression) is used.

Backtracking also happens for repitition operators like `+` and `*`. If one matches 
`/^.*x/` against `"abcxe"`, the `.*` part will first try to consume the whole string.
The engine will then realize that it needs an `x` to match the pattern. Since there is no 
`x` past the end of the string, the star operator tries to match one character less. But the
matcher doesn't find an `x` after `abcx` either, so it backtracks again, matching the start
operator to just `abc`. *Now* it finds an `x` where it needs it and reports a successful 
match form positions `0` to `4`. 

It is possible to write regular expression that will do a *lot* of backgracking. This problem 
occurs when a pattern can match a piece of input in many different ways. For example, if we 
get confused while writing a binary-number regular expression, we might accidentally write 
something like `/([01]+)+b/`.

![RE flow diagram 3](../../../to_ignore/09_RegExpr/re_flow_diag_03.png)

If that tries to match some long series of zeros and ones with no trailing *b* character, the 
matcher first goes through the inner loop until it runs out of digits. Then it notices there 
is not a *b*, so it backtracks one position, goes through the outer loop one, and gives 
up again, trying to backtrack out of inner loop once more. It will continue to try every 
possible route through these two loops. This means the amount of work *doubles* with each 
additional character. For even just a few dozen characters, the resulting match will take 
practically forever. 

## THE REPLACE METHOD 

String values have a `replace` method that can be used to replace part of the string with
another string. 

```js
console.log("papa".replace("p", "m"));
// → mapa
```

The first argument can also be a regular expression, in which case the first match of the 
regular expression is replaced. When a `g` option (for *global*) is added after the regular 
expression, *all matches in the string will be replaced, not just the first: 

<!-- HERE -- the replace method++ ! -->