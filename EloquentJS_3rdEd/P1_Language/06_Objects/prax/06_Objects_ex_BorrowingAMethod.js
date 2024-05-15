/* 
Earlier in the chapter teach mentioned that an object's `hasOwnProperty` can be used as 
a more robust alternative to the `in` operator when one wants to ignore the prototype's
properties. But what if one's map needs to include the word `"hasOwnProperty"` One won't
be able to call that method anymore because the object's own property hides the method
value.

Can you think of a way to call `hasOwnProperty` on an object that has its own 
property by that name?
*/

let map = {one: true, two: true, hasOwnProperty: true};

const hasOwnProperty = Symbol("hasOwnProperty");

map[hasOwnProperty] = function(x) {
    for (let z of this) {
        if (x === z) return true
    }
    return false
}

// let x = Object.getPrototypeOf(map);
// console.log(x);

// Fix this call
console.log(map.hasOwnProperty("one"));
// → true