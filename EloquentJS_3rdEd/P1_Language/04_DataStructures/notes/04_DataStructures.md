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

Inside the braces, there is a list of properties separated by commas. Each
property has a name followed by a colon and a value. When an object is
written over multiple lines, indenting it like in the example helps with
readability. Properties whose names aren't valid binding names or valid
numbers have to be quoted.

```js
let descriptions = {
  work: "Went to work",
  "touched tree": "Touched a tree"
};
```

This means that braces have _two_ meanings in JS. At the start of a statement, 
they start a block of statements. In any other position, they describe
an object. Fortunately, it is rarely useful to start a statement with an 
object in braces, so the ambiguity between the two is not much of a problem.

Reading a property that doesn't exist will give one the value of `undefined`.

It is possible to assign a value to a property expression with the `=` 
operator. This will replace the property's value if it already existed or
create a new property on the object if it didn't. 

To briefly return to our tentacle model of bindings -- property bindings
are similar. They _grasp_ values, but other bindings and properties might be
holding onto those same values. One may think of objects as octopuses with 
any number of tentacles, each of which has a name tatooed on it.

The `delete` operator cuts off a tentacle from such an octpous. It is a unary
operator that, when applied to an object property, will remove the named
property from the object. This is not a common thing to do, but it is possible.

```js
let anObject = {left: 1, right: 2};
console.log(anObject.left);
// → 1
delete anObject.left;
console.log(anObject.left);
// → undefined
console.log("left" in anObject);
// → false
console.log("right" in anObject);
// → true
```

The binary `in` operator, when applied to a string and an object, tells
one whether the object has a property with that name. The difference between
setting a property to `undefined` and actually deleting it is that, in the
first case, the object still _has_ the property (it just that its value is 
`undefined`), whereas, in the second case, the property is no longer present
and `in` will return `false`.

To find out what properties an object has, one can use the `Object.keys`
function. One give it an object, and it returns an array of strings --
the object property names.

```js
console.log(Object.keys({x: 0, y: 0, z: 2}));
// → ["x", "y", "z"]
```

There's an `Object.assign` function that copies all properties from one object
into another:

```js
let objectA = {a: 1, b: 2};
Object.assign(objectA, {b: 3, c: 4});
console.log(objectA);
// → {a: 1, b: 3, c: 4}
```

Arrays, then, are just a kind of object specialized for storing sequences of
things. If one evaluates `typeof []`, it produces `"object"`. One can see them 
as long, flat octopuses with all their tentacles in a neat row, labeled with
numbers.

We will represent the journal that Jacques keeps as an array of objects.

```js
let journal = [
  {events: ["work", "touched tree", "pizza",
            "running", "television"],
   squirrel: false},
  {events: ["work", "ice cream", "cauliflower",
            "lasagna", "touched tree", "brushed teeth"],
   squirrel: false},
  {events: ["weekend", "cycling", "break", "peanuts",
            "beer"],
   squirrel: true},
  /* and so on... */
];
```

## MUTABILITY

We will get to actual programming _real_ soon now. First there's one more piece of
theory to understand.

We saw that object values can be modified. The types of values discussed in earlier
chapters, such as numbers, strings, and Booleans, are all _immutable_--it is impossible
to change values of those types. One can combine them an dderive new values from them, 
but when one takes a specific string value, taht value will always remain the same. 
The text inside it cannot be changed. If one has a string `"cat"`, it is not possible
for other code to change a character in one's string to make it spell `"rat"`. 

Objects work differently. One _can_ change their properties, causing a single
object value to have different content at different times.

When we have to numbers, 120 and 120, we can consider them precisely the same
number, whether or not they refer to the same physical bits. With objects, there is
a difference between having two references to the same object and having two different
object that contain the same properties. Consider the following code:

```js
let object1 = {value: 10};
let object2 = object1;
let object3 = {value: 10};

console.log(object1 == object2);
// → true
console.log(object1 == object3);
// → false

object1.value = 15;
console.log(object2.value);
// → 15
console.log(object3.value);
// → 10
```

