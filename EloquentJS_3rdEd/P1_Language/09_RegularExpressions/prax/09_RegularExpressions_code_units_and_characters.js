console.log(/🍎{3}/.test("🍎🍎🍎"));
// → false
console.log(/<.>/.test("<🌹>"));
// → false
console.log(/<.>/u.test("<🌹>"));
// → true

console.log(/🍎{3}/u.test("🍎🍎🍎"));
// → true

