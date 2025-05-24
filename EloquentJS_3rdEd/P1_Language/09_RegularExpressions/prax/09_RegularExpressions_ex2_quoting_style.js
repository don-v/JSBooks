/* 
Imagine one has written a story and used single quotation marks throughout to 
mark pieces of diaglogue. Now one wants to replace all the dialogue with 
double quotes, while keeping the single quotes used in contractions like 
*aren't*.

Think of a pattern that distinguishes these two kinds of quote usages and create a 
call to the replace method that does the proper replacement.
*/

let text = "'I'm the cook,' he said, 'it's my job.'";
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
console.log(/'\w+/g.test(z));

// console.log(text.replace(/'/g, '"'));
// → "I'm the cook," he said, "it's my job."
