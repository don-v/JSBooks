# C5: HIGHER-ORDER FUNCTIONS

"Tzu-li and Tzu-ssu were boasting about the size of their programs. 'Two-
hundred thousand lines,' said Tzu-li, 'not counting comments!' Tzu-ssu
responded, 'Pssh, mine is almost a _million_ lines already.' Master Yuan-Ma
said, 'My best program has five hundred lines.' Hearing this, Tzu-li and 
Tzu-ssu were enlighetened."

-- Master Yuan-Ma, _The Book of Programming_

"There are two ways to constructing a software design: One way is to make it
so simple that there are obviously no deficiencies, and the other way is to 
make it so complicated that there are not obvious deficiencies."

--C.A.R Hoare, _1980 ACM Turing Award Lecture_

A large program is a costly program, and not just because of the time it takes to 
build. Size almost always invovles complexity, and complexity confuses programmers.
Confused programmers, in turn, introduce mistakes (_bugs_) into programs. A large
program then provides a lot of space for these bugs to hide, making them hard to find.

Let's briefly go back to the final two example programs in the introduction, The
first is self-contained and six lines long.:

```js
let total = 0, count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}
console.log(total);
```

The second relies on two external functions and is one line long.:

```js
console.log(sum(range(1, 10)));
```

Which one is more likely to contain a bug?

If we count the size of definitions of `sum` and `range`, the second program is
also big -- even bigger than the first. But still, teach'd argue that it's more
likely to be correct.

It is more likely to be correct because the solution because the solution is
expressed in a vocabulary that corresponds to the problem being solved. Summing
a range of numbers isn't about loops and counters. It is about ranges and sums.

The definitions of this vocubulary (the functions `sum` and `range`) will still
involve loops, counters, and other indicdental details. But because they are
expressing simpler concepts than the program as a whole, they are easier to
get right.

## ABSTRACTION

In the context of programming, these kinds of vocabularies are usually called
_abstractions_. Abstractions hide details and give us the ability to talk about
problems at a higher (or more abstract) level.

As an analogy, compare these two recipes for pea soup. The first goes like this:

  "Put 1 cup of dried peas per person into a container. Add water until the peas
  are well covered. Leave the peas in water for at least 12 hours. Take the peas
  out of the water and put them in a cooking pan. Add 4 cups of water per person.
  Cover the pan and keep the peas simmering for two hours. Take half an onion per
  person. Cut it into pieces with a knife. Add it to the peas. Take a stalk of
  celery per person. Cut it into pieces with a knife. Add it to the peas. Take a
  carrot per person. Cut it into pieces. With a knife! Add it to the peas. Cook
  for 10 more minutes."

And this second recipe:

  "Per person: 1 cup dried split peas, half a chopped onion, a stalk of celery, and 
  a carrot.

  Soak peas for 12 hours. Simmer for 2 hours in 4 cups of water (per perosn). Chop
  and add vegetables. cook for 10 more minutes."

The second is shorter and easier to interpret. But one does need to undersand a
few more cooking-related words such as _soak_, _simmer_, _chop_, and, teach guesses,
_vegetable_.

When programming, one can't rely on all the words we need to be waiting for us
in the dictionary. Thus, we might fall into the pattern of the first recipe -- 
work out the precise steps the computer has to perform, one by one, blind to 
the higher-level concepts that they express.

It is a useful skill, in programming, to notice when one is working at too low a
level of abstraction.

## ABSTRACTING REPETITION

Plain functions, as we've seen them so far, are a good way to build abstractions. But 
sometimes they fall short.

It is common for a program to do something a given number of times. One can write a `for`
loop for that, like this:

```js
for (let i = 0; i < 10; i++) {
  console.log(i);
}
```

Can we abstract "doing something _N_ times" as a funciton? Well, it's easy to write
a function that calls `console.log` _N_ times.

```js
function repeatLog(n) {
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
}
```

But what if we wnat to do something other than logging the numbers? Since "doing
something" can be represented as a function and functions are just values, we can
pass our action as a function of value.

```js
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

repeat(3, console.log);
// → 0
// → 1
// → 2
```

We don't have to pass a predefined function to `repeat`. Often, it is easier to
create a function value on the spot instead.

```js
let labels = [];
repeat(5, i => {
  labels.push(`Unit ${i + 1}`);
});
console.log(labels);
// → ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5"]
```

