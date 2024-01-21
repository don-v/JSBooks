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
have been taken, the more likely one is to accidentally overwrite the value of
some existing binding. For example, it's not unlikely to want to name something
`max` in one's programs. Since JS' built-in `max` function is tucked safely 
inside the `Math` object, we don't have to worry about overwriting it.

Many languages will warn or prevent one from defining a binding with a name that
is already taken. JS does this for bindings one declared with `let` or `const`,
but -- perversely -- not for standard bindings nor for bindings declared with 
`var` or `function`.

Back to the `Math` object, if one needs to do trigonometry, `Math` can help. It
contains `cos` (cosine), `sin` (sine), and `tan` (tangent), as well as their 
inverse functions `acos`, `asin`, and `atan`, respectively. The number $\pi$
(pi) -- or at least the closest approximation that fits in a JS number -- is
available as `Math.PI`. There is an old programming tradition of writing the 
name of constant values in all caps.

```js
function randomPointOnCircle(radius) {
  let angle = Math.random() * 2 * Math.PI;
  return {x: radius * Math.cos(angle),
          y: radius * Math.sin(angle)};
}
console.log(randomPointOnCircle(2));
// → {x: 0.3667, y: 1.966}
```

If sines and cosines are not something one is familiar with, teach will review 
them in C14.

The previous example used `Math.random`. This is a function that returns a new
pseudoranom number between zero (inclusive) and one (exclusive) every time it
is called.

```js
console.log(Math.random());
// → 0.36993729369714856
console.log(Math.random());
// → 0.727367032552138
console.log(Math.random());
// → 0.40180766698904335
```

Though computers are deterministic machines -- they always react the same way if
given the same input -- it is possible to have them produce numbers that appear 
random. To do that, the machine keeps some hidden value, and whenever one asks for a
new random number, it performs comlicated computations on this hidden value to 
create a new value. It stores a new value and returns some number derived form it. 
That way, it can produce ever new, hard-to-predict numbers in a way that _seems_
random.

If one wanted a whole random number, instead of a fractional one, one can use
`Math.floor` (which rounds down to the nearest whole number) on the result
of `Math.random`.

```js
console.log(Math.floor(Math.random() * 10));
// → 2
```

Multiplying the random number by 10 gives us a number greater than or equal to
0 and below 10. Since `Math.floor` rounds down, this expression will produce,
with equal chance, any number from 0 through 9.

There are also the function `Math.ceil` (for "ceiling", which rounds up to a whole
number), `Math.round` (to the nearest whole number), and `Math.abs`, which takes
the absolute value of a number, meaning it negates negative values, but leaves
positive values as they are. 

## DESTRUCTURING

Let's go back to the `phi` function for a moment. 

```js
function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}
```

One of the reasons this function is awkward to read is that there is
a binding pointing to an array, but it would be much more prefereable to
have bindings to individual _elements_ of the array, that is, 
`let n00 = table[0]` and so on. Fortunately, there is a succinct way to
do this in JS:

```js
function phi([n00, n01, n10, n11]) {
  return (n11 * n00 - n10 * n01) /
    Math.sqrt((n10 + n11) * (n00 + n01) *
              (n01 + n11) * (n00 + n10));
}
```

This also works for bindings crated with `let`, `var`, or `const`. If 
one knows the value one is binding in an array, one cna use square brackets
to "look inside" of the value, binding its contents.

A similar trick works for objects, using braces instead of square brackets.

```js
let {name} = {name: "Faraji", age: 23};
console.log(name);
// → Faraji
```

Note that if one tries to destructure `null` or `undefined`, one gets an
error, much as one would if one tried to access a property of those values.

## JSON

Because properties only grasp their value, rather than contain it, objects
and arrays are stored in the computer's memory as sequences of bits holding
the _addresses_ -- the places in memory -- of their contents. So an array 
with another array inside of it consists of (at least) one memory region 
for the inner array, and another for the outer array, containing (among
other things) a binary number that represents the position of the inner
array.

