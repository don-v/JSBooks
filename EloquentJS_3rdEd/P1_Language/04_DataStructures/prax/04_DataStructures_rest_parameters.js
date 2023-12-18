let x = `
function max(...numbers) {
    let result = -Infinity;
    for (let number of numbers) {
      if (number > result) result = number;
    }
    return result;
  }
  console.log(max(4, 1, 9, -2));
  // → 9
`;

console.log(x);

function max(...numbers) {
    let result = -Infinity;
    for (let number of numbers) {
      if (number > result) result = number;
    }
    return result;
  }
  console.log('console.log(max(4, 1, 9, -2));:',max(4, 1, 9, -2));
  // → 9


x = `
let numbers = [5, 1, 7];
console.log(max(...numbers));
// → 7
`;

console.log(x);

let numbers = [5, 1, 7];
console.log('console.log(max(...numbers));:',max(...numbers));
// → 7

x = `
let words = ["never", "fully"];
console.log(["will", ...words, "understand"]);
// → ["will", "never", "fully", "understand"]
`;

console.log(x);

let words = ["never", "fully"];
console.log('console.log(["will", ...words, "understand"]);:',["will", ...words, "understand"]);
// → ["will", "never", "fully", "understand"]