This is structured a little like a `for` loop -- it first describes the kind of
loop and then provides a body. However, the body is now written as a function value,
which is wrapped in the parentheses of the call to `repeat`. This is why it has to
be closed with the closing brace _and_ closing parenthesis. In cases like this
example, where the body is a single small expression, one could also omit the
braces and write the loop on a single line. 

## HIGHER-ORDER FUNCTIONS

Functions that operate on other functions, either by taking them as arguments
or by returning them, are called _higher-order functions_ Since we have already
seen that functions are regular values, there is nothing particularly remarkable
about the fact that such functions exist. The term comes form mathematics, 
where the distinction between functions and other values is taken more 
seriously.

Higher-order functions allow us to abstract over _actions_, not just values.
They come in several forms. For example, we can have functions that create new
functions.

```js
function greaterThan(n) {
  return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// → true
```

And, we cna have functions that change other functions:

```js
function noisy(f) {
  return (...args) => {
    console.log("calling with", args);
    let result = f(...args);
    console.log("called with", args, ", returned", result);
    return result;
  };
}
noisy(Math.min)(3, 2, 1);
// → calling with [3, 2, 1]
// → called with [3, 2, 1] , returned 1
```

We can even write functions that provide new types of control flow.

```js
function unless(test, then) {
  if (!test) then();
}

repeat(3, n => {
  unless(n % 2 == 1, () => {
    console.log(n, "is even");
  });
});
// → 0 is even
// → 2 is even
```

There is a built-in array method, `forEach`, that provides something like a 
`for of` loop as a higher-order function.

```js
["A", "B"].forEach(l => console.log(l));
// → A
// → B
```

## SCRIPT DATA SET

One are where higher-order functions shine is data processing. To process data, we'll
need some actual data. This chapter will use a data set about scripts -- writing 
systems such as Latin, Cyrillic, or Arabic.

Recall Unicode from C1, the system that assigns a number to each character in written
language. Most of these characters are associated with a specific script. The standard
contains 140 different scripts -- 81 are still in use today, 59 are historic.

Though teach can fluently read only Latin characters, teach appreciates the fact that
people are writing tests in at least 80 other writing systems, many of which teach
would not even recognize. For example, here's a smaple of Tamil handwriting:

[!tamil script sample](../../../to_ignore/05_HigherOrderFuncs/tamil.png)

The example data set contains some pieces of information about the 140 scripts
defined in Unicode. It is available in the coding sandbox for this chapter as
the `SCRIPTS` binding. The binding contains an array of objecs, each of which
describes a script.

```js
{
  name: "Coptic",
  ranges: [[994, 1008], [11392, 11508], [11513, 11520]],
  direction: "ltr",
  year: -200,
  living: false,
  link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
}
```

The path to the file is located at `https://eloquentjavascript.net/code/scripts.js`

Such an object tells us the name the name of the script, the Unicode ranges assigned to it, the direction
in which it is written, the (approximate) origin time, whether it is stii lin use, and a link to 
more informaiton. The direction may be `"ltr"` for 'left to right', `"rtl"` for 'right to left' (the
way Arabic and Hebrew text are written), or `"ttb"` for top to bottom (as with Mongolian writing).

