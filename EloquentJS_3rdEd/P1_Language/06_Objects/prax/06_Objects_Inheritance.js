let x = `class LengthList extends List {
    #length;
  
    constructor(value, rest) {
      super(value, rest);
      this.#length = super.length;
    }
  
    get length() {
      return this.#length;
    }
  }
  
  console.log(LengthList.fromArray([1, 2, 3]).length);
  // → 3`;


console.log('*'.repeat(80).concat('\n'));
console.log(x);
  

  class LengthList extends List {
    #length;
  
    constructor(value, rest) {
      super(value, rest);
      this.#length = super.length;
    }
  
    get length() {
      return this.#length;
    }
  }
  
  console.log(LengthList.fromArray([1, 2, 3]).length);
  // → 3

