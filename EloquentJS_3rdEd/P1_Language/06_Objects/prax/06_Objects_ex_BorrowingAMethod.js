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


// Call hasOwnProperty from Object.prototype
console.log(Object.prototype.hasOwnProperty.call(map, "one"));
console.log(Object.prototype.hasOwnProperty.call(map, "hasOwnProperty"));
// → true



// // Fix this call
// console.log(map[hasOwnProperty]("one"));
// // → true