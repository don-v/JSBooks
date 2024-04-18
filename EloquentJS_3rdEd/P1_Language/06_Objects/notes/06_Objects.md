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

## ABSTRACT DATA TYPES

The main idea in OOP is to use objects, or rather _types_ of objects, as the unit
of program organizztion. Setting up a program as a number of strictly separated
object types provides a ay to think about its structure and thus to enforce
some kind of discipline, preventing everything form becoming entangled.

The way to do this is to think of objects somewhat like one'd think of an electric
mixer or other consumer appliance. The people who design and assmemble a mixer have to
do specilaized work requring material science and understanding of electricity.
They cover all that up in a smooth plastic shell so that the people who onlly want
to mix pancake batter don't have to worry about all that -- they only have to
understand the few knowbs that the mixer can be operated with.

Similarly, the _abstract data type_, or _object_ class, is a subprogram that may
contain arbitrarily complicated code but exposes a limited set of methods and 
properties that people working with it are supposed to use. This allows large
programs to be built up out of oa number of appliance types, limiting the degree to
which these different parts are entangled by requiring them to only interact with 
each other in specific ways.

If a problem is found in one such object class, it can often be repaired even 
completely rewritten without impacting the rest of the program. Even better, 
it may be possible to use object classes in multiple differnt programs, avoiding
the need to recreate thier functionality from scratch. One can think of JS built-in
data structures, such as arrays and strings, as such reusable abstract data types.

Each abstract data type has an _interface_, the collection of operations that 
external code can perform on it. Even basic things like numbers can be thought
of as an abstract data type whose interface allows us to add them, multiply them,
compare them, and so on. IN fact, the fixation on single _objects_ as the 
main unit of organization isn classical OOP is somewhat unfortunate, since useful
pieces of functionality often invovle a group of different object classes working
closely together.


## ENCAPSULATION

The core idea in OOP is to diviDe programs into smaller pieces and make each 
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

The `class` keyword starts a class declaration, which allows us to define a 
consstructor and a set of methods together. Any number of methods may be written
isnide the declaration's braces. This code has the effect of defing a binding
called `Rabbit`, which holds a function that runs the code in `constructor`,
and has a `prototype` property which holds the `speak` method.

This function cannot be called normally. Constructors, in JS, are called by 
putting the keyword `new` in front of them. Doing so creates a fresh object
with the object held in the function's `prototype` property as prototype,
then runs the function with `this` bound to the new object, and finally 
returns the object.

```js
let killerRabbit = new Rabbit("killer");
```

In fact `class` was only introduced in the 2015 editition of JS. Any
function can be used as a constructor, and before 2015, the way to define
a class was to write a reguular function and then manipulate its `prototype`
property:

```js
function ArchaicRabbit(type) {
  this.type = type;
}
ArchaicRabbit.prototype.speak = function(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};
let oldSchoolRabbit = new ArchaicRabbit("old school");
```

For this reason, all non-arrow function start with a start with a 
`prototpye` property holding an empty object. 

By conventions, the names of constructors are capitalized so that they
are easily distinguished from other functions.

It is important to understand the distinction between the way a prototype
is associated with a constructor (throug its `prototype` _property_) and the
way objects _have_ a prototype (which can be found with `Object.getPrototypeOf`).
The actual prototype of a constructor is `Function.prototype` since 
constructors are functions. Its `prototype` _property_ holds the prototype
used for instances created through it!:

```js
console.log(Object.getPrototypeOf(Rabbit) ==
            Function.prototype);
// → true
console.log(Object.getPrototypeOf(killerRabbit) ==
            Rabbit.prototype);
// → true
```

Constructors will typically add some per-instance properties to `this`. It is
also possible to declare properties directly in the class declaration. Unlike methods,
such properties are added to instance objects, not the prototype.

```js
class Particle {
  speed = 0;
  constructor(position) {
    this.position = position;
  }
}
```

