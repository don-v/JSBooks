let x = `let arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.
// → [1, 2, 3, 4, 5, 6]`;

console.log(x);

let arrays = [[1, 2, 3], [4, 5], [6]];
// Your code here.
// → [1, 2, 3, 4, 5, 6]

function flatten(arr) {
    return arr.reduce(
        (accumulator, currentValue) => accumulator.concat(currentValue)
    );
}

console.log(flatten(arrays));