The `object1` and `object2` bindings grasp the _same_ object, which is
why changing `object1` also changes the value of `object2`. They are said
to have the same _identity_. The binding of `object3` points to a different
object, which initially contains the same properties as `object1`, but lives
a separate life.

Bindings can also be changeable or constant, but this is separate from the
way their values behave. Even though the number values don't change, one can
use a `let` binding to keep track of a changing number by changing the value
the bindings points at. Similarly, though a `const` binding to an object can
itself not be changed and will continue to point at the same object, the 
_contents_ of that object might change:

```js
const score = {visitors: 0, home: 0};
// This is okay
score.visitors = 1;
// This isn't allowed
score = {visitors: 1, home: 1};
```

When one compares objects with JS' `==` operatoer, it compares by identity: 
it will produce `true` only if both objects are precisely the same value.
Comparing different objects will return `false`, even if they have identical
properties. There is no "deep" comparison operation built-in to JS, which
compares objects by contents, but it is possible to write a custom function
to accomplish that (which is one of the exercises at the end of this chapter).

## THE LYCANTHROPE'S LOG

So, Jacques starts up his JS interpreter and sets up the environment he needs
to keep his journal.:

```js
let journal = [];

function addEntry(events, squirrel) {
  journal.push({events, squirrel});
}
```

Note that the object  added to the journal looks a little odd. Instead of declaring
properties like `events: events`, it just gives a property name. This is shorthand
that means the same thing -- if a property name in brace notation isn't followed by 
a value, its value is taken from the binding with the same name.

So then, every evening at 10 pm -- or sometimes the following morning, after climbing
down from the top shelf of his bookcase -- Jacques records the day:

```js
addEntry(["work", "touched tree", "pizza", "running",
          "television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna",
          "touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts",
          "beer"], true);
```

Once hea had enough data points, he intends to use statistics to find out which
of these events may be related to the squirrelifications.

_Correlation_ is a measure of dependence between statistical variables. A 
statistical variable is not quite the same as a programming variable. In statistics
one typically have a set of _measurements_, and each variable is measured for every
measurement. Correlation between variables is usually expressed as a value 
that ranges from `-1` to `1`. Zero correlation means the variables are not related.
A correlation of one indicates that the two are perfectly related -- if one knows one, 
one knows the other. Negative one al someans that the variables are perfectly 
correlated, but that they are opposites -- when one is true, the other
is false. 

To compute the measure of correlation between two Boolean variables, we can
use the _phi coefficient_ ($\phi$). This is a formula whose input is a frequency
table containing containing the number of time sthe different combinations of the
variables were observed. The output of the formula is a number between -1 and 1 
that describes the correlation.

We could take the event of eating pizza and put that in a frequency table 
as follows, where each number indicates the amount of time sthat combination
occurred in our measurements:

![Pizza Frequency Table](../../../to_ignore/04_DataStructures/Pizza_frequency.png)

If we call that table n, we can compute $\phi$ using the following formula:

![Phi Correlation Formula](../../../to_ignore/04_DataStructures/phi_correlation_formula.png)

The notation $n_{01}$ indicates the number of measurements where the first variable
(squirrelness) is false (`0`) and the second variable (`pizza`) is true (`1`). In
the pizza table, $n_{01}$ is `9`.

The value $n_{1.}$ refers to the sum of all measurements where the first variable is
true, which is `5` in the example table. Likewise, $n_{.0}$ refers to the sum of the 
measurements where the second variable is `false`.

So for the pizza table, the part above the division line (the dividend) would be
$1 X 76 - 4 x 9 = 40$, and the part below it (the divisor) would be the square root
of $5 x 85 x 10 x 80$, or $\sqrt{340000}$. This coes out to $\phi \approx 0.069$, which
is tiny. Eating pizza does not appear to have influence on the transformations.