Like `function`, `class` can be used both in statements and in expressions. When used
as an expression, it doesn't define a binding but just produces the constructor as a
value. One is allowed to omit the class name in a class expression:

```js
let object = new class { getWord() { return "hello"; } };
console.log(object.getWord());
// → hello
```

## PRIVATE PROPERTIES

It is common for classes to define some properties and methods for internal use, which are 
not part of their interface. These are called _private_ properties, as opposed to _public_
ones, which are part of the object's external interface.

To declare a private method, put a `#` sign in front of its name. Such methods can only
be called form inside the `class` declaration that defines them:

```js
class SecretiveObject {
  #getSecret() {
    return "I ate all the plums";
  }
  interrogate() {
    let shallISayIt = this.#getSecret();
    return "never";
  }
}
```

If oen tries to call `#getSecret` from outside the class, one gets an error. Its 
existence is entirely hidden inside the class declaration.

to use private instance properties, one must delcare them. Regular properties can be
created by just assigning them, but private properties _must_ be declared in the class
declaration to be available at all.

This class implements an applicance for getting random whole number below a given 
maximum number. It only has one public property: `getNumber`:

```js
class RandomSource {
  #max;
  constructor(max) {
    this.#max = max;
  }
  getNumber() {
    return Math.floor(Math.random() * this.#max);
  }
}
```

## OVERRIDING DERIVED PROEPRTIES

When one adds a property to an object, whether it is present in the prototype
or not, the property is added to the object _itself_. If there was already a 
property with the same name in the prototype, this property will no longer 
affect the object, as it is now hidden behind the object's own property.

```js
Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);
// → small
killerRabbit.teeth = "long, sharp, and bloody";
console.log(killerRabbit.teeth);
// → long, sharp, and bloody
console.log((new Rabbit("basic")).teeth);
// → small
console.log(Rabbit.prototype.teeth);
// → small
```

The following diagram sketches the situation after this code has run. The 
`Rabbit` and `Object` prototypes lie behind `killerRabbit` as a kind of backdrop,
where properties that are not found in the object itself can be looked up.

```json
{
  "classes" : ["Object", "Rabbit", "killerRabbit"],
  "killerRabbit": {
    "properties": {
      "Rabbit.teeth (overridden)": "long, sharp",
      "teeth": "small",
      "type": "killer"
    },
    "methods" : {
      "Rabbit.speak.prototype (inherited)": "<function>",
      "Object.prototype.toString (inherited)": "<function>"
    }
  },
  "Rabbit": {
    "prototype": {
      "properties": {
      "teeth": "small"
    },
    "methods": {
      "speak": "<function>"
    }
    }
  },
  "Object" : {
    "create": "<function>",
    "prototype" : {
      "toString": "<function>"
    }
  }
}
```

Overriding properties that exist in a prototype can be a useful thing to do. As
the rabbit teeth example shows, overriding can be used to express exceptional
properties in instances of a more generic class of objects, while letting the
nonexceptional objects take a standard value from their prototype.

Overriding is also used to give the standard function and array prototypes a 
different `toString` method than the basic object prototype:

```js
console.log(Array.prototype.toString ==
            Object.prototype.toString);
// → false
console.log([1, 2].toString());
// → 1,2
```

Calling `toString` on an array gives a result similar to calling `.join(",")` on
it -- it puts commas between the values in the array. Directly calling 
`Object.prototype.toString` with an array produces a different string. That
function doesn't know about arrays, so it simply puts the word _object_ and
the name of the type between square brackets:

```js
console.log(Object.prototype.toString.call([1, 2]));
// → [object Array]
```

## MAPS

We saw the word _map_ used in the previous chapter (C5) for an operation that 
transforms a data structure by applying a function ot its elements. Confusing as 
it is, in programming, the same word is used for a related but rather different
thing.

A _map_ (noun) is a data structure that associates values (the keys) with other 
values. For example, one might want ot map names to ages. It is possible to use
objects for this.

