let x = `for (let number = 0; number <= 12; number = number + 2) {
    console.log(number);
}
`

console.log(x);

let y = `for (let number = 0; number <= 12; number = number + 2) {
    console.log(number);
  }
  // → 0
  // → 2
  //   … etcetera
`;

console.log(y);

let z = `  let result = 1;
  for (let counter = 0; counter < 10; counter = counter + 1) {
    result = result * 2;
  }
  console.log(result);
  // → 1024`;

console.log(z);