## COMPUTING CORRELATION

We can represent a two-by-two table in JS with a four-element array: `[76, 9, 4, 1]`.
We could als ouse other representations, such as an array containing two two-element
arrays: `[[76, 9], [4, 1]]` or an object with property names like `"11"` and 
`"01"`, but the flat array is simple and makes the expressions that access the table
pleasantly short. We'll interpret the indices to the array as two-bit binary numbers,
where the leftmost (most significant) digit refers to the squirrel variable and the 
rightmost (least significant) digit refers to the event variable. For example, the 
binary number `10` refers to the case where Jacques did turn into a squirrel, but 
the event (say, "pizza") didn't occur. This happened four times. and since binary 
`10` is 2 in decimal notaiton, we will store this number at index 2 of the array.

This is the function that computes the $\phi$ coefficient from such an array:

```js
function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}

console.log(phi([76, 9, 4, 1]));
// → 0.068599434
```

This is a a direct translation of the $\phi$ formula into JS. `Math.sqrt`
is the square root function, as provided by the `Math` object in a standard
JS environment. We ahve to add two fields form the table to get fields like
$n_{1.}$ since the sums of rows or columsn are not directly stored in our
data structure. 

Jacques kept his journal for three months. The resulting data set is available
in the 'coding sandbox' for this chapter, where it is stored in the `JOURNAL`
binding and in a downloadable [file](../../../to_ignore/04_DataStructures/journal.js)

To extract a two-by-two table for a specific event from the journal, we must
loop over all the entries and tally how many times the event occurs in relation 
to squirrel transformations:

```js
function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i], index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}

console.log(tableFor("pizza", JOURNAL));
// → [76, 9, 4, 1]
```

Arrays have an `includes` method that checks whether a given value exists in
the array. The function  uses that to determine whether the event name it is
interested in is part of the event list for a given day.

The body of the loop in `tableFor` figures out which box in the table each
journal entry falls into by checking whether the entry contains the specific
event it's interested in and whether the even happens alongside a squirrel
incident. The loop then adds one to the correct box in the table.

We now have the tools we need to compute the individual correlations. The only
step remaining is to find a correlation for every type of even that was recorded
and see whether anything stands out.

## ARRAY LOOPS

In the `tableFor` function, there's a loop like this:

```js
for (let i = 0; i < JOURNAL.length; i++) {
  let entry = JOURNAL[i];
  // Do something with entry
}
```

This kind of loop is common in classical JS -- going over arrays one element
at a time is something that comes up a lot, and to do that one'd run a counter
over the length of the array and pick out each element in turn.

There is a simpler way to write such loops in modern JS.

```js
for (let entry of JOURNAL) {
  console.log(`${entry.events.length} events.`);
}
```

When a `for` loop looks like this, with the word `of` after a variable definition,
it will loop over the elements of the value given after `of`. This works not only 
for arrays but also for strings and some other data structures. We'll discuss _how_
it works in C6.

## THE FINAL ANALYSIS

We need to compute a correlation for every type of event that occurs in the data set. 
To do that, we first need to _find_ every type of event:

```js
function journalEvents(journal) {
  let events = [];
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event);
      }
    }
  }
  return events;
}

console.log(journalEvents(JOURNAL));
// → ["carrot", "exercise", "weekend", "bread", …]
```

By going over all the events and adding those that aren't already in there to the
`events` array, the function collects every type of event.

Using that, we can see all the correlations.

```js
for (let event of journalEvents(JOURNAL)) {
  console.log(event + ":", phi(tableFor(event, JOURNAL)));
}
// → carrot:   0.0140970969
// → exercise: 0.0685994341
// → weekend:  0.1371988681
// → bread:   -0.0757554019
// → pudding: -0.0648203724
// and so on...
```

Most correlations seem to lie close to zero. Eating carrots, bread, or
pudding apparently does not trigger squirrel-lycantrhopy. It _does_ seem
to occur somewhat more often on the weekends. Let's filter the results to
show only correlations greater than 0.1 or less than -0.1:

```js
for (let event of journalEvents(JOURNAL)) {
  let correlation = phi(tableFor(event, JOURNAL));
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ":", correlation);
  }
}
// → weekend:        0.1371988681
// → brushed teeth: -0.3805211953
// → candy:          0.1296407447
// → work:          -0.1371988681
// → spaghetti:      0.2425356250
// → reading:        0.1106828054
// → peanuts:        0.5902679812
```

Aha! There are two factors with a correlation that's clearly stronger than
the others. Eating peanuts has a strong positive effect on the chance of 
turning into a squirrel, whereas brushing his teeth has a significant negative
effect. 

Interesting let's try something:

```js
for (let entry of JOURNAL) {
  if (entry.events.includes("peanuts") &&
     !entry.events.includes("brushed teeth")) {
    entry.events.push("peanut teeth");
  }
}
console.log(phi(tableFor("peanut teeth", JOURNAL)));
// → 1
```

That's a strong result. The phenomenon occurs precisely when Jacques
eats peanuts and fails to brush his teeth. If only he weren't such a 
slob about dental hygiene, he'd ahve never even noticed his affliction.

Knowing this, Jacques stops eating peanuts altogether and finds that
his transformation don't come back.

For a few years, things go well for Jacques. Bat at some point, he loses
his job. Because he lives in a nasty country where having no job means
having no medical services, he is forced to take employment with a circus
where he performs _The Incredibl Squirrelman_, stuffing his mouth peanut
butter before every show.

One day, fed up with his pitiful existence, Jacques fails to change into 
his human form, hops through a crack in the circus tend, and vanishes into
the forest. He is never seen again. 

## FURTHER ARRAYOLOGY

Before finishing this chapter, teach wants to introduce us to a few more
object-related concepts. Teach starts by introducing some generally useful
array methods.

Previously, we used `push` and `pop`, which are `array` methods that remove 
elements at the end of the array, earlier in the chapter.  The corresponding
methods for adding and removing things at the start of an array are called
`unshift` and `shift`:

```js
let todoList = [];
function remember(task) {
  todoList.push(task);
}
function getTask() {
  return todoList.shift();
}
function rememberUrgently(task) {
  todoList.unshift(task);
}
```

That program manages a queue of tasks. One adds tasks to the end of the
queue by calling `remember("groceries")`, and when one is ready to do something,
one calls `getTask` to get (and remove) the front item from the queue. The
`rmemeberUrgently` function also adds a task but adds it ot the front instead
of the back of the queue.

To search for a specific value, arrays provides an `indexOf` method. The method
searches through the array from the start to the end and returns the index at
which the requested value was found or `-1` if it wasn't found. To search from
the end instead of teh start, there's a similar method called `lastIndexOf`:

```js
console.log([1, 2, 3, 2, 1].indexOf(2));
// → 1
console.log([1, 2, 3, 2, 1].lastIndexOf(2));
// → 3
```

Both `indexOf` and `lastIndexOf` take an optional second argument that indicates
where to start searching.

Anohter fundamental array method is `slice`, which takes `start` and `end` indices
and returns an array that has only the elements between them. The `start` index 
is inclusive, the `end` index exclusive:

```js
console.log([0, 1, 2, 3, 4].slice(2, 4));
// → [2, 3]
console.log([0, 1, 2, 3, 4].slice(2));
// → [2, 3, 4]
```

When the `end` index is not given, `slice` will take all of the elements after the
`start` index. One can also omit the `start` index to copy the entire array.

The `concat` method can be used to glue arrays together to create a new array, 
siilar to what the `+` operator does for `string` objects.

The following example shows both `concat` and `slice` in action. It takes an 
array and an index, and it returns a new array that is a copy of the original
array with the element at the given index removed.

```js
function remove(array, index) {
  return array.slice(0, index)
    .concat(array.slice(index + 1));
}
console.log(remove(["a", "b", "c", "d", "e"], 2));
// → ["a", "b", "d", "e"]
```

