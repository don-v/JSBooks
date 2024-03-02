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

console.log(x);

class Rabbit {
    constructor(type) {
      this.type = type;
    }
    speak(line) {
      console.log(`The ${this.type} rabbit says '${line}'`);
    }
  }