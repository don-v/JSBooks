const ex = `
function square(x) { return x * x; }
console.log(square(4, true, "hedgehog"));
// → 16
`;

console.log(ex);

function square(x) { return x * x; }
console.log('square(4, true, "hedgehog"):',square(4, true, "hedgehog"));
// → 16

const ex2 = `
function minus(a, b) {
    if (b === undefined) return -a;
    else return a - b;
  }
  
  console.log(minus(10));
  // → -10
  console.log(minus(10, 5));
  // → 5
`

console.log(ex2);

function minus(a, b) {
    if (b === undefined) return -a;
    else return a - b;
  }
  
  console.log('minus(10):',minus(10));
  // → -10
  console.log('minus(10, 5)',minus(10, 5));
  // → 5

const ex3 = `
function power(base, exponent = 2) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
}

console.log(power(4));
// → 16
console.log(power(2, 6));
// → 64
`;

console.log(ex3);

function power(base, exponent = 2) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
}

console.log(power(4));
// → 16
console.log(power(2, 6));
// → 64

const ex4 = `
console.log("C", "O", 2);
// → C O 2
`;

console.log(ex4);

console.log('console.log("C", "O", 2);',"C", "O", 2);
// → C O 2