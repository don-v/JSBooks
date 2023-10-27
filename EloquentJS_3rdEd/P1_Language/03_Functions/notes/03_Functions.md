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

some functions produce a value, such as `power`, and `square`, and some don't,
such as `makeNoise`, whose only result is a side effect. A `return` statement
determines the value the function returns. When control comes across such a
statement, it immediately jumps out of teh current function an dgives the
returned values to  the code that called teh function. A `return` keyword
without an expression after it will cause teh function to return `unefined`.
Functions that don't have a `return` statement at all, such as `makeNosie`, 
similalry return `undefined`.

Parameters to a function behave like regular bindings, but their initial 
values are given by the _caller_ of teh function, not the code in the
function itself.

## BINDINGS AND SCOPES

Each binding has a _scope_, which is teh part of the program in which the
binding is visible. For bindings defined outside of any function or block,
the scope is the whole program -- one can refer to such bindings wherever
one wants. These are called _global_.

But bindings created for function parameters or declared inside a function
can be referenced only in that function, so they are known as _local_
bindings. Every time the function is called, new instances of these bindings
are created. This provides some isolation between functions -- each function 
call acts in its own little world (its local environment) and can often be
understood without knowing a lot about what's going on in the global
environment. 

Bindings declared with `let` and `const` are in fact local to the _block_
that they are declared in, so if one creates one of thise inside of a loop,
the code before and after the loop cannot "see" it. In pre-2015 JS, only
functions created new scopes, so old-style bindings, created with the `var`
keyword, are visible throughout the whole function that they appear in --
or throughout the global scope, if they are not in a function:

```js
let x = 10;
if (true) {
  let y = 20;
  var z = 30;
  console.log(x + y + z);
  // → 60
}
// y is not visible here
console.log(x + z);
// → 40
```

Each scope can "look out" into the scope around it, so `x` is visible
inside the block in the example. The exception is when multiple bindings have
the same name -- in that case, code can see only the innermost one. For 
example, when the code inside the `halve` functon refers to `n`, it is
seeing its _own_ `n`, not the global `n`:

```js
const halve = function(n) {
  return n / 2;
};

let n = 10;
console.log(halve(100));
// → 50
console.log(n);
// → 10
```

## NESTED SCOPE

JS distinguishes not just _global_ and _local_bindings. Blocks and functions can 
be created inside other blocks and functions, producing multiple degrees of
locality.

For example, this function -- which outputs the ingredients needed to make a 
batch of hummus-- has another function inside of it:

```js
const hummus = function(factor) {
  const ingredient = function(amount, unit, name) {
    let ingredientAmount = amount * factor;
    if (ingredientAmount > 1) {
      unit += "s";
    }
    console.log(`${ingredientAmount} ${unit} ${name}`);
  };
  ingredient(1, "can", "chickpeas");
  ingredient(0.25, "cup", "tahini");
  ingredient(0.25, "cup", "lemon juice");
  ingredient(1, "clove", "garlic");
  ingredient(2, "tablespoon", "olive oil");
  ingredient(0.5, "teaspoon", "cumin");
};
```

The code insie the `ingredient` function can see teh `factor` binding from
the outer function. But its local bindings, such as `unit` or `ingredientAmount`,
are not visible to the outer function.

The set of bindings visible inside a block is determined by the place of that
block in the program text. Each local scope can also see all the local scopes
that contain it, and al lscopes can see the global scope. This approach to 
binding visibility is called _lexical scoping_.

## FUNCTIONS AS VALUES

A function binding usually simply acts as a name for a specific piece of the
program. Such a binding is defined once and never changed. This make it easy
to confuse the function and its name.

But the two are differnt. A function value can do all the things that other
values can do--one can use it in arbitrary expressions, not just call it.
It is possible to store a function value in a new binding, pass it as an
argument to a function, and so on. Similarly, a binding that holds a function
is still just a regular binding and can, if not constant, be assigned a new
value, like so:

```js
let launchMissiles = function() {
  missileSystem.launch("now");
};
if (safeMode) {
  launchMissiles = function() {/* do nothing */};
}
```

In C5, teach will discuss the interesting things can be done by passing around
function values to to other functions.

## DECLARATION NOTATION

There is a slightly shorter way to create a function binding. When the `function` keyword
is used at the start of a statement, it works differently.

```js
function square(x) {
  return x * x;
}
```

This is a function _declaration_. The statement defines the binding `square` and points it at the 
given function. It is slightly easier to write and doesn't require a semicolon after the function. 

There is one subtlety with this form of function definition.

```js
console.log("The future says:", future());

function future() {
  return "You'll never have flying cars";
}
```

The preceding code works, even though the function is defined _below_ the code that uses
it. Function declarations are not part of the regular top-to-bottom flow of control. they are
conceptually moved to the top of their scope and can be used by all the code in that scope. This is 
sometimes useful because it offers the freedom to order code in a way that seems meaningful, without
worrying about having to define all functions before they are used.

## ARROW FUNCTIONS

There's a third notation for functions, which looks very different from the others. Instead of the
`function` keyword, it uses an arrow `=>` made up of an equal sign and a greater-than character
(not to be confused with the greater-than-or-equal operator, which is written `>=`).

```js
const power = (base, exponent) => {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
};
```

The arrow comes _after_ the list of parameters and is followed by the function's body. It expresses
something like "this input (the parameters) produces this result (the body)".

