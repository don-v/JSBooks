const ex = `
function square(x) { return x * x; }
console.log(square(4, true, "hedgehog"));
// → 16
`;

console.log(ex);

function square(x) { return x * x; }
console.log('square(4, true, "hedgehog"):',square(4, true, "hedgehog"));
// → 16