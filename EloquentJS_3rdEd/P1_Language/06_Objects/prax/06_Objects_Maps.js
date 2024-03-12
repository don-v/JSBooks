let x =`let ages = {
    Boris: 39,
    Liang: 22,
    Júlia: 62
  };
  
  console.log(<backtick>Júlia is <dollar-sign>{ages["Júlia"]}<backtick>);
  // → Júlia is 62
  console.log("Is Jack's age known?", "Jack" in ages);
  // → Is Jack's age known? false
  console.log("Is toString's age known?", "toString" in ages);
  // → Is toString's age known? true`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);
  
  

let ages = {
    Boris: 39,
    Liang: 22,
    Júlia: 62
  };
  
  console.log(`Júlia is ${ages["Júlia"]}`);
  // → Júlia is 62
  console.log("Is Jack's age known?", "Jack" in ages);
  // → Is Jack's age known? false
  console.log("Is toString's age known?", "toString" in ages);
  // → Is toString's age known? true

x=`console.log("toString" in Object.create(null));
// → false`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

console.log("toString" in Object.create(null));
// → false

x=`let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Júlia", 62);

console.log(<backtick>Júlia is <dollar-sign>{ages.get("Júlia")}<backtick>);
// → Júlia is 62
console.log("Is Jack's age known?", ages.has("Jack"));
// → Is Jack's age known? false
console.log(ages.has("toString"));
// → false`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

// let ages = new Map();
ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Júlia", 62);

console.log(`Júlia is ${ages.get("Júlia")}`);
// → Júlia is 62
console.log("Is Jack's age known?", ages.has("Jack"));
// → Is Jack's age known? false
console.log(ages.has("toString"));
// → false

x=`console.log(Object.hasOwn({x: 1}, "x"));
// → true
console.log(Object.hasOwn({x: 1}, "toString"));
// → false`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

console.log(Object.hasOwn({x: 1}, "x"));
// → true
console.log(Object.hasOwn({x: 1}, "toString"));
// → false