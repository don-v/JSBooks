# C3: FUNCTIONS

Functions are the bread and butter of JS programming. The concept of wrapping
a piece of program in a vluae has many uses. It gives us a way to structure 
larger programs, to reduce repetition, to associate names with subprograms,
and to isolate these subprograms from each other.

The most obvious application of functions is defining new vocabulary. Creating
new words in prose is usually bad styles. But in programming, it is 
indispensible.

Typical adult English speakers have some 20,000 words in their vocabulary. Few
programming languages come with 20,000 commands built in. And the vocabulary
that _is_ avaialbe tends to be more precisely defined, and thus less flexible,
than in human language. Therefore, we usually _have_ to introduce new concepts
to avoid repeating ourselves too much. 

## DEFINING A FUNCTION

A function definition is a regular binding where the value of the binding is a
function. For example, this code defines `square` to refer to a function that 
produces the square of a given number:  

```js
const square = function(x) {
  return x * x;
};

console.log(square(12));
// → 144
```

A function is created with an expression that starts with the keyword `function`. Functions have a 
set of _parameters_ (in this case, only `x`) and a _body_, which contains the statements that are to 
be executed when the function is called. The function body of a function created this way must always
be wrapped in braces, even when it consists of only a single statement.

A function can have multiple parameters or no parameters at all. In the following example, `makeNoise` 
does not list any parameter names, whereas `power` lists two:

```js
const makeNoise = function() {
  console.log("Pling!");
};

makeNoise();
// → Pling!

const power = function(base, exponent) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
};

console.log(power(2, 10));
// → 1024
```

some functions produce a value, such as `power`, and `square`, and some don't. ...

<!-- HERE -- defining a function -->