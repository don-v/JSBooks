let x = `function reduce(array, combine, start) {
    let current = start;
    for (let element of array) {
      current = combine(current, element);
    }
    return current;
  }
  
  console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
  // → 10`;

console.log(x);

function reduce(array, combine, start) {
    let current = start;
    for (let element of array) {
      current = combine(current, element);
    }
    return current;
  }
  
console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// → 10

x = `console.log([1, 2, 3, 4].reduce((a, b) => a + b));
// → 10`;

console.log(x);

console.log([1, 2, 3, 4].reduce((a, b) => a + b));
// → 10

