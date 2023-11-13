/* 

You can get the Nth character, or letter, from a string by writing 
"string"[N]. The returned value will be a string containing only one 
character (for example, "b"). The first character has position 0, which 
causes the last one to be found at position string.length - 1. In other 
words, a two-character string has length 2, and its characters have 
positions 0 and 1.

Write a function `countsBs` that takes a string as its only argument
and returns a number that indicates and returns a number that indicates
how many uppercase "B" characters are in the string.

Next write a function called `countChar` that behaves like `countsBs`,
except it takes a second argument that indicates the character that
is to be counted (rather than counting only uppercase "B" characters).
Rewrite `countBs` to make use of this new function.
*/


// Your code here.


function countBs(s) {
    let numBs = 0;
    for (let index = 0; index < s.length; index++) {
        if (s[index] === 'B') numBs +=1;
    }
    return numBs;
}


console.log(countBs("BBC"));
// → 2
// console.log(countChar("kakkerlak", "k"));
// → 4