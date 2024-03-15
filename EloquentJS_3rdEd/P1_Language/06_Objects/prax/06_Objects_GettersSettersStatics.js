let x=`let varyingSize = {
    get size() {
      return Math.floor(Math.random() * 100);
    }
  };
  
  console.log(varyingSize.size);
  // → 73
  console.log(varyingSize.size);
  // → 49`;

  console.log('*'.repeat(80).concat('\n'));
  console.log(x);
  

  let varyingSize = {
    get size() {
      return Math.floor(Math.random() * 100);
    }
  };
  
  console.log(varyingSize.size);
  // → 73
  console.log(varyingSize.size);
  // → 49

x=`class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);
// → 71.6
temp.fahrenheit = 86;
console.log(temp.celsius);
// → 30`;


console.log('*'.repeat(80).concat('\n'));
console.log(x);

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }
  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);
// → 71.6
temp.fahrenheit = 86;
console.log(temp.celsius);
// → 30

x=`let boil = Temperature.fromFahrenheit(212);
console.log(boil.celsius);
// → 100`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);


let boil = Temperature.fromFahrenheit(212);
console.log(boil.celsius);
// → 100