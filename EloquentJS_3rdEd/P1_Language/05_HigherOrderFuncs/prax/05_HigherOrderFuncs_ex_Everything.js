/* Analogous to the `some` method, arrays also have an `every` method. This
one returns true when the given function returns `true` for _every_
element in the array. In a way, `some` is a version of the `||` operator
that accts on arrays, and `every` is like the `&&` operator.

Implement `every` as a funciton that takes an array and a predicate as
parameters. Write two versions, one using a loop and one using the `some`
method. */

function every_loop(array, test) {
    for (let index = 0; index < array.length; index++) {
        if (!test(array[index])) {
            return false
        }        
    }
    return true;
  }
  
console.log(every_loop([1, 3, 5], n => n < 10));
// → true
console.log(every_loop([2, 4, 16], n => n < 10));
// → false
console.log(every_loop([], n => n < 10));
// → true

function every_some(array, test) {
    if (array.some((element) => !test(element))) {
        return false;
    }
    return true;
  }
  
  
  
console.log(every_some([1, 3, 5], n => n < 10));
// → true
console.log(every_some([2, 4, 16], n => n < 10));
// → false
console.log(every_some([], n => n < 10));
// → true