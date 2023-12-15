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

x = `
console.log(String(6).padStart(3, "0"));
// → 006
`;

console.log(x);

console.log('console.log(String(6).padStart(3, "0"));',String(6).padStart(3, "0"));
// → 006

x = `
let sentence = "Secretarybirds specialize in stomping";
let words = sentence.split(" ");
console.log(words);
// → ["Secretarybirds", "specialize", "in", "stomping"]
console.log(words.join(". "));
// → Secretarybirds. specialize. in. stomping
`;

console.log(x);

let sentence = "Secretarybirds specialize in stomping";
let words = sentence.split(" ");
console.log(words);
// → ["Secretarybirds", "specialize", "in", "stomping"]
console.log(words.join(". "));
// → Secretarybirds. specialize. in. stomping

x = `
console.log("LA".repeat(3));
// → LALALA
`;

console.log(x);

console.log("LA".repeat(3));
// → LALALA

x = `
let string = "abc";
console.log(string.length);
// → 3
console.log(string[1]);
// → b
`;

console.log(x);

let string = "abc";
console.log('console.log(string.length);:',string.length);
// → 3
console.log('console.log(string[1]);:',string[1]);
// → b