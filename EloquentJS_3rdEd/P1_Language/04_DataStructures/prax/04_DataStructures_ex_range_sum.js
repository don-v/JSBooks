/* The introduction of this book alluded to the following as a nice way to compute
the sum of a range of numbers:
 */

// console.log(sum(range(1, 10)));


/* Write a `range` function that takes two arguments, `start` and `end`, and returns
an array containing all the numbers from `start` up to (and including) `end`.

Next, write a `sum` function that takes an array of numbers and returns the sum of
these numbers. Run the example program and see whether it does indeed return `55`.

As a bonus assignment, one should modify one's `range` function to take an optional
third argument that indicates the `step` value used when building the array. If no
step is given, the elements go up by increments of one, corresponding to the old
behavior. The function call `range(1, 10, 2)` should return `[1, 3, 5, 7, 9]`.
Make sure that it also works with negative step values so that `range(5, 2, -1)`
produces  `[5, 4, 3, 2]`
 */


// Your code here.

function range1(start, end) {
    let x = [start]
    for (let index = start + 1; index <= end; index++) {
        x.push(index);
    }
    return x;
}


function sum1(arr) {
    total = 0;
    for (let x of arr) {
        total += x;
    }
    return total
}


function range2(start, end, step=1) {
    let x = [start]
    if (step > 0) {
        for (let index = start + step; index <= end; index += step) {
            x.push(index);
        }    
    } else {
        for (let index = start + step; index >= end; index += step) {
            x.push(index);
        }
    }
    return x;
}


console.log('console.log(range1(1, 10));:',range1(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log('console.log(range2(5, 2, -1));:',range2(5, 2, -1));
// → [5, 4, 3, 2]
console.log('console.log(range2(1, 10, 2));:',range2(1, 10, 2));
// → [ 1, 3, 5, 7, 9 ]
console.log('console.log(sum1(range1(1, 10)));:',sum1(range1(1, 10)));
// → 55