When there is only one parameter name, one can omit the parentheses around the parameter list. If the
body is a single expression, rather than a block in braces, that expression will be returned from the
function. So, these two definitions of `square` do the same thing:

```js
const square1 = (x) => { return x * x; };
const square2 = x => x * x;
```

When an arrow function has no parameters at all, its parameter list is just an empty set of parentheses:

```js
const horn = () => {
  console.log("Toot");
};
```

There's no deep reaosn to have both arrow functions and `function` expressions in the language. Apart 
from a minor detail, which will be discussed in C6, they do the same thing. Arrow functions were added in 
2015, mostly to make it possible to write small function expressions in a less verbose way. They will
be used frequently in C5!

## THE CALL STACK

The way control flows through functions is somewhat involved. Let's take a closer look at it. Here is a
simple program that makes a few function calls:

```js
function greet(who) {
  console.log("Hello " + who);
}
greet("Harry");
console.log("Bye");
```

A run through this program goes roughly like this: the call to `greet` causes control to jump to the start of the function (line 2). The function calls `console.log`, which takes
control, does its job, and then returns control to line 2. There it reaches the end of the
`greet` function, so it returns ot the place that called it, which is line 4. The line 
after that calls `console.log` again. After that returns, the program reaches its end.

We could show the flow of control schematically like this:

```
not in function
   in greet
        in console.log
   in greet
not in function
   in console.log
not in function
```

Because a function has to jump back to the place that called it when it returns,
the computer must remember the context from which the call happened. In one case, 
`console.log` has to return to the `greet` function when it is done. In the other
case, it returns to the end of the program.

The place where the computer stores this context is the _call stack_. Every time
a function is called, the current context is stored on top of this stack. When a 
function returns, it removes the top context from the stack and uses that context
to continue execution.

Storing this stack requires space in the computer's memory. When the stack grows
too big, the computer will fail with a message like "out of stack space" or "too
much recursion". The following code illustrates this by asking the computer a 
really hard question that causes an infinite back-and-forth between two functions. 
Rather, it _would_ be infinite, if the computer had an infinite stack. As it is,
we will run our of spce, of "blow the stack".

```js
function chicken() {
  return egg();
}
function egg() {
  return chicken();
}
console.log(chicken() + " came first.");
// → ??
```

## OPTIONAL ARGUMENTS

The following code is allowed and executes without any problem:

```js
function square(x) { return x * x; }
console.log(square(4, true, "hedgehog"));
// → 16
```

We defined `square` with only one parameter. Yet when we call it with three, the
language doesn't complain. It ignores the extra arguments and computes the square
of the first one.

JS is extremely broad-minded about the number of arguments one passes to a funcion.
If one passes too many, the extra ones are ignored. If one passes too few, the
missing parameters get assigned the value `undefined`. 

The downside of this is that it is possible -- likely, even -- that one'll
accidentally pass the wrong number of arguments to functions. And no one will tell
you about it.

The upside is that this behavior can be used to allow a function to be called with
different numbers of arguments. For example, this `minus` function tries to imitate
the `-` operator by acting on either one or two arguments:

```js
function minus(a, b) {
  if (b === undefined) return -a;
  else return a - b;
}

console.log(minus(10));
// → -10
console.log(minus(10, 5));
// → 5
```

If one writes an `=` operator after a parameter, followed by an expression, the
value of that expression will replace the argument when it is not given.

For example, this version of `power` makes its second argument optional. If one
doesn't provide it or pass the value `undefined`, it will default to `2`, and the
function will behave like `square`:

```js
function power(base, exponent = 2) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
}

console.log(power(4));
// → 16
console.log(power(2, 6));
// → 64
```

In the next chapter, we will see a way in which a funciton body can get at the
whole list of arguments it was passed. This is helpful because it makes it possible
for a function to accept any number of arguments. For example, `console.log` does
this -- it outputs all of the values it is given:

```js
console.log("C", "O", 2);
// → C O 2
```
## CLOSURE

The ability of treat functions as values, combined wiht the fact that local bindings
are re-created every time a function is called, brings up an interesting question.
What happens to local bindings when the function call that created them is no longer
active?

The following code shows an example of this. It defines a function, `wrapValue`, 
that creates a local binding. It then returns a function that accesses and returns
this local binding.

```js
function wrapValue(n) {
  let local = n;
  return () => local;
}

let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);
console.log(wrap1());
// → 1
console.log(wrap2());
// → 2
```

This is allowed and works as one would hope -- both instances of the binding can still be accessed. This situation is a good demonstration of the fact that local bindings are created anew for every call, and different calls can't trample on one another's local bindings.

This feature -- being able to reference a specific instance of a local binding is an enclosing scope -- is called a _closure_. A function that references bindings from local scopes around it is called _a_ closure. this behavior not only free one from having to worry about lifetimes of bindings but alos makes it possible to use function values in some createive ways. 

With a slight change, one can convert the previous example into a way to create functions that multiply by an arbirtray amount. 

```js
function multiplier(factor) {
  return number => number * factor;
}

let twice = multiplier(2);
console.log(twice(5));
// → 10
```

The explicit `local` binding from the `wrapValue` example isn't really needed since a parameter is itself a local binding.

Thinking about programs like this take seme prax. ...

<!-- HERE -- CLOSURE -->