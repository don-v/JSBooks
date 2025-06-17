/* 
Imagine one has written a story and used single quotation marks throughout to 
mark pieces of diaglogue. Now one wants to replace all the dialogue with 
double quotes, while keeping the single quotes used in contractions like 
*aren't*.

Think of a pattern that distinguishes these two kinds of quote usages and create a 
call to the replace method that does the proper replacement.
*/


// Change this call.

/* 
single quotes 
open: followed by (close+space, or close plus end)
close: followed by space or end an preceded by open that is preceded by beginning or space

apostrophe:
followed by a letter, never a space
and preceded by an single-quote that is the beginning of a phrase

lookahead:
(?=pattern)
(?!pattern)

lookbefore:
(?<=pattern)
(?<!pattern)


*/
let z=" 'it's'";
// console.log(/'\s?$/g.test("'"));
// console.log(/^\s?'/g.test(z));
// console.log(/^\s?'\w+/g.test(z));
// console.log(/(?<=^\s?'\w+)'/g.test(z)); // finds apostrophe following opening single quote
// console.log(/(?<=^\s?'\w+)'\w+/g.test(z)); // looks before apostrophe and finds an opening single quote
// console.log(/'\w+(?='\s?$)/g.test(z)); // finds apostophe with a look head to closing single quote

// console.log(/(?<='.+'\w\s)'\s?$/g.test(text));
// console.log(/(?<=^\s?'\w+)'+/g.exec(text));  // catches the apostrophe at index=2 **********************
// console.log(text);
// console.log(text.replace(/(?<='\w+'\w+)'\s?$/g, '"')); // this successfully replaced opening single quote with double!

// console.log(/(?:(?<=^\s?'\w+'.+)')+/g.exec(text)); 

// https://stackoverflow.com/questions/70391646/how-to-reset-entire-match-at-the-end-of-a-capturing-group


// console.log(/(^\s?'\w+'\w\s\w+'\s?$)+/g.test(text)); failed

// console.log(/'(?=\w+'\w+)/g.test(text));
// console.log(text);
//***********************// console.log(text.replace(/'(?=\w+'\w+)/g, '"')); // this successfully replaced opening single quote with double!

// console.log(/'(?=\w+'\w+)/g.test(text));
// console.log(/^\s?'(?=\w+'\w+)/g.exec(text)); // ******************************** index=0


// console.log(/'\w+(?='\s?$)/g.test(text)); // not correct, yet.
// console.log(/'\w+(?='\w+)/g.test(text)); // registered as true -- i think this isolates first opening single quote


// console.log(text.replace(/'/g, '"'));
// → "I'm the cook," he said, "it's my job."


let text = "'I'm the cook,' he said, 'it's my job.'";
let result = text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2');
console.log(result);

/* 

Explanation:

    (^|\W)': Matches a single quote ' that is either:

        At the start of the string ^

        Or preceded by a non-word character \W (like space or punctuation)

    '(\W|$): Matches a single quote ' that is either:

        Followed by a non-word character \W (like a comma or space)

        Or at the end of the string $

    $1"$2: Replaces the matched single quote with a double quote, preserving surrounding characters

Absolutely! Let's walk through the regular expression and the replacement part "$1"$2 in detail.
🔍 The Regex

/(^|\W)'|'(\W|$)/g

This pattern is designed to find only the single quotes that are acting as quotation marks, not apostrophes in words like “I’m” or “it’s”.

We break it into two parts (separated by the |, which means "or"):

    (^|\W)'

        This matches a single quote ' that comes at the beginning of a quote.

        (^|\W) means:

            ^: Start of the string, or

            \W: A non-word character (i.e., anything that’s not a letter, digit, or underscore)

        Example match: in the start of 'I'm or he said, '.

    '(\W|$)

        This matches a single quote ' that comes at the end of a quote.

        (\W|$) means:

            \W: A non-word character (like a comma or space), or

            $: End of the string

        Example match: in cook,' or job.'

So altogether, the regex matches only opening and closing single quotation marks — not apostrophes inside words.
🛠 The Replacement

'$1"$2'

This is the replacement string. Let's break it down:

    $1: This refers to the first captured group — (^|\W) from the first part of the regex.

    ": We insert a double quote in place of the single quote.

    $2: This refers to the second captured group — (\W|$) from the second part of the regex.

⚠️ Importantly, only one of the two parts will match at any time, so only one of $1 or $2 will actually contain something.
Examples:
Match 1 (opening quote)

Text: 'I'm
Regex match: (^|\W)' → captures ^ (start of string) and '
Replacement: $1" → becomes "
Result: "I'm
Match 2 (closing quote)

Text: cook,'
Regex match: '\W → captures ' and ,
Replacement: "$2 → becomes ",
Result: cook,"
✅ Final Example

let text = "'I'm the cook,' he said, 'it's my job.'";
let result = text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2');

console.log(result);
// Output: "\"I'm the cook,\" he said, \"it's my job.\""

Key Points:

    Contractions like I'm and it's stay unchanged.

    Quotation marks get replaced by double quotes.

    The surrounding characters (space, punctuation) are preserved correctly using $1 and $2.

Let me know if you want to see a version that also handles nested quotes or more advanced punctuation.


*/