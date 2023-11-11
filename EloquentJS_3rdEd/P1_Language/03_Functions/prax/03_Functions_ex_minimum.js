let x = `
// Your code here.

console.log(min(0, 10));
// → 0
console.log(min(0, -10));
// → -10
`;

/* 
The previous chapter introduced the standard function `Math.min` that 
returns its smallest argument. We can build something like that now. 
Write a function `min` that takes two arguments and returns their 
minimum:
*/

function min_(a,b) {
    if (a < b) {
        return a
    }
    return b
}

console.log('min_(0,10):',min_(0,10))
console.log('min_(0,-10):',min_(0,-10))