/* Most data structures provided in a standard JavaScript environment aren’t very 
well suited for persistent use. Arrays have slice and concat methods, which allow 
us to easily create new arrays without damaging the old one. But Set, for example, 
has no methods for creating a new set with an item added or removed.

Write a new class PGroup, similar to the Group class from Chapter 6, which stores 
a set of values. Like Group, it has add, delete, and has methods. Its add method, 
however, should return a new PGroup instance with the given member added and leave 
the old one unchanged. Similarly, delete should create a new instance without a given 
member.

The class should work for values of any type, not just strings. It does not have 
to be efficient when used with large numbers of values.

The constructor shouldn’t be part of the class’s interface (though you’ll definitely 
want to use it internally). Instead, there is an empty instance, PGroup.empty, that 
can be used as a starting value.

Why do you need only one PGroup.empty value rather than having a function that creates 
a new, empty map every time?
 */


// TEACH KA `Group` class solution from C6:

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
  
    static from(collection) {
      let group = new Group;
      for (let value of collection) {
        group.add(value);
      }
      return group;
    }
  
    [Symbol.iterator]() {
      return new GroupIterator(this.#members);
    }
  }
  
// class GroupIterator {
//     constructor(members) {
//         this.#members = members;
//         this.#position = 0;
//     }

//     next() {
//         if (this.#position >= this.#members.length) {
//         return {done: true};
//         } else {
//         let result = {value: this.#members[this.#position],
//                         done: false};
//         this.#position++;
//         return result;
//         }
//     }
// }

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties


class PGroup {
  // Your code here
}

let a = PGroup.empty.add("a");
let ab = a.add("b");
let b = ab.delete("a");

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false