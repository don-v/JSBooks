/* 
*Code golf* is a term used for the game of trying to express a particular program in 
as few characters as possible. Similarly, *regexp golf* is the practice of writing as 
tiny a regular expression as possible to match a given pattern and *only* that pattern. 

For each of the following items, write a regular expression to test whether the given 
pattern occurs in a string. The regular expression should match only strings containing 
the pattern. When one's expression works, see if one can make it smaller.

1. *car* and *cat*
2. *pop* and *prop*
3. *ferret*, *ferry*, and *ferrari*
4. Any word ending in *ious*
5. A whitespace character followed by a period, comma, colon, or semicolon.
6. A word longer than 6 letters.
7. A word without the letter *e* (or *E*)

*/

// Fill in the regular expressions

let re1 = /abc/;   // example template...

verify(/ca[r|t]/,
    ["my car", "bad cats"],
    ["camper", "high art"]);

verify(/pr?op/,
    ["pop culture", "mad props"],
    ["plop", "prrrop"]);

verify(/ferr[eya]/,
    ["ferret", "ferry", "ferrari"],
    ["ferrum", "transfer A"]);

verify(/ious$|ious\s+/,
    ["how delicious", "spacious room"],
    ["ruinous", "consciousness"]);

verify(/\s[\.,:;]/,
    ["bad punctuation ."],
    ["escape the period"]);

verify(/\w{6,}/,
    ["Siebentausenddreihundertzweiundzwanzig"],
    ["no", "three small words"]);


/* 
/\b\w*[^eE]\w*\b/
/\b\w*[^\WeE]\w*\b/
/\b\w*[^\seE]\w*\s+\w*[^\seE]\w*\b/

\b[^eE\s]+\b
\b[^\WeE]+\b
\b(?:(?!\w*[eE])\w)+\b

*/

verify(/\b[^eE\s]+\b/,
    ["red platypus", "wobbling nest"],
    ["earth bed", "bedrøvet abe", "BEET"]);


function verify(regexp, yes, no) {
// Ignore unfinished exercises
if (regexp.source == "...") return;
for (let str of yes) if (!regexp.test(str)) {
 console.log(`Failure to match '${str}'`);
}
for (let str of no) if (regexp.test(str)) {
 console.log(`Unexpected match for '${str}'`);
}
}