let protoRabbit = {
    speak(line) {
      console.log(`The ${this.type} rabbit says '${line}'`);
    }
  };

let x = `function makeRabbit(type) {
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
  }`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

function makeRabbit(type) {
    let rabbit = Object.create(protoRabbit);
    rabbit.type = type;
    return rabbit;
  }

x = `class Rabbit {
    constructor(type) {
      this.type = type;
    }
    speak(line) {
      console.log(<back-tick>The <dollar-sign>{this.type} rabbit says '<dollar-sign>{line}'<back-tick>);
    }
  }`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

class Rabbit {
    constructor(type) {
      this.type = type;
    }
    speak(line) {
      console.log(`The ${this.type} rabbit says '${line}'`);
    }
  }

x = `let killerRabbit = new Rabbit("killer");`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

let killerRabbit = new Rabbit("killer");

x = `function ArchaicRabbit(type) {
  this.type = type;
}
ArchaicRabbit.prototype.speak = function(line) {
  console.log(<back-tick>The <dollar-sign>{this.type} rabbit says '<dollar-sign>{line}'<back-tick>);
};
let oldSchoolRabbit = new ArchaicRabbit("old school");`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

function ArchaicRabbit(type) {
  this.type = type;
}
ArchaicRabbit.prototype.speak = function(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};
let oldSchoolRabbit = new ArchaicRabbit("old school");

x = `console.log(Object.getPrototypeOf(Rabbit) ==
Function.prototype);
// → true
console.log(Object.getPrototypeOf(killerRabbit) ==
Rabbit.prototype);
// → true`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

console.log(Object.getPrototypeOf(Rabbit) ==
            Function.prototype);
// → true
console.log(Object.getPrototypeOf(killerRabbit) ==
            Rabbit.prototype);
// → true

x = `class Particle {
  speed = 0;
  constructor(position) {
    this.position = position;
  }
}`;

console.log('*'.repeat(80).concat('\n'));
console.log(x)

x=`let object = new class { getWord() { return "hello"; } };
console.log(object.getWord());
// → hello`;

let object = new class { getWord() { return "hello"; } };
console.log(object.getWord());
// → hello