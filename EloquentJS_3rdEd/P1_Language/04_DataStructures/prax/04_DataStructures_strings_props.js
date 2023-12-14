let x = `
let kim = "Kim";
kim.age = 88;
console.log(kim.age);
// → undefined
`;

console.log(x);

let kim = "Kim";
kim.age = 88;
console.log(kim.age);
// → undefined


x = `
console.log("coconuts".slice(4, 7));
// → nut
console.log("coconut".indexOf("u"));
// → 5
`;

console.log(x);

console.log('console.log("coconuts".slice(4, 7));:',"coconuts".slice(4, 7));
// → nut
console.log('console.log("coconut".indexOf("u"));:',"coconut".indexOf("u"));
// → 5


x = `
console.log("one two three".indexOf("ee"));
// → 11
`;

console.log(x);

console.log('console.log("one two three".indexOf("ee"));:',"one two three".indexOf("ee"));
// → 11

x = `
console.log("  okay \n ".trim());
// → okay
`;

console.log(x);

console.log('console.log("  okay \n ".trim());',"  okay \n ".trim());
// → okay