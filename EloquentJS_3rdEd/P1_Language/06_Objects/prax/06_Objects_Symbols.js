class Rabbit {
    constructor(type) {
      this.type = type;
    }
    speak(line) {
      console.log(`The ${this.type} rabbit says '${line}'`);
    }
  }

let killerRabbit = new Rabbit("killer");

let x = `let sym = Symbol("name");
console.log(sym == Symbol("name"));
// → false
Rabbit.prototype[sym] = 55;
console.log(killerRabbit[sym]);
// → 55`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

let sym = Symbol("name");
console.log(sym == Symbol("name"));
// → false
Rabbit.prototype[sym] = 55;
console.log(killerRabbit[sym]);
// → 55

x=`const length = Symbol("length");
Array.prototype[length] = 0;

console.log([1, 2].length);
// → 2
console.log([1, 2][length]);
// → 0`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

const length = Symbol("length");
Array.prototype[length] = 0;

console.log([1, 2].length);
// → 2
console.log([1, 2][length]);
// → 0

x=`let myTrip = {
    length: 2,
    0: "Lankwitz",
    1: "Babelsberg",
    [length]: 21500
  };
  console.log(myTrip[length], myTrip.length);
  // → 21500 2
  `;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

let myTrip = {
length: 2,
0: "Lankwitz",
1: "Babelsberg",
[length]: 21500
};
console.log(myTrip[length], myTrip.length);
// → 21500 2
  