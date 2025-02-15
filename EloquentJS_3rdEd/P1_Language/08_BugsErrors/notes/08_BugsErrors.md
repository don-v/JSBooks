# C8: BUGS AND ERRORS

>>> "Debugging is twice as hard as writing the code in the first place. Therefore if you write the 
code as cleverly as possible, you are, by definition, not smart enough to debug it."

--Biran Kernighan and P.J. Plauger, *The Elements of Programming Style*

Flaws in computer programs are usually called *bugs*. It makes programmers feel good to imagine 
them as little things that just happen to crawl into our work. In reality, of course, we put them 
there ourselves. 

If a program is crystallized thought, we can roughtly categorize bugs into those caused by the 
thouhts being confused and those caused by mistakes introduced while converting a thought to code. 
The former type is generally harder to diagnose and fix than the latter. 

## LANGAUGE

Many mistakes could be potined out to us automatically by the computer if it knew enough about what 
we're trying to do. But here, JS' looseness is a hindrance. Its concept of bindings and properties is 
vague enough that it will rarely catch typos before actually running the program. Even then, it allows 
one to do some clearly nonsensical things without complaint, such as computing `true * "monkey"`.

There are some things that JS does complain about. Writing a program that does not follow the language's 
grammar will immediately make the computer complain. Other things, such as calling something that's not 
a function or looking up a property on an undefined value, will cause an error to be reported when the 
program tries to perform the action. 

Ofte, however, one's nonsense computation will merely produce `NaN` (not a number) or an undefined 
value, while the program happily continues, convinced that it's doing something meaningful. The mistake 
will manifest itself only later, after the bogus vlaue has traveled through several functions. It might 
not trigger an error at all, but silently cause the program's output to be wrong. Finding the source 
of such problems can be difficult. 

The process of finding mistakes -- bugs -- in programs is called *debugging*. 

## STRICT MODE

JS can be made a *little* stricter by enabling *strict mode*. This can be done by putting the 
string `"use strict"` at the top of a file or a function body. Here's an example:

```js
function canYouSpotTheProblem() {
  "use strict";
  for (counter = 0; counter < 10; counter++) {
    console.log("Happy happy");
  }
}

canYouSpotTheProblem();
// → ReferenceError: counter is not defined
```

Code inside classes and modules (which we will discuss in 'C10') is automatically strict. The old nonstrict 
behavior still exists only because some old code might depend on it, and the language designers work hard to 
avoid breaking any existing programs. 

Normally, when one forgets to put `let` in front of your binding, as with `counter` in the example, JS quietly 
creates a global binding and uses that. In strct mode, an error is reported instead. This is very helpful. It 
should be noted, though, that this doens't work when the binding in question already exists somewhere in scope. 
In that case, the loop will still quietly overwrite the value of the binding. 

Another change in strict mode is that the `this` binidng holds the value `undefined` in functions that are not 
called as methods. When making such a call outside of strict mode, `this` refers to the global scope object, 
which is an object whose properties are the global bindings. So if one accidentally calls a method or constructor 
incorrectly in strict mode, JS will produce an error as soon as it tries to read something from `this`, rather 
than happily writing to the global scope. 

For example, consider the following code, which calls a constructor function without the `new` keyword so that 
its `this` will *not* refer to a newly constructed object:

```js
function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); // oops
console.log(name);
// → Ferdinand
```

The bogus call to `Person` succeeded, but returned an undefined value and created the global binding 
`name`. In strict mode, the result is different:

```js
"use strict";
function Person(name) { this.name = name; }
let ferdinand = Person("Ferdinand"); // forgot new
// → TypeError: Cannot set property 'name' of undefined
```

We are immeditately told that something is wrong. This is helpful.

Fortunately, constructors created with the `class` notation will always complain if they are called without 
`new`, making this less of a problem even in nonstrict mode. 

Strict mode does a few more things. It disallows giving a function multiple parameters with the same 
name and removes certain problematic language features entirely (such as the `with` statement, which is so 
wrong it is not further discussed in this book).