```js
let ages = {
  Boris: 39,
  Liang: 22,
  Júlia: 62
};

console.log(`Júlia is ${ages["Júlia"]}`);
// → Júlia is 62
console.log("Is Jack's age known?", "Jack" in ages);
// → Is Jack's age known? false
console.log("Is toString's age known?", "toString" in ages);
// → Is toString's age known? true
```

Here, the object's property names are the people's names, and the property
values are their ages. But we certainly didn't list any boyd named `toString`
in our map. Yet, because plain objects derive from `Object.prototype`, it
looks like the property is there.

As such, using plain objects as maps is dangerous. There are several possible
ways to avoid this problem. First, it is possible to create objects with no
prototype. If one passes `null` to `Object.create`, the resulting object will
not derive form `Object.prototype` and can safely be used as a map.

```js
console.log("toString" in Object.create(null));
// → false
```

Object property names must be strings. If one needs a map whose keys can't
easily be converted to strings -- such as objects -- one cannot use an object
as one's map.

Fortunately, JavaScript comes with a class called `Map` that is written for
this exact purpose. It stores a mapping and allows any type of keys. 

```js
let ages = new Map();
ages.set("Boris", 39);
ages.set("Liang", 22);
ages.set("Júlia", 62);

console.log(`Júlia is ${ages.get("Júlia")}`);
// → Júlia is 62
console.log("Is Jack's age known?", ages.has("Jack"));
// → Is Jack's age known? false
console.log(ages.has("toString"));
// → false
```

The methods `set`, `get`, and `has` are part of the interface of the `Map`
object. Writing a data structure that can quickly update and search a large set
of values isn't easy, but we don't have to worry about that. Someone else did it for
us, and we can go through this simple interface to use their work.

If one does have a plain object that one needs to treat as a map for some reason,
it is useful to know that `Object.keys` returns only an object's _own_ keys, not
those in the prototype. As an alternative to the `in` operator, one can use the
`Object.hasOwn` function, which ignores the object's prototype:

```js
console.log(Object.hasOwn({x: 1}, "x"));
// → true
console.log(Object.hasOwn({x: 1}, "toString"));
// → false
```

## POLYMORPHISM

When one calls the `String` fuction (which converts a value to a string) on an 
object, it will call the `toString` method on that object to tryy to create a 
meaningful string from it. Teach mentioned that some of the standard prototypes
define their own version of `toString` so they can create a string that contains
more useful information than `"[object Object]"`. One can also do that by oneself:

```js
Rabbit.prototype.toString = function() {
  return `a ${this.type} rabbit`;
};

console.log(String(killerRabbit));
// → a killer rabbit
```

This is a sample instance of a powerful idea. When a piece of code is written
to work with objects that have a certain interface -- in this case, a `toString`
method -- any kind of object that happens to support this interface can be plugged
into the code, and it will be able to work with it.

This technique is called _polymorphism_. Polymorphic code can work with values o f
different shapes, as long as they support the interface it expects.

an example of widely used interface is that of arry-like objects which have a 
`length` property holding a number, and numbered properties for each of their
elements. Both arrays and strings support this interface, as do various other 
objects, some of which we'll see later in the chapters about the browser. Our 
impelementation of `forEach` from C5 works on anything that provides this 
interface. In fact, so does `Array.prototype.forEach`.

```js
Array.prototype.forEach.call({
  length: 2,
  0: "A",
  1: "B"
}, elt => console.log(elt));
// → A
// → B
```

## GETTERS, SETTERS, AND STATICS

Interfaces often contain plain properties, not just methods. For example, `Map
objects have a `size` property that tells one how many keys are stored in them.

It is not necessary for such an object to compute and store such a property
directly in the instance. Even properties that are accessed directly may hide a
method call. Such methods are called _getters_ and are defined by writing `get`
in front of the method name in an object expression or class declaration.

```js
let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  }
};

