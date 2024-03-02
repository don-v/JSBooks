# C6: THE SECRET LIFE OF OBJECTS

"An abstract data type is realized by writing a special kind of program
[...] which defines the type in terms of the operations which can be
performed on it."

--Barbar Liskov, _Programming with Abstract Data Types

C4 introduced JS objects. In programming culture, one has a think called _OOP_, a 
set of techniques that use objects (and related concepts) as the central 
principle of program organization.

Though no one really agrees on its precise definition, OOP has shaped the design
of many programming languages, including JS. This chapter will describe the
way these ideas can be applied in JS.

## ENCAPSULATION

The core idea in OOP is to divie programs into smaller pieces and make each 
piece responsible for managing its own state.

This way, some knowledge about the way a piece of the program works can be
kept _local_ to that piece. Someone wokring on the rest of the program does
not have to remember or even be aware of that knowledge. Whenever these local
details change, only the code directly around it needs to be updated.

Different pieces of such a program interact with each other through interfaces,
limited sets of functions or bindings that provide useful functionality at 
a more abstrac level, hiding thier precise implementaiton.

Such program pieces are modeled using objects. Their interface consists of a 
specific set of methods and properties. Properties that are part of the 
interface are called _public_. The others, which outside code should not be
touching are called _private_.

Many languages provide a way to distinguish between public and private properties
and prevent outside code from accessing the private ones altogether. JS, 
once again taking the minimalist approach, does not -- not yet at least. There
is work underway to add this to the language.

Even though the language doesn't have this distinction built in, JS
programmers _are_ successfully using this idea. Typically, the available
interface is described in documentation or comments. It is also common to put
undescore `_` at the start of property names to indicate that those properties
are private.

Separating interface from implementation is a great idea. It is usually called
_encapsulation_.

## METHODS

Methods are nothing more than properties that hold function values. This is
a simple method:

```js
let rabbit = {};
rabbit.speak = function(line) {
  console.log(`The rabbit says '${line}'`);
};

rabbit.speak("I'm alive.");
// → The rabbit says 'I'm alive.'
```

Usually a method needs to do something with the object when called on. When
a function is called as a method-- looked up as a property and immediately
called, as in `object.method()`-- the binding called `this` in its body
automatically points at the object that it was called on.:

```js
function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}
let whiteRabbit = {type: "white", speak};
let hungryRabbit = {type: "hungry", speak};

whiteRabbit.speak("Oh my ears and whiskers, " +
                  "how late it's getting!");
// → The white rabbit says 'Oh my ears and whiskers, how
//   late it's getting!'
hungryRabbit.speak("I could use a carrot right now.");
// → The hungry rabbit says 'I could use a carrot right now.'
```

One can think of `this` ans an extra parameter that is passed in a
different way. If one wants to pass it explicitly, one can use a 
function's `call` method, which takes the `this` value as its first
argument and treats further arguments as normal parameters:

```js
speak.call(hungryRabbit, "Burp!");
// → The hungry rabbit says 'Burp!'
```

Since each function has its own `this` binding, whose value depends on the
way it is called, one cannot refer to the `this` of the wrapping scope in a 
regular function defines with the function keyword.

Arrow functions are different -- they do not bind their own `this` but
can see the `this` binding of the scope around them. Thus, one can do something
like the following code, which references `this` from inside a local function:

```js
function normalize() {
  console.log(this.coords.map(n => n / this.length));
}
normalize.call({coords: [0, 2, 3], length: 5});
// → [0, 0.4, 0.6]
```

If I had written the argument to `map` using the `function` keyword, the code
wouldn't work. 

## PROTOTYPES

Watch closely.

```js
let empty = {};
console.log(empty.toString);
// → function toString(){…}
console.log(empty.toString());
// → [object Object]
```

Teach pulled a property out of an empty object. Magic!

Well, not really. Teach simply has been withholding informaiton about the way
JS objects work. IN adition to their set of properties, most objects also have
a _prototype_. A prototype is another object that is used as a fallback source
of properties. When an object gets a request for a property that it does not
have, its prototpye will be searched for the property, then the prototype's
prototype, and so on.

So who is the prototype of that empty object? It is the great ancestral 
prototype, the entity behind almost all object, `Object.prototype`.:

```js
console.log(Object.getPrototypeOf({}) ==
            Object.prototype);
// → true
console.log(Object.getPrototypeOf(Object.prototype));
// → null
```

As one might guess, `Object.getPrototypeOf` returns the prototype of an object.

The prototpye relations of JS objects form a tree-shaped structure, and at the
root of this structure sits `Object.prototype`. It provides a few methods that 
shown up in all objects, such as `toString`, which converts an object to a 
string representation.

Many objects don't direclty have `Object.prototype` as their prototype but 
instead have another object that provides a different set of default 
properties. Functions derive from `Function.prototype`, and arrays derive
from `Array.prototype`:

```js
console.log(Object.getPrototypeOf(Math.max) ==
            Function.prototype);
// → true
console.log(Object.getPrototypeOf([]) ==
            Array.prototype);
// → true
```

Such a prototype object will itself have a prototype, often `Object.prototype`, 
so that it still indirectly provides methods like `toString`

One can use `Object.create` to an object with a specific prototype:

```js
let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
};
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";
killerRabbit.speak("SKREEEE!");
// → The killer rabbit says 'SKREEEE!'
```

A property like `speak(line)` in an object expression is a shorthand way
of defining a method. It creates a property called `speak` and gives it
a function as its value.

The "proto" rabbit acts as a container for the properties that are shared by
all rabbits. An individual rabbit object, like the killer rabbit, contains 
properties that apply only to itself -- in this case its type -- and derives
properties form its prototype.

## CLASSES

JS' prototype system can be interpreted as a somewhat free-form take on 
abstract data types or classes. A class defines the shape of a type of object --
what methods and properties it has. Such an object is called an _instance_
of the class. 

Prototypes are useful for defining properties for which all instances of a 
class share the same value. Properties that differ per instance, such as our 
rabbits' `type` propertyy, need to be stored directly in the objects 
themselves.

So to create an instance of a given class, one has to make an object that
derives from the proper prototype, but one can _also_ has to make sure it,
itself, has the properties that instances of this class are supposed to have.
This is what a _constructor_ function does:

```js
function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}
```

JS' class notation makes it easier to defin this type of function, along with
a prototpye object.

```js
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}
```

The `class` keyword ...

<!-- HERE -- CLASSES! -->