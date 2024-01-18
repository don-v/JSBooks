/* Objects, a generic blobs of values, can be used to build all sorts of data structures. A 
common data structureis the _list_ (not to be confused with array). A list is a nested set 
of objects, with the first object building holding a reference to the second, the second
to the third, and so on.

```js
let list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};
```

A nice thing about lists is that they can share parts of their structure. For example, if
teach creates two new values `{value: 0, rest: list}` and `{value: -1, rest: list}` (with
`list` referring to the binding defined earlier), they are both independent lists, but 
they share the structure that makes up their last three elements. The original list is
also still a valid three-element list.

Write a function `arrayToList` that builds up a list structure like the one shown
given `[1, 2, 3]` as argument. also write a `listToArray` function that produces an array
from list. Then add a helper function `prepend`, which takes an element and a list and
creates a new list that adds the element to the front of the input list, and `nth`, 
which takes a list and a number and returns the element at the given position in the 
list (with zero referring to the first element) or `undefined` when there is no such
element. 

If one hasn't already, also write a recursive version of `nth`.
 */

// Your code here.

function arrayToList(array, ) {
  new_array = array.slice(1);
  return {value: array[0], rest: array[1] ? arrayToList(new_array) : null  }
}

function listToArray(list) {
  array = new Array;
  array.push(list.value);
  return list.rest ? array.concat(listToArray(list.rest)) : array;
}

function prepend(value, list) {
  let rest = list;
  return {value, rest};
}

function nth(list, idx) {
  
}

console.log(arrayToList([10, 20, 30]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
// console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20