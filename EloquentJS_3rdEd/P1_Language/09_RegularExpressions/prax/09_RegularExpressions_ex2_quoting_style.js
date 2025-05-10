/* 
Imagine one has written a story and used single quotation marks throughout to 
mark pieces of diaglogue. Now one wants to replace all the dialogue with 
double quotes, while keeping the single quotes used in contractions like 
*aren't*.

Think of a pattern that distinguishes these two kinds of quite usages and create a 
call to the replace method that does the proper replacement.
*/

let text = "'I'm the cook,' he said, 'it's my job.'";
// Change this call.
console.log(text.replace(/'/g, '"'));
// → "I'm the cook," he said, "it's my job."