If one wants to save data in a file for later or send it to another computer
over the network, one must convert these tangles of memory addresses to a
description that can be stored or sent. One _could_ send over one's entire
computer memory along with the address of the values one is interested in, 
teach supposes; however, it doesn't seem like the best approach.

What one may do is _serialize_ the data. That means it is converted into
a flat description. A popular serialization format is called 'JSON' 
(pronounced "Jason"), which stands for JS Object Notation. It is widely
used as a data storage and communication format on the web, even in languages
other than JS.

JSON looks similar to JS's way of writing arrays and objects, with a few
restrictions. All property names have to be surrounded by double quotes, and
only simple data expressions are allowed -- no function calls, bindings, or
anything that involves actual computation. Comments are not allowed in JSON.

A journal entry might look like this when represetned as JSON data:

```js
{
  "squirrel": false,
  "events": ["work", "touched tree", "pizza", "running"]
}
```

JS gives us the functions `JSON.stringify` and `JSON.parse` to
convert data to and from this format. The first takes a JS value and
returns a JSON-encoded string. The second takes such a string and converts
it to the value it encodes:

```js
let string = JSON.stringify({squirrel: false,
                             events: ["weekend"]});
console.log(string);
// → {"squirrel":false,"events":["weekend"]}
console.log(JSON.parse(string).events);
// → ["weekend"]
```

## SUMMARY

Objects and arrays (which are a specific kind of object) provide ways to 
group several values into a single value. Conceptually, this allows us to put
a bunch of related things in a bag and run around with the bag, instead of
wrapping our arms around all of the individual things and trying to hold
on to them separately. 

Most values in JS have properties, the exceptiosn being `null` and 
`undefined`. Properties are accessed using `value.prop` or
`value["prop"]`. Objects tend to use names for their properties and
store more or less a fixed set of them. Arrays, on the other hand, usually
contain varifying amounts of conceptually identical values and use numbers
(starting from 0) as the names of their properties.

There _are_ some named properties in arrays, such as `length` and a number
of methods. Methods are functions that live in properties and (usually) act
on the value they are a proeprty of. 

One can iterate over arrays using a special kind of `for` loop -- 
`for (let element of array)`.

## EXERCISES

### THE SUM OF A RANGE

The introduction of this book alluded to the following as a nice way to compute
the sum of a range of numbers:

```js
console.log(sum(range(1, 10)));
```

Write a `range` function that takes two arguments, `start` and `end`, and returns
an array containing all the numbers from `start` up to (and including) `end`.

Next, write a `sum` function that takes an array of numbers and returns the sum of
these numbers. Run the example program and see whether it does indeed return `55`.

As a bonus assignment, one should modify one's `range` function to take an optional
third argument that indicates the `step` value used when building the array. If no
step is given, the elements go up by increments of one, corresponding to the old
behavior. The function call `range(1, 10, 2)` should return `[1, 3, 5, 7, 9]`.
Make sure that it also works with negative step values so that `range(5, 2, -1)`
produces  `[5, 4, 3, 2]`

```js
// Your code here.

console.log(range(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55
```

Here's my solution:

```js
function range1(start, end) {
    let x = [start]
    for (let index = start + 1; index <= end; index++) {
        x.push(index);
    }
    return x;
}


function sum1(arr) {
    total = 0;
    for (let x of arr) {
        total += x;
    }
    return total
}


function range2(start, end, step=1) {
    let x = [start]
    if (step > 0) {
        for (let index = start + step; index <= end; index += step) {
            x.push(index);
        }    
    } else {
        for (let index = start + step; index >= end; index += step) {
            x.push(index);
        }
    }
    return x;
}


console.log('console.log(range1(1, 10));:',range1(1, 10));
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log('console.log(range2(5, 2, -1));:',range2(5, 2, -1));
// → [5, 4, 3, 2]
console.log('console.log(range2(1, 10, 2));:',range2(1, 10, 2));
// → [ 1, 3, 5, 7, 9 ]
console.log('console.log(sum1(range1(1, 10)));:',sum1(range1(1, 10)));
// → 55

/* 
console.log(range1(1, 10));: [
  1, 2, 3, 4,  5,
  6, 7, 8, 9, 10
]
console.log(range2(5, 2, -1));: [ 5, 4, 3, 2 ]
console.log(range2(1, 10, 2));: [ 1, 3, 5, 7, 9 ]
console.log(sum1(range1(1, 10)));: 55
*/
```

