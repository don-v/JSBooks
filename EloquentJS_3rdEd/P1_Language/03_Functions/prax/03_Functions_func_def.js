let x = `const square = function(x) {
    return x * x;
  };
`;

const square = function(x) {
    return x * x;
  };
  
console.log(x,'\n')

console.log('console.log(square(12));:', square(12));
  

const makeNoise = function() {
  console.log("Pling!");
};


let f2 = `const makeNoise = function() {
  console.log("Pling!");
};
`

console.log('\n', f2,'\n');

console.log('makeNoise():')
makeNoise();


const power = function(base, exponent) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
};

let f3 = `const power = function(base, exponent) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
};
`

console.log(f3, '\n');

console.log('power(2, 10):',power(2, 10), '\n');

/* 
const square = function(x) {
    return x * x;
  };


console.log(square(12));: 144

 const makeNoise = function() {
  console.log("Pling!");
};


makeNoise():
Pling!
const power = function(base, exponent) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
};


power(2, 10): 1024
*/