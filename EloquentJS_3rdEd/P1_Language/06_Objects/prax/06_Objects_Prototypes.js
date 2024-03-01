let x = `
let empty = {};
console.log(empty.toString);
// → function toString(){…}
console.log(empty.toString());
// → [object Object]
`;

console.log(x);

let empty = {};
console.log(empty.toString);
// → function toString(){…}
console.log(empty.toString());
// → [object Object]

x = `console.log(Object.getPrototypeOf({}) ==
Object.prototype);
// → true
console.log(Object.getPrototypeOf(Object.prototype));
// → null`;

console.log(x);

console.log(Object.getPrototypeOf({}) ==
            Object.prototype);
// → true
console.log(Object.getPrototypeOf(Object.prototype));
// → null

x = `console.log(Object.getPrototypeOf(Math.max) ==
Function.prototype);
// → true
console.log(Object.getPrototypeOf([]) ==
Array.prototype);
// → true`;

console.log(x);

console.log(Object.getPrototypeOf(Math.max) ==
            Function.prototype);
// → true
console.log(Object.getPrototypeOf([]) ==
            Array.prototype);
// → true

x = `let protoRabbit = {
    speak(line) {
      console.log(<backtick-open>The <dollar-sign>{this.type} rabbit says '<dollar-sign>{line}'<backtick-close>);
    }
  };
  let killerRabbit = Object.create(protoRabbit);
  killerRabbit.type = "killer";
  killerRabbit.speak("SKREEEE!");
  // → The killer rabbit says 'SKREEEE!'`;

console.log(x);

let protoRabbit = {
    speak(line) {
      console.log(`The ${this.type} rabbit says '${line}'`);
    }
  };
  let killerRabbit = Object.create(protoRabbit);
  killerRabbit.type = "killer";
  killerRabbit.speak("SKREEEE!");
  // → The killer rabbit says 'SKREEEE!'