let x = `let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// → {value: "O", done: false}
console.log(okIterator.next());
// → {value: "K", done: false}
console.log(okIterator.next());
// → {value: undefined, done: true}`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// → {value: "O", done: false}
console.log(okIterator.next());
// → {value: "K", done: false}
console.log(okIterator.next());
// → {value: undefined, done: true}

x=`class List {
    constructor(value, rest) {
      this.value = value;
      this.rest = rest;
    }
  
    get length() {
      return 1 + (this.rest ? this.rest.length : 0);
    }
  
    static fromArray(array) {
      let result = null;
      for (let i = array.length - 1; i >= 0; i--) {
        result = new this(array[i], result);
      }
      return result;
    }
  }`;

  console.log('*'.repeat(80).concat('\n'));
  console.log(x);

  class List {
    constructor(value, rest) {
      this.value = value;
      this.rest = rest;
    }
  
    get length() {
      return 1 + (this.rest ? this.rest.length : 0);
    }
  
    static fromArray(array) {
      let result = null;
      for (let i = array.length - 1; i >= 0; i--) {
        result = new this(array[i], result);
      }
      return result;
    }
  } 