console.log(varyingSize.size);
// → 73
console.log(varyingSize.size);
// → 49
```

Whenever someone reads form the object's `size` proeperty, the associated
method is called. One can do similar things when a property is written  to
using a _setter.:

```js
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
```

The `Temperature` class allow one to read and write the temperature in either
degrees Celsius or degrees Fahrenheit, but internally it stores only Celcius
and automatically converts to and from Celsius in the `fahrenheit` getter and
setter. 

Sometimes one wants to attach some properties directly to one's constructor
function, rather than to the prototype. Such methods won't have access to a 
class instance but can, for example, be used to provide additional ways to
create instances.

Inside a class declaration, methods or properties that have `static` written
before their name are stored on the constructor. For example, the `Temperature`
class allows one to write `Temperature.fromFahrenheit(100)` to create a 
temperature using degrees Fahrenheit. 

```js
let boil = Temperature.fromFahrenheit(212);
console.log(boil.celsius);
// → 100
```

## SYMBOLS

Teach mentioned in C4 that `for/of` loop can loop over several kinds of data structures.
This is another case of polymorphism -- such loops expect the data structure to expose a
specific interface, which arrays and strings do. And we can also add this interface to our
own objects! But before we can do that, we need to briefly take a look at the symbol type.

It is possible for multiple interfaces to use the same property name for different things.
For example, on array-like objects, `length` refers to the number of elements in the 
collection. But an object interface describing a hiking route could use `length` to provide
the length of the route in meters. It would not be possible for an object to conform to 
both these interfaces.

An object trying to be a route and array-like (maybe to enumerate its waypoints) is 
somewhat far-fetched, and this kind of problem isn't that common in practice. For things
like the interation protocol, though, the language designers needed a type of property
that _really_ doesn't conflict with any other . So in 2015, _symbols_ were added to
the language.

Most properties, including all those we have seen so far, are named with strings. But it
is also possible to use symbols as property names. Symbols are values created with the 
`Symbol`  function. Unlike strings, newly created symbols are unique -- one cannot create
the same symbol twice:

```js
let sym = Symbol("name");
console.log(sym == Symbol("name"));
// → false
Rabbit.prototype[sym] = 55;
console.log(killerRabbit[sym]);
// → 55
```

The string one passes to `Symbol` is included when one converts it to a string and
can make it easier to recognize a symbol when, for example, showing it in the console. 
But it has no meaning beyond that -- multiple symbols may have the same name.

Being both unique and usable as property names makes symbols suitable for defining 
interfaces that can peacefully live alongside other properties, no matter what thier
names are. 

```js
const length = Symbol("length");
Array.prototype[length] = 0;

