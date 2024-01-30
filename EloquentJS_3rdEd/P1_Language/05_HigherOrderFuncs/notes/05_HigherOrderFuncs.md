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

<!-- HERE -- script data set! -->