The `ranges` property contains an array of Unicode character ranges, each of which is a two-element array
containing a lower bound and an upper bound. Any character codes within these ranges are assigned to the
script. The lower bound is inclusive (code 994 is a Coptic character), and the upper bound is non-inclusive
(code 1008 isn't). 

## FILTERING ARRAYS

To find the scripts in the data that are still in use, the following function might be
helpful. It filters out the elements in an array that don't pass a test. 

```js
function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
}

console.log(filter(SCRIPTS, script => script.living));
// → [{name: "Adlam", …}, …]
```

The function uses the argument named `test`, a function value, to fill a "gap" in the
computation -- the process of deciding which elements to collect.

Note how the `filter` function, rather than deleting elements form the existing array, 
builds up a new aray with only the elements that pass the test. This function is _pure_.
It does not modify the array it is given. 

Like `forEach`, `filter` is a standard array method. The example defined the function
only to show what it does internally. From now on, we'll use it like this instead:

```js
console.log(SCRIPTS.filter(s => s.direction == "ttb"));
// → [{name: "Mongolian", …}, …]
```

## TRANSFORMING WITH MAP

Suppose one has an array of objects representing scripts, produced by filtering the
`SCRIPTS` array somehow. But instead, one wants an array of names, which might be 
easier to inspect. 

The `map` method transforms an array by applying a function to all of its elements
and building a new array from the returned values. The new array will have the same
length as teh input array, but its content will have been _mapped_ to a new form 
by the function:

```js
function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}

let rtlScripts = SCRIPTS.filter(s => s.direction == "rtl");
console.log(map(rtlScripts, s => s.name));
// → ["Adlam", "Arabic", "Imperial Aramaic", …]
```

LIke `forEach` and `filter`, `map` is a standard array method.

## SUMMARIZING WITH REDUCE

Another common thing to do with arrays is to compute a single value from them. Our 
recurring example, summing a collection of numbers, is an instance of this. Another
example is finding the script with the most characters.

The higher-order operation that represents this pattern is called _reduce_ (sometimes
called _fold). It builds a valuel by repeatedly taking a single element from the 
array and combinindg it with the current value. When summing numbers, one'd start with
the number zero and, for each element, add that to the sum.

The parameters to `reduce` are, apart from the array, a combining function and a 
start value. This function is a little less straightforward than `filter` and 
`map`, so teach encourages us to take a close look at it:

```js
function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}

console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
// → 10
```

The standard array method `reduce`, which of course corresponds to this function, has an
added conveience. If one's array contains at least one element, one is allowed to leave 
off the `start` argument. The method will take the first element of the array as its start
value and start reducing at the second element:

```js
console.log([1, 2, 3, 4].reduce((a, b) => a + b));
// → 10
```

To use `reduce` (twice), to find the script with the most characters, one can write something 
like as follows:

```js
function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
}

console.log(SCRIPTS.reduce((a, b) => {
  return characterCount(a) < characterCount(b) ? b : a;
}));
// → {name: "Han", …}
```

The `characterCount` function reduces the ranges assigned to a script by summing their sizes. Note 
the use of desctructuring in the parameter list of teh reducer function. The second call to `reduce`
then uses this to find the largest script by repeatedly comparing two scripts and returning the larger
one.

The 'Han' script has more than 89,000 characters assigned to it in the Unicode standard, making it by 
far the biggest writing system in the dataset. 'Han' is a script (sometimes) used for Chines, Japanese,,
and Koren text. Those languages share a lot of characters, though they tend to write them differently.
The (US-based) Unicode Consortium decided to treat them as a single writing system to save character
codes. This is called _Han unification_ and still makes some people very angry.

## COMPOSABILITY

Consider how we would have written the previous example (finding the biggest script) without higher-order
functions. The code is not that much worse:

```js
let biggest = null;
for (let script of SCRIPTS) {
  if (biggest == null ||
      characterCount(biggest) < characterCount(script)) {
    biggest = script;
  }
}
console.log(biggest);
// → {name: "Han", …}
```

There are a few more bindings, and the program is four lines longer. But it is still very readable.

Higher-order functions start to shine when one needs to _compose_ operations. As an example, let's write
code that finds the average year of origin for living and dead scripts in the data set:

```js
function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

console.log(Math.round(average(
  SCRIPTS.filter(s => s.living).map(s => s.year))));
// → 1165
console.log(Math.round(average(
  SCRIPTS.filter(s => !s.living).map(s => s.year))));
// → 204
```

So the dead scripts in Unicode, are on average, older than the living ones. This 
is not a terribly meaningful or surprising statistic. But hopefully, teach things that
it is evident that the code used to compute it isn't hard to read. One can se it as
a pipeline: we start with all scripts, filter out the living(or dead) ones, takes
the years from those, average them, and round the result.

One could definitely also write this computation as one big loop:

```js
let total = 0, count = 0;
for (let script of SCRIPTS) {
  if (script.living) {
    total += script.year;
    count += 1;
  }
}
console.log(Math.round(total / count));
// → 1165
```

But it is harder to see what was being computed and how. And because intermediate
results aren't represented as coherent values, it'd be a lot more work to extract
something like `average` into a separate function. 

In terms of what the computer is actually doing, these two approaches are also
quite different. Thei first will build up new arrays when running `filter` and
`map`, whereas the second computes only some numbers, doing less work. One can
usually afford the readable approach, but if one is processing huge arrays, and
doing so many times, the less abstract style might be worth the extra speed.

## STRINGS AND CHARACTER CODES

One use of the data set would be figuring out what script a piece of text is using.
Let's go through a program that does this.

Remember, that each script has an array of character code ranges associated with
it. So given a character code, we coudl use a funciton like this to find the
corresponding script (if any):

```js
function characterScript(code) {
  for (let script of SCRIPTS) {
    if (script.ranges.some(([from, to]) => {
      return code >= from && code < to;
    })) {
      return script;
    }
  }
  return null;
}

console.log(characterScript(121));
// → {name: "Latin", …}
```

The `some` method is another higher-order function. It takes a test funciton
and tells one whether that function returns true for any of of the elements in
the array.

But how does one get the character codes in a string?

In C1, teach mentioned that JS strings are encoded as a sequence of 16-bit numbers.
These are called _code units_. A Unicode character code was initially supposed to
fit within such a unit (which gives one a little over 65,000 characters.) When it
became clear that that wasn't going to be enough, many people balked at the need to 
use more memory per character. To address these concerns, UTF-16, the format used by
JS strings, was invented. It describes most common characters using a single 16-bit
code unit but uses a pair of two such units for others.

UTF-16 is generally considered a bad idea today. It seems almost intentionally
designed to invite mistakes. It's easy to write programs that pretend to code
units and characters are the same thing. And if one's language doesn't use two-unit
characters, that will appear to work ust fine. But as soon as someone tries to 
use such a program with some less common Chines characters, it breaks. Fortunately, 
with the advent of emoji, everybody has started using two-unit characters, and
the burden of dealing with such problems is more fairly distributed. 

Unfortunately, obvious operations on JS strings, such as getting their length
through the `length` property and accessing their content using square brackets,
deal only with code units:

```js
// Two emoji characters, horse and shoe
let horseShoe = "🐴👟";
console.log(horseShoe.length);
// → 4
console.log(horseShoe[0]);
// → (Invalid half-character)
console.log(horseShoe.charCodeAt(0));
// → 55357 (Code of the half-character)
console.log(horseShoe.codePointAt(0));
// → 128052 (Actual code for horse emoji)
```

JS' `charCodeAt` method gives one a code unit, not a full character
code. The `codePointAt` method, added later, does give one a full Unicode
character. So we could use that to get characters from a string. But the
argument passed to `codePointAt` is still an index into the sequence of code
units. So to run over all characters in a string, we'd still need to deal with
the question of whether a character takes up one or two code units.

In the previous chapter, teach mentioned that a `for / of` loop can also be used on
strings. Like `codePointAt`, this type of loop was introduced at a time where 
folks were acutely aware of the problems with UTF-16. When one uses it to 
loop ver a string, it gives on real characters, not code units:

```js
let roseDragon = "🌹🐉";
for (let char of roseDragon) {
  console.log(char);
}
// → 🌹
// → 🐉
```

If one has a character (which will be a string of one or two code units), 
one may use `codePointAt(0)` to get its code.

## RECOGNIZING TEXT

We have a `characterSTrict` function and a way to correclty loop over 
characters. The next step is to count the characters that belong to each
script. The following counting abstraction will be useful there:

```js
function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
    if (known == -1) {
      counts.push({name, count: 1});
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
// → [{name: false, count: 2}, {name: true, count: 3}]
```

The `countBy` function expects a collection (anything that can be looped over with
`for`/ `of`) and a funciton that computes a group name for a given element. It returns
an array of objects, each of which names a group and tells the number of 
elements that were found in that group.

It uses anothe rarray method, `findIndex`. This method is somewhat like `indexOf`, but
instead of looking for a specific value, it finds the first value for which the given
function returns `true`. Like `indexOf`, it returns `-1` when no such element is
found.

Using `countBy`, one can write the function that tells us which scripts are used
in a piece of text:


```js
function textScripts(text) {
  let scripts = countBy(text, char => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.name : "none";
  }).filter(({name}) => name != "none");

  let total = scripts.reduce((n, {count}) => n + count, 0);
  if (total == 0) return "No scripts found";

  return scripts.map(({name, count}) => {
    return `${Math.round(count * 100 / total)}% ${name}`;
  }).join(", ");
}

console.log(textScripts('英国的狗说"woof", 俄罗斯的狗说"тяв"'));
// → 61% Han, 22% Latin, 17% Cyrillic
```

The function first counts the characters by name, using `characterScript` 
to assign them a name and falling back to the string `"none"` for characters
that aren't part of any script. The `filter` call drops the entry for `"none"`
from the resulting array since we aren't interested in those characters.

To be able to compute percentages, we first need the total number of characters
that belong to a script. ...

<!-- HERE -- RECOGNIZING TEXT! -->