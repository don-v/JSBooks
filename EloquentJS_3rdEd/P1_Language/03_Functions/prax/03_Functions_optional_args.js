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

function minus(a, b) {
    if (b === undefined) return -a;
    else return a - b;
  }
  
  console.log('minus(10):',minus(10));
  // → -10
  console.log('minus(10, 5)',minus(10, 5));
  // → 5

  