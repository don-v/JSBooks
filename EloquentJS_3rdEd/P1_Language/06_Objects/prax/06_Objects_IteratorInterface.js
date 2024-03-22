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

  x=`class ListIterator {
    constructor(list) {
      this.list = list;
    }
  
    next() {
      if (this.list == null) {
        return {done: true};
      }
      let value = this.list.value;
      this.list = this.list.rest;
      return {value, done: false};
    }
  }`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);
  
  class ListIterator {
    constructor(list) {
      this.list = list;
    }
  
    next() {
      if (this.list == null) {
        return {done: true};
      }
      let value = this.list.value;
      this.list = this.list.rest;
      return {value, done: false};
    }
  }

x=`List.prototype[Symbol.iterator] = function() {
  return new ListIterator(this);
};`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

List.prototype[Symbol.iterator] = function() {
  return new ListIterator(this);
};

x=`let list = List.fromArray([1, 2, 3]);
for (let element of list) {
  console.log(element);
}
// → 1
// → 2
// → 3`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

let list = List.fromArray([1, 2, 3]);
for (let element of list) {
  console.log(element);
}
// → 1
// → 2
// → 3

x=`console.log([..."PCI"]);
// → ["P", "C", "I"]`;

console.log('*'.repeat(80).concat('\n'));
console.log(x);

console.log([..."PCI"]);
// → ["P", "C", "I"]