In short, putting `"use string"` at the top of one' sprogram rarely hurts and may actually help one spot a 
problem.

## TYPES

Some langauges want to know the types of all one's bindings and expressions before even running a program. 
They will indicate right away when a type is used in an inconsistent way. JS considers types only when actually
running the program, and even there often tries to implicilty convert values to the type it expects, so 
it's not much help.

Still, types provide a useful framework for talking about programs. A lot of mistakes come from being confused 
about the kind of value that goes into or comes out of a function. If one has that information written down, 
one is less likely to get confused. 

One could add a comment like the following before the `findRoute` function from the previous chapter to 
describe its type:

```js
// (graph: Object, from: string, to: string) => string[]
function findRoute(graph, from, to) {
  // ...
}
```

There are a number of different conventions for annotating JS programs with types. 

One thing about types is that they need to introduce their own complexity to be able to describe 
enough code to be useful. What does one think would be the type of the `randomPick` function that 
returns a random element from an array? One'd need to introduce a *type variable, T*, which can 
stand in for any type, so that one can give `randomPick` a type like `(T[]) -> T` (function from 
an array of *Ts* to a *T*).

When the types of a program are known, it is possible for the computer to *check* them for you, 
pointing out mistakes before the program is run. There are several JS dialects that add types to the 
language and check them. The most popular one is called 'TypeScript'. If oen is interested in adding 
more rigor to one's programs, teach recommends giving it a try. 

## TESTING 

If the language is not going to do much to help us find mistakes, we'll have to find them the 
hard way: by running the program and seeing whether it does the right thing.

Doing this by hand, again, and again, is a really bad idea. Not only is it annoying but it also 
leads to be ineffective, since it takes too much time to exhaustively test everything every time 
one makes a change. 

Computers are good at repetitive tasks, and testing is the ideal repetitive task. Automated testing  
is the process of writing a program that tests another program. Writing tests is a bit more work than 
testing manually, but once one has done it, one gains a superpower: it takes one only a few seconds to 
verify that one's program still behaves properly for all situations for which one wrote tests. When 
one breaks somehting, one'll immediately notice the error rathern than detecting it at some random 
point in the future. 

Tests usually take the form of little labeled programs that verify some aspect of one's code. For 
example, a set of tests for the (standard, probably already tested by someone else) `toUpperCase`
might look as follows:

```js
function test(label, body) {
  if (!body()) console.log(`Failed: ${label}`);
}

test("convert Latin text to uppercase", () => {
  return "hello".toUpperCase() == "HELLO";
});
test("convert Greek text to uppercase", () => {
  return "Χαίρετε".toUpperCase() == "ΧΑΊΡΕΤΕ";
});
test("don't convert case-less characters", () => {
  return "مرحبا".toUpperCase() == "مرحبا";
});
```

Writing tests like this tends to produce rather repetitive, awkward code. Fortunately, 
there exist pieces of software that help devs build and run collections of tests 
(*test suites*) by providing a langauge (in the form of functions and methods) suited to 
expressing tests and by outputting informative information when a test fails. These are 
usually called *test runners*. 

Some code is easier to test than other code. Generally, the more external objects that 
the code interacts with, the harder it is to set up the context in which to tests it. The style 
of programming shown in the previous chapter, which uses self-contained persistent value rather 
than changing objects, tends to be easy to test. 

## DEBUGGING

Once one notice there is something wrong with one's program because it misbehaves or produces 
errors, the next step is to figure out *what* the problem is. 

Sometimes it is obvious. The error message will point at a specific line of one's program, and if 
one looks at the error description and that line of code, one can often see the problem. 

But not always. Sometimes the line that triggered the problem is simply the first place where a 
flaky value produced elsewhere gets used in an invalid way. If  one ahs been sovling the 
exercises in earlier chapters, one will probably have already experienced such situations. 

The following example program tries to convert a whole number to a string in a given base (decimal 
binary and so on) by repeatedly picking out the last digit and then dividing the number to get rid 
of this digit. But the strange output that it currently produces suggests that it has a bug. 

