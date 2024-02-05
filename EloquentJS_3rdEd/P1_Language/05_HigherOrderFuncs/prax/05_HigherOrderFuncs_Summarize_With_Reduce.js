require('./../../../to_ignore/05_HigherOrderFuncs/scripts.js');

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

x = `function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
}

console.log(SCRIPTS.reduce((a, b) => {
  return characterCount(a) < characterCount(b) ? b : a;
}));
// → {name: "Han", …}`;

console.log(x);

function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
}

console.log(SCRIPTS.reduce((a, b) => {
  return characterCount(a) < characterCount(b) ? b : a;
}));
// → {name: "Han", …}