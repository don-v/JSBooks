/* 
Make the `Group` class from the previous exercise iterable. Refer to the
section about the iterator interface earlier in the chapter if one is not clear
on the exact form of the interface anymore.

If one used an array to represent the group's members, one should not just
return the iterator created by calling the `Symbol.iterator` method on the array.
That would work, but it defeats the purpose for this exercise. 

Is is okay if one's iterator behaves strangely when the group is modified during 
iteration.

*/

// Your code here (and the code from the previous exercise)

let x=`class List {
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




class Group {
    #members = [];
  
    add(value) {
      if (!this.has(value)) {
        this.#members.push(value);
      }
    }
  
    delete(value) {
      this.#members = this.#members.filter(v => v !== value);
    }
  
    has(value) {
      return this.#members.includes(value);
    }

    next() {
      if (!this.#members.length) {
        return {done: true};
      }
      let value = this.#members.shift();
      return {value, done: false};
    }
  
    static from(collection) {
      let group = new Group;
      for (let value of collection) {
        group.add(value);
      }
      return group;
    }
  }

//   Group.prototype[Symbol.iterator] = function() {
//     return new Group();
//   }

// class GroupIterator {

//   constructor(group) {
//     this.group = group;
//   }

//   next() {
//       if (!this.#members.length) {
//         return {done: true};
//       }
//       let value = this.#members.shift();
//       return {value, done: false};
//     }
//   }


for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
  }
  // → a
  // → b
  // → c
  