console.log([1, 2].length);
// → 2
console.log([1, 2][length]);
// → 0
```

It is possible to inlcude symbol properties in object expressions and classes by
using square brackets around the property name. That causes the expression between
the brackets to be evaluated to produce the property name, analogous to the square
bracket property access notation.

```js
let myTrip = {
  length: 2,
  0: "Lankwitz",
  1: "Babelsberg",
  [length]: 21500
};
console.log(myTrip[length], myTrip.length);
// → 21500 2
```

## THE ITERATOR INTERFACE

The object given to a `for/of` loop is expected to be _iterable_. This means it has a
method named with the `Symbol.iterator` symbol (a symbol value defined by the language,
stored as a property of the `Symbol` function).

When called, that method should return an object that provided a second interface, 
_iterator_. This is the actual thing that iterates. It has a `next` method that returns
the next result. That result should be an object with a `value` property that provides
the next vlaue, if there is one, and a `done` property, which should be true when there
are not more results and false otherwise.

Note that the `next`, `value`, and `done` property names are plain strings, not symbols.
Only `Symbol.iterator`, which is likely to be added to a _lot_ different objects, is an
actual symbol.

We can directlyy use this interface ourselves:

```js
let okIterator = "OK"[Symbol.iterator]();
console.log(okIterator.next());
// → {value: "O", done: false}
console.log(okIterator.next());
// → {value: "K", done: false}
console.log(okIterator.next());
// → {value: undefined, done: true}
```

Let's implement an iterable data structure similar to the linked list from the
exercise in C4. We'll write the list as a class this time:

```js
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
```

Note that `this`, in a static method, points at the constructor of the class, not an
instance -- there is no instance around when a static method is called.

Iterating over a list should return all the list's elements from start to end. We'll
write a separate class for the iterator.

```js
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
```

The class tracks the progress of iterating through the list by updating its `list`
property to move to the next list object whenever a value is returned and reports
that it is done when that list is empty (`null`).

Let's set up the `List` class to be iterable. Throughout this book, teach'll 
occasionally use after-the-fact- prototype manipulation to add methods to classes 
so that the individual pieces of code remain small and self-contained. In a 
regular program, where there is no need to split the code into small pieces,
one'd declare these methods directly in the class instead.

```js
List.prototype[Symbol.iterator] = function() {
  return new ListIterator(this);
};
```

We can now loop over a list with `for/of`:

```js
let list = List.fromArray([1, 2, 3]);
for (let element of list) {
  console.log(element);
}
// → 1
// → 2
// → 3
```

The `...` syntax in array notation and function calls similarly works with any
iterable object. for example, on can use `[...value]` to create an array 
containing the elements in an arbitrary iterable object:

```js
console.log([..."PCI"]);
// → ["P", "C", "I"]
```

## INHERITANCE

Imagine we need a list type much like the `List` class we saw before, but because
we will be asking for its length all the time, we don't want it to have to scan 
through its `rest` every time.  Instead, we want to store the length in every
instance for efficinet access.

JS' prototype system makes it possible to create a _new_ class, much like the
old class, but with new definitions for some of its properties. The prototype
for the new class derives from the old prototype but adds a new definition for,
say, the `length` getter.

In OOP terms, this is called _inheritance_. The new class inherits properties and
behavior from the old class.

```js
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
```

The use of the words `extends` indicates that this class shouldn't
be direclty based on the default `Object` prototype but on some other
class. This is called the _superclass_. The derived class is the 
_subclass_.

To initialize a `LengthList` instance, the contstructor calls the 
constructor of its superclass through the `super` keyword. This is
necessary because if this new object is to behave (roughly) like a
`List`, it is good to need the instance properties that lists have.

The constructor then stores the lists's length in a private property.
If we had written `this.length` there, the class's own 'getter' would
have been called, which doens't work yet, since `#length` hasn't been
filled in yet. We can use `super.something` to call methods and
'getters` on the superclass's prototype, which is often useful.

Inheritance allows us to build slightly different data types from 
existing data types with relatively little work. It is a fundamental
part of the OOP tradition, alongisde encapsulation and polymoriphsm. 
But while the latter two are now generallly regarded as wonderful
ideas, inheritance is more controversial.

Whereas encapsulation and polymorphism can be used to _separate_
pieces of code from one another, reducing the tangledness of the
overall progrm, inheritance fundamentally ties classes together, creating
_more_ tangle. When inheriting from a class, one usually has to know more
about how it works than when simply using it. Inheritance can be a 
useful tool to make some types of programs more succinct, but it shouldn't
be the first tool one reaches for, and one probably shouldn't actively
go looking for opportunities to construct class hierarchies (family
trees of classes).

## THE `instanceof` OPERATOR:

It is occasionally useful to know whether an object was derived from a 
specific class. For this, JS provides a binary operator called 
`instanceof`:

```js
console.log(
  new LengthList(1, null) instanceof LengthList);
// → true
console.log(new LengthList(2, null) instanceof List);
// → true
console.log(new List(3, null) instanceof LengthList);
// → false
console.log([1] instanceof Array);
// → true
```

The operator will see through inherited types, so a `LengthList` is an 
instance of `List`. The operator can also be applied to standard constructors
like `Array`. Almost every object is an instance of `Object`.

