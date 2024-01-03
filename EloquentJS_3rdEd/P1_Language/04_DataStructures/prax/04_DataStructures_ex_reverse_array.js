/* Arrays have a `reverse` method that changes the array by inverting the order
in which its elements appear. For this exercise, write two functions, `reverseArray`
and `reverseArrayInPlace`. The first, `reverseArray`, takes an array as argument
and produces a _new_ array that has the same elements in the inverse order. The 
second, `reverseArrayInPlace`, does what the `reverse` method does: it _modifies_
the array given as argument by reversing its elements. Neither may use the standard
`reverse` method.

Thinking back to the notes about side effects and pure functions in the previous
chapter, teach encourages one to ponder about which variant does on expect to 
be useful in more situations and which one runs faster.
 */


// Your code here.

function reverseArray(arr) {
    result = []
    while (arr.length > 0) {
        result.push(arr.pop())
    }
    return result
}

function reverseArrayInPlace(arr) {
    for (let index = arr.length-2; index >= 0; index--) {
        arr.push(arr.splice(index,1).pop())
    }
    return arr;
}


console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]


console.log('reverseArrayInPlace([1, 2, 3]):',reverseArrayInPlace([1, 2, 3]));