If one passes `concat` an argument that is not an array, that value will 
be added to the new arrray as if it were a one-element array.

## STRINGS AND THEIR PROPERTIES

One can read properties like `length` and `toUpperCase` form string values. 
But if one tries to add a new property, it doesn't stick:

```js
let kim = "Kim";
kim.age = 88;
console.log(kim.age);
// → undefined
```

Values of type `string`, `number`, and `Boolean` are not objects, and
though the language doesn't complain if one tries to set new properties
on them, it doesn't actually store these properteis. As mentioned earlier,
such values are immutable, and cannot be changed.

But these types _do_ have built-in properties. Eveyry string value has a 
number of methods. some very useful ones are `slice` and `indexOf`, which 
resemeble the array methods of the same name:

```js
console.log("coconuts".slice(4, 7));
// → nut
console.log("coconut".indexOf("u"));
// → 5
```

One difference is that a `string`'s `indexOf` can search for a string 
containing more than one character, whereas the corresponding array method
looks only for a single element.

```js
console.log("one two three".indexOf("ee"));
// → 11
```

The `trim` method removes whitespace (spaces, newlines, tabs, and similar
characters) from the start and end of a string:

```js
console.log("  okay \n ".trim());
// → okay
```

The `zeroPad` function from the previous chapter also exists as a method. It
is called `padStart` and takes the desried length and padding character as 
arguments.

```js
console.log(String(6).padStart(3, "0"));
// → 006
```

One can split a string on every occurrence of another string with `split`
and join it again with `join`.

```js
let sentence = "Secretarybirds specialize in stomping";
let words = sentence.split(" ");
console.log(words);
// → ["Secretarybirds", "specialize", "in", "stomping"]
console.log(words.join(". "));
// → Secretarybirds. specialize. in. stomping
```

A string can be repeated with the `repeat` method, which creates a new
string containing multiple copies of the original string, glued together.

```js
console.log("LA".repeat(3));
// → LALALA
```

We have already seen the string type's `length` property. Accessing the
indivdiual characters in a string looks like accessing array alements (with
a caveat that we'll discuss in C5):

```js
let string = "abc";
console.log(string.length);
// → 3
console.log(string[1]);
// → b
```

## REST PARAMETERS

It can be useful for a function to accept any number of arguments. For 
example, `Math.max` computes the maximum of _all_ the arguments is given.

To write such a funciton, one puts three dots before the function's last
parameter, like this:

```js
function max(...numbers) {
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result) result = number;
  }
  return result;
}
console.log(max(4, 1, 9, -2));
// → 9
```

When such a function is called, the _rest parameter_ is bound to an array
containing all further arguments. If there are other parameters before it,
their values aren't part of that array. When, as in `max`, it is the only
parameter, it will hold all arguments.

One can use a similar three-dot notation to call a function with an array
of arguments. 

```js
let numbers = [5, 1, 7];
console.log(max(...numbers));
// → 7
```

This "spreads" out the array into the function call, passing its elements
as separate arguments. It is possible to include an array like that along
with other arguments, as in `max(9, ...numbers, 2)`

Square bracket array notation similarly allows the triple-dot operator to 
spread another array in the new array:

```js
let words = ["never", "fully"];
console.log(["will", ...words, "understand"]);
// → ["will", "never", "fully", "understand"]
```

## THE MATH OBJECT

As we've seen, `Math` is a grab bag of number-related utility function, such
as `Math.max` (maximum), `Math.min` (minimum), and `Math.sqrt` (square root).

The `Math` object is used as a container to group a bunch of related functionality.
There is only one `Math` object, and it is almost never useful as a value. Rather,
it provides a _namespace_ so that all these functions and values do not have to be
global bindings.

Having too many global bindings "pollutes" the namespace. The more names
have been taken, the more likely one ...

<!-- HERE -- the math object -->