## SUMMARY

Objects do more than just hold their own properties. They have prototypes, 
which are other objects. They'll act as if they have properties they don't have as
long as their prototype has that property. Simple objects have `Object.prototype`
as their prototype.

Constructors, which are functiosn whose names usually start with a capital letter,
can be used with the `new` operator to create new objects. The new object's 
prototype will be the object found in the `prototype` property of the constructor.
One can make good use of this by putting the properties that all values of a given
type share into their prototype. There's a `class` notation that provides a clear
way to define a constructor and its prototype. 

One can define getters and setters to secretly call methods every time an object's
property is accessed. Static methods are methods sotred in a class's contructor
rather than its prototype.

The `instanceof` operator can, given an object and a constructor, tell determine
if the given object is an instance of the given constructor.

One useful thing to do with objects is to specify an interface for them and tell
everybody that they are supposed to talk to your object only thorugh that interface.
The rest of the detials tha tmake up one's object are now _encapsulated_, hidden
behind the interface. One can use private properties to hide a part of one's 
object from the outside world. 

More than one type may implement the same interface. Code written to use an 
interface automatically knows how to work with any number of different objects
that provide the interface. This is called _polymorphism_.

When implmementing multiple classes that differ in only some details, it can be
helpful to write the new classes as _sublcasses_ of an existing class, 
_inheriting_ part of its behavior. 

## EXERCISES

### A VECTOR TYPE

Write a class `Vec` that represents a vector in two-dimensional space. It takes
`x` and `y` parameters (numbers), that it saves to properties of the same name.

Give the `Vec` prorotype two methods, `plus` and `minus`, that takes another 
vector as a parameter and returns a new vector that has the sum or difference of
the two vectors' (this and the parameter) _x_ and _y_ values.

Add a getter property `length` to the prototype that computes the length of the
vector -- that is, the distance  of the point _(x,y)_ form the origin (0,0).

```js
// Your code here.

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5
```

### MY SOLUTION

```js
class Vec {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    plus(vec) {
        return new Vec(this.x+vec.x,this.y,vec.y);
    }
    minus(vec) {
        return new Vec(this.x-vec.x,this.y-vec.y);
    }
    get length() {
        return Math.sqrt(this.x**2 + this.y**2);
    }
}
```

### DISPLAY HINTS (FROM TEACH):

Look back to the Rabbit class example if you’re unsure how class declarations look.

Adding a getter property to the constructor can be done by putting the word get before
 the method name. To compute the distance from (0, 0) to (x, y), you can use the 
 Pythagorean theorem, which says that the square of the distance we are looking for is 
 equal to the square of the x-coordinate plus the square of the y-coordinate. Thus, 
 √(x2 + y2) is the number you want. Math.sqrt is the way you compute a square root in 
 JavaScript and x ** 2 can be used to square a number.

#### TEACH KA SOLUTION:

```js
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }

  minus(other) {
    return new Vec(this.x - other.x, this.y - other.y);
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5
```

## GROUPS

The standard JS environment provides another data structure called `Set`. Like an instance
of `Map`, a set holds a collection of values. Unlike `Map`, it does not associate other
values with those -- it just tracks which values are part of the set. A value can be
part of a set only once -- adding it again doens't have any effect.

Write a class called `Group` (since `Set` is already taken). Like `Set`, it has `add`,
`delete`, and `has` methods. Its contructor creates an empty group, `add` adds a
value to the group (but only if it isn't already a member), `delete` removes its
argument form the group (if ti was a member) , and `has` returns a Boolean
value indicating whether its argument is a member of the group.

Use the `===` operator, or something equivalent such as `indexOf`, to determine whether
two values are the same.

Give the class a static `from` method that takes an iterable object as argument and 
creates a group that contains all the values produced by iterating over it.

```js
class Group {
  // Your code here.
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false
```

<!-- exercises -- group -->