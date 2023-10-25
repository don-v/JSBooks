let ex = `
function greet(who) {
    console.log("Hello " + who);
  }
  greet("Harry");
  console.log("Bye");
`;

console.log(ex);

// infinite loop:s

let ex2 = `
function chicken() {
  return egg();
}
function egg() {
  return chicken();
}
console.log(chicken() + " came first.");
// → ??
`

