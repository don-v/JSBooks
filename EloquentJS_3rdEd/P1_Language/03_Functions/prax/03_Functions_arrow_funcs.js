let ex = `const power = (base, exponent) => {
    let result = 1;
    for (let count = 0; count < exponent; count++) {
      result *= base;
    }
    return result;
  };`;

console.log(ex);

const power = (base, exponent) => {
    let result = 1;
    for (let count = 0; count < exponent; count++) {
      result *= base;
    }
    return result;
  };


let ex2 = `
const square1 = (x) => { return x * x; };
const square2 = x => x * x;`;

console.log(ex2);

let ex3 = `
const horn = () => {
  console.log("Toot");
};`;

