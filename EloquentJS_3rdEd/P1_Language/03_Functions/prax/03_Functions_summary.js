let x = `
// Define f to hold a function value
const f = function(a) {
  console.log(a + 2);
};

// Declare g to be a function
function g(a, b) {
  return a * b * 3.5;
}

// A less verbose function value
let h = a => a % 3;
`;

console.log(x);

// Define f to hold a function value
const f = function(a) {
    console.log(a + 2);
  };
  
  // Declare g to be a function
  function g(a, b) {
    return a * b * 3.5;
  }
  
  // A less verbose function value
  let h = a => a % 3;