### DISPLAYING HINTS PROVIDED BY TEACH

Building up an array is most easily done by first initializing a binding to [] 
(a fresh, empty array) and repeatedly calling its push method to add a value. 
Don’t forget to return the array at the end of the function.

Since the end boundary is inclusive, you’ll need to use the <= operator rather 
than < to check for the end of your loop.

The step parameter can be an optional parameter that defaults (using the = 
operator) to 1.

Having range understand negative step values is probably best done by writing 
two separate loops—one for counting up and one for counting down—because the 
comparison that checks whether the loop is finished needs to be >= rather 
than <= when counting downward.

It might also be worthwhile to use a different default step, namely, -1, when 
the end of the range is smaller than the start. That way, range(5, 2) returns 
something meaningful, rather than getting stuck in an infinite loop. It is possible 
to refer to previous parameters in the default value of a parameter.

### TEACH'S SOLUTION

```JS
function range(start, end, step = start < end ? 1 : -1) {
  let array = [];

  if (step > 0) {
    for (let i = start; i <= end; i += step) array.push(i);
  } else {
    for (let i = start; i >= end; i += step) array.push(i);
  }
  return array;
}

function sum(array) {
  let total = 0;
  for (let value of array) {
    total += value;
  }
  return total;
}

console.log(range(1, 10))
// → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// → [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// → 55
```

## REVERSING AN ARRAY

Arrays have a `reverse` method that changes the array by inverting the order
in which its elements appear. For this exercise, write two functions, `reverseArray`
and `reverseArrayInPlace`. The first, `reverseArray`, takes an array as argument
and produces a _new_ array that has the same elements in the inverse order. The 
second, `reverseArrayInPlace`, does what the `reverse` method does: it _modifies_
the array given as argument by reversing its elements. Neither may use the standard
`reverse` method.

Thinking back to the notes about side effects and pure functions in the previous
chapter, teach encourages one to ponder about which variant does on expect to 
be useful in more situations and which one runs faster.

```js
// Your code here.

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
```

Here is my solution:

```js
function reverseArray(arr) {
    result = []
    while (arr.length > 0) {
        result.push(arr.pop())
    }
    return result
}

function reverseArrayInPlace(arr) {
    z = arr;
    console.log('z before arr was reversed:', z)
    for (let index = arr.length-2; index >= 0; index--) {
        arr.push(arr.splice(index,1).pop())
    }
    console.log('z after arr was reversed:', z)
    console.log('ensuring reversal was done "in place":\nz === arr:', z === arr);
    return arr;
}


console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]


console.log('reverseArrayInPlace([1, 2, 3]):',reverseArrayInPlace([1, 2, 3]));
```

### DISPLAY HINTS BY TEACH 

```js
/* There are two obvious ways to implement reverseArray. The first is to simply go over the input array from front to back and use the unshift method on the new array to insert each element at its start. The second is to loop over the input array backwards and use the push method. Iterating over an array backwards requires a (somewhat awkward) for specification, like (let i = array.length - 1; i >= 0; i--).

Reversing the array in place is harder. You have to be careful not to overwrite elements that you will later need. Using reverseArray or otherwise copying the whole array (array.slice(0) is a good way to copy an array) works but is cheating.

The trick is to swap the first and last elements, then the second and second-to-last, and so on. You can do this by looping over half the length of the array (use Math.floor to round down—you don’t need to touch the middle element in an array with an odd number of elements) and swapping the element at position i with the one at position array.length - 1 - i. You can use a local binding to briefly hold on to one of the elements, overwrite that one with its mirror image, and then put the value from the local binding in the place where the mirror image used to be. */
```

### TEACH'S SOLUTION: 

Here is teach's solution:

```js
function reverseArray(array) {
  let output = [];
  for (let i = array.length - 1; i >= 0; i--) {
    output.push(array[i]);
  }
  return output;
}

function reverseArrayInPlace(array) {
  for (let i = 0; i < Math.floor(array.length / 2); i++) {
    let old = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = old;
  }
  return array;
}

console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]
```

## A LIST

Objects, a generic blobs of values, can be used to build all sorts of data structures. A 
common data structureis the _list_ (not to be confused with array). A list is a nested set 
of objects, with the first object building holding a reference to the second, the second
to the third, and so on.

```js
let list = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null
    }
  }
};
```

The resulting objects form a chian, like this:

![chain_object](./../../../to_ignore/04_DataStructures/chain_object.png)

A nice thing about lists is that they can share parts of their structure. For example, if
teach creates two new values `{value: 0, rest: list}` and `{value: -1, rest: list}` (with
`list` referring to the binding defined earlier), they are both independent lists, but 
they share the structure that makes up their last three elements. The original list is
also still a valid three-element list.

Write a function `arrayToList` that builds up a list structure like the one shown
given `[1, 2, 3]` as argument. also write a `listToArray` function that produces an array
from list. Then add a helper function `prepend`, which takes an element and a list and
creates a new list that adds the element to the front of the input list, and `nth`, 
which takes a list and a number and returns the element at the given position in the 
list (with zero referring to the first element) or `undefined` when there is no such
element. 

If one hasn't already, also write a recursive version of `nth`.

## MY CODE HERE

```js
// Your code here.

function arrayToList(array, ) {
  new_array = array.slice(1);
  return {value: array[0], rest: array[1] ? arrayToList(new_array) : null  }
}

function listToArray(list) {
  array = new Array;
  array.push(list.value);
  return list.rest ? array.concat(listToArray(list.rest)) : array;
}

function prepend(value, list) {
  let rest = list;
  return {value, rest};
}

function nth(list, idx) {
  return listToArray(list).slice(idx,idx+1).pop();
}


console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
```

### DISPLAY HINTS

<!-- Building up a list is easier when done back to front. So arrayToList could iterate over the array backwards (see the previous exercise) and, for each element, add an object to the list. You can use a local binding to hold the part of the list that was built so far and use an assignment like list = {value: X, rest: list} to add an element.

To run over a list (in listToArray and nth), a for loop specification like this can be used:

for (let node = list; node; node = node.rest) {}

Can you see how that works? Every iteration of the loop, node points to the current sublist, and the body can read its value property to get the current element. At the end of an iteration, node moves to the next sublist. When that is null, we have reached the end of the list, and the loop is finished.

The recursive version of nth will, similarly, look at an ever smaller part of the “tail” of the list and at the same time count down the index until it reaches zero, at which point it can return the value property of the node it is looking at. To get the zeroth element of a list, you simply take the value property of its head node. To get element N + 1, you take the Nth element of the list that’s in this list’s rest property. -->

### TEACH'S SOLUTION

```js
function arrayToList(array) {
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
    list = {value: array[i], rest: list};
  }
  return list;
}

function listToArray(list) {
  let array = [];
  for (let node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

function prepend(value, list) {
  return {value, rest: list};
}

function nth(list, n) {
  if (!list) return undefined;
  else if (n == 0) return list.value;
  else return nth(list.rest, n - 1);
}

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20
```

## DEEP COMPARISON

The `==` operator compares objects by identity. But sometimes, one'd prefer to
compare the values of their actual properties.

Write a function `deepEqual` that takes two values and returns true only if they
are the same value or are object with the same properties, where the values of 
the properties are equal when compared with a recursive call to `deepEqual`

To find out whether values should be compared direclty (use the `===` operator
for that) or have thier properties compared, one can use the `typeof` operator.

If it produces `"object"`, for both values, one should do a deep comparison. But
one has to take one silly exception into account: because of a historical accident, 
`typeof null` also produces `"object"`.

The `Object.keys` function will be useful when one needs to go over the properties
of object to compare them.

```js
// Your code here.

let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
```

### MY SOLUTION

### DISPLAY HINTS

### TEACH'S SOLUTION

<!-- 'DEEP COMPARISON EX!+ -->