```js
function numberToString(n, base = 10) {
  let result = "", sign = "";
  if (n < 0) {
    sign = "-";
    n = -n;
  }
  do {
    result = String(n % base) + result;
    n /= base;
  } while (n > 0);
  return sign + result;
}
console.log(numberToString(13, 10));
// → 1.5e-3231.3e-3221.3e-3211.3e-3201.3e-3191.3e-3181.3…
```

Even if one sees the problem already, one should pretend for a moment that one doesn't. We 
know that our program is malfunctioning, and we want to find out why. 

This is where one must resist the urge to start making random changes to the code to see 
whether that makes it better. Instead, *think*. Analyze what is happening and come up with 
a theory of why it might be happening. Then make additional observations to test this 
theory -- or, if one doens't yet have a theory, make additional observations to help one 
come up with one. 

Putting a few strategic `console.log` calls into the program is a good way to get additional 
information about what the program is doing. In this case, we want `n` to take the values `13`, 
`1`, and then `0`. Let's write out its value at the start of the loop:

```
13
1.3
0.13
0.013
...
1.5e-323
```

*Right*. Dividing by 13 by 10 does not produce a whole number. Instead of 
`n /= base`, what we actually want is `n = Math.floor(n / base)` so that the number is 
properly "shifted" to the right. 

An alternative to using `console.log` to peek into the program's behavior is to use the 
*debugger* capablities of one's browser.  Browser's come with the ability to set a *breakpoint*
on a specific line of one's code. When the execution of the program reaches a line with a 
breakpoint, it is puased, and one can inspect the value of bindings at that point. Teach 
won't go into details, as debuggers differe from browser to browser, but teach encourages 
us to look into our browser's dev tools or to search the web for browser debugging capability 
documentation. 

Another way to se ta breakpoint is to include a `debugger` statement (consisting simply 
of that keyword) in one's program. If the dev tools of one's browser are active, the program 
will pause whenever it reaches such a statement. 

## ERROR PROGPAGATION

Not all problems can be prevented by the programmer, unfortunatley. If one's program 
communicates with the outside world in any way, it is possible to get malformed input, to 
become overloaded with work, or to have the network fail. 

If one is programming for oneself, one can affor to just ignore such problems until they 
occur. But if one builds somehting that is going to be used by someone else, one usually 
wants the progarm to do better than simply crash. Sometimes the right thing to do is take 
the bad input in strid and continue running. In other cases, it is better to report to the 
user what went wrong and then give up. In either situation the program has to actively do 
something in response to the problem. 

Say one has a funciton `promptNUmber` that asks the user for a number and returns it. What 
should it return if the user inputs "orange"?

One option is ot make it return a special value. Common choices for such values are `null`, 
`undefined`, or `-1`:

```js
function promptNumber(question) {
  let result = Number(prompt(question));
  if (Number.isNaN(result)) return null;
  else return result;
}

console.log(promptNumber("How many trees do you see?"));
```

Now any code that calls `promptNumber` must check whether an actual number was read and, 
failing that, must somehow recover -- maybe by asking again or by filling in a default value. 
Or it could again return a special value to *its* caller to indicate that it failed to do 
what it asked. 

In many situations, mostly when errors are common and the caller should be explicitly taking 
them into account, returning a special value is a good way to indicate an error. It does, 
however, have its downsides. First what if the function can already return every possible 
kind of value? In such a funciton, one'll have to do something like wrap the result in an 
object to be able to distinguish success from failure, the way the `next` method on the 
iterator interface does. 

```js
function lastElement(array) {
  if (array.length == 0) {
    return {failed: true};
  } else {
    return {value: array[array.length - 1]};
  }
}
```

The second issue with returning special values is that it can lead to awkward code. If a 
piece of code calls `promprtNUmber 10 times`, it has to check 10 times whether `null` was 
returned. If its response to finding `null` is to simply return `null` itself, callers of 
the funcion will in return have to check for it, and so on. 

## EXCEPTIONS



<!-- HERE -- exceptions... -->