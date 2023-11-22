# C4: DATA STRUCTURES: OBJECTS AND ARRAYS

Numbers, Booleans, and strings are the atoms that data structures are
built from. Many types of information require more than one atom, though.
_Objects_ allow us to group values -- including other objects -- to build
more complex structures.

The programs we built so far have been limited by the fact that they
were operating only on simple data types. This chapter will introduce
basic data structures. By the end of it, one'll know enough to start
writing useful programs.

The chapter will work through a more or less realistic programming
example, introducing concepts as tehy apply to the problem at hand.
The example code will often build on functions and bindings that
were introduced earlier in the text.

## THE WERESQUIRREL

Jacques turns into a squirrel and that causes problems. He wants to figure
out why this happens and so he collects data so he can later study 
the data to figure out why the transformations occur. Data structures
allow him to store this information.

## DATA SETS

To work with a chunk of digital data, we first have to find a way to 
represent it in our machine's memory. Sary, for example, that we want
to represent a collection of the numbers 2,3,5,7, and 11. We could 
get creative with strings -- after all, strings can haven any length, 
so we can put a lot of data in them -- an duse `"2 3 5 7 11"` as our
representation. But this is awkward. One'd have to somehow extrac
the digits and convert them back to numbers to access them.

Fortunately, JS provides a data type specifically for storing sequences
of values. It is called an _array_ and is written as a list of values
between square brackets, separated by commas:

```js
let listOfNumbers = [2, 3, 5, 7, 11];
console.log(listOfNumbers[2]);
// → 5
console.log(listOfNumbers[0]);
// → 2
console.log(listOfNumbers[2 - 1]);
// → 3
```

The notation for getting at the elements inside an array 
also uses square brackets. A pair of square brackets immediately after
an expression, with another expression inside of them, will look up
the element in the left-hand expression that corresponds to the _index
give by the expression in the brackets.

The first index of an array is zero, not one. So the first element is
retrieved with `listOfNumbers[0]`. Zero-based counting has a long
tradition in technology and in certain way smakes a lot of sense, but
it takes some getting used to. Think of the index as the amount of 
items to skip, counting from the start of the array.

## PROPERTIES

We've seen a few suspicious-looking expressions like `myString.length`
(to get the length of a string) and `Math.max` (the maximum function)
in past chapters. These are expressions that access a _property_ of
soe value. In the first case, we access the `length` property of teh
value in `myString`. In the second, we access the property named 
`max` in the `Math` object (which is a collection of 
mathematics-related constatns and functions).

Almost all 'JS' values (objects?) have properties. The exeptions are `null`
and `undefined`. If one tries to access a property on one of these
nonvalues, one gets an error:

```js
null.length;
// → TypeError: null has no properties
```

The two main ways to access properties in JS are with a dot and with 
square brackets. Both `value.x` and `value[x]` access a property on 
`value` -- but not necessarily the same property. The difference is in how
 `x` is interpreted. When using a dot, the word after the dot is the
 liter name of the property. When using square brackets, the expression
 between the brackets is _evaluated_ to get the property name. Whereas
 `value.x` fetches the property of `value` names `"x"`, `value[x]` tries
 to evaluate the expression `x` and uses the results, converted to a 
 string, as teh property name.

 So if one knows that the property one is interested in is called _color_,
 one says `value.color`. If one wants to extract the property named by the
 value held in binding `i`, one says `value[i]`. Property names are strings.
 They can be any string, but the dot notation works only with names that look
 like valid binding names. So if one wants to access a property named 
 _2_ or _John Doe_, one must use square brackets: `value[2]` or 
 `value["John Doe"]`.

 The elements in an array are stored as the array's properties, using
 numbers as property names. Because one can't use the dot notation with
 numbers and usually want to use a binding that holds the index anyways, 
 one has to use the bracket notation to get at them.

 The `length` property of an array tells us how many elements it has. This
 property name is a valid binding name, and we know its name in advance, 
 so to find the length of an array, one typically writes `array.length`
 because that's easier to write than `array["length"]`.

## METHODS

Both string and array values contain, in addition to the `length` property,
a number of properties that hold function values:

```js
let doh = "Doh";
console.log(typeof doh.toUpperCase);
// → function
console.log(doh.toUpperCase());
// → DOH
```

Every string has a `toUpperCase` property. When called, it will return a 
copy of the string in which all letters have been converted to uppercase.
There is also `toLowerCase`, going the other way.

Interestingly, even though the call to `toUpperCase` does not pass any 
arguments. the function somehow has access to the string `"Doh"`, the
value whose property was called. How this works is described in C6.

Properties that contain functions are generally called _methods_ of the
value they belong to, as in "`toUpperCase` is a method of a string".

This example demonstrates two methods one can use to manipulate arrays:

```js
let sequence = [1, 2, 3];
sequence.push(4);
sequence.push(5);
console.log(sequence);
// → [1, 2, 3, 4, 5]
console.log(sequence.pop());
// → 5
console.log(sequence);
// → [1, 2, 3, 4]
```

The `push` method adds values to the end of an array, and the `pop`
method does the opposite, removing the last value in the array and
returning it.

These somewhat silly names are the traditional terms for operations 
a _stack_. A stack, in programming, is a data structure that allow
one to push values into it and pop them out again in the opposite
order so that the thing that was added last is removed first. These
are common in programming -- one might remember the function call 
stack from the previous chapter, which is an instance of the
same idea.

## OBJECTS

Back to the 'weresquirrel'. a set of daily log entries can be 
represented as an array. But the entries does not consist of just
a number or a string -- each entry needs to store a list of activities
and a 'Boolean' value that indicates whether Jacques turned into a
squirrel or not. Ideally, we would like to group these together
into a single value and then put those grouped values into an array
of log entries.

Values of the type _object_ are arbitrary collections of properties.
One way to create an object's is by using braces as an expression:

```js
let day1 = {
  squirrel: false,
  events: ["work", "touched tree", "pizza", "running"]
};
console.log(day1.squirrel);
// → false
console.log(day1.wolf);
// → undefined
day1.wolf = false;
console.log(day1.wolf);
// → false
```

<!-- HERE -- objects -->