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

When a function cannot proceed normally, what we would often *like* to do is just stop what 
we are doing and immediately jump to a place that knows how to handle the problem. This is 
what *exception handling* does. 

Exceptions are a mechanism that makes it possible for code that runs into a problem to *raise* 
(or *throw*) an exception. An exception can be any value. Raising one somewhat resembeles a 
super-charged return form a function: it jumps out of not just the current function but also 
its callers, all the way down to the first call that started the current execution. This is 
called *unwinding the stack*. One may remember the stack of function calls mentioned in C3. 
An exception zooms donw this stack, throwing away all the call contexts it encounters. 

If exceptions always zoomed right down to the bottom of the stack, they would not be of much 
use. They'd just provide a novel way to blow up one's program. Their power lies in the fact 
that oen can set "obstacles" along hte stack to *catch* the exeption as it is zooming down. 
Once one has caught an exception, one can do something with it to address the problem and then 
continue to run the program. 

Here's an example:

```js
function promptDirection(question) {
  let result = prompt(question);
  if (result.toLowerCase() == "left") return "L";
  if (result.toLowerCase() == "right") return "R";
  throw new Error("Invalid direction: " + result);
}

function look() {
  if (promptDirection("Which way?") == "L") {
    return "a house";
  } else {
    return "two angry bears";
  }
}

try {
  console.log("You see", look());
} catch (error) {
  console.log("Something went wrong: " + error);
}
```

The `throw` keyword is used to raise an exception. Catching one is done by wrapping a 
piece of code in a `try` block, follwoed by the keywrod `catch`. When the code in the 
`try` block causes an exception to be raised, the `catch` block is evaluated, with the 
name in parentheses bound to the exception value. After the `catch` block finished -- or 
if the `try` block finishes without problems, -- the program proceeds beneath the entire 
`try/catch` statement. 

In this case, we used `Error` constructor to create our exception value. This is a standard
JS consructor that creates an object with a `message` propeorty. Instances of `Error` also 
gather information about the call stack that existed when the exception was created, a so-called 
*stack trace*. This information is stored in the `stack` property can can be helpful when 
trying to debug a problem: it tells us the function where the problem occurred and which 
functions made the failing call. 

Note tha the `look` function completely ignores the possibility that `promptDirection` might 
go wrong. This is a big advantage of exepctions: error-handling code is necessary nly at the 
point where the error occurs and at the point where it is handled. The functions in between 
can forget all about it. 

Well, almost...

## CLEANING UP AFTER EXCEPTIONS

The effect of an exception is another kind of control flow. Every action that might cause 
an exception, which is pretty much every function call and property access, might cause 
control to suddenly leave your code. 

This means when code has several side effects, even if its "regular" control flow looks 
like they'll always happen, an exception might prevent some of them from taking place.

Here is some really bad banking code.  

```js
const accounts = {
  a: 100,
  b: 0,
  c: 20
};

function getAccount() {
  let accountName = prompt("Enter an account name");
  if (!Object.hasOwn(accounts, accountName)) {
    throw new Error(`No such account: ${accountName}`);
  }
  return accountName;
}

function transfer(from, amount) {
  if (accounts[from] < amount) return;
  accounts[from] -= amount;
  accounts[getAccount()] += amount;
}
```

The `transfer` function transfers a sum of money from a given account to another, 
asking for the name of the other account in the process. If given an invalid account
name, `getAccount` throws an exception.

But `transfer` *first* removes the money from the account and *then* calls `getAccount` 
before it adds it to another account. If it is broken off by an exception at that point, 
it'll just make the money disappear. 

That code could have been written a little more intelligently, for example by caling 
`getAccount` before it starts moving money around. But often problems like thi soccur in 
more subtle ways. Even functions that don't look like they will throw an exception 
might do so in exceptional circumstances or when they contain a programmer mistake. 

One way to address thi sis to use fewer side effects. Again, a programmming style 
that computes new values instead of changing existing data helps. If a piece of code 
stops running in the middle of creating a new value, no existing data structures were 
damaged, making it easier to recover. 

Since that isn't always practical, `try` statements have another feature: tehy may be 
follwoed by a `finally` block either instead of or in addition to a `catch` block. 
A `finally` block says "no matter *what* happens, run this code after trying to 
run the code in the `try` block.";

```js
function transfer(from, amount) {
  if (accounts[from] < amount) return;
  let progress = 0;
  try {
    accounts[from] -= amount;
    progress = 1;
    accounts[getAccount()] += amount;
    progress = 2;
  } finally {
    if (progress == 1) {
      accounts[from] += amount;
    }
  }
}
```

This version of the function tracks its progress, and if, when leaving, it notices that it was 
aborted at a point where it had created an inconsistent program state, it repairs the damage it 
did. 

Note that even though the `finally` code is run when an exception is thrown in the `try` block, 
it does not interfere with the exception. After the `finally` block runs, the stack continues
unwinidng. 

Writing programs that operate reliably even when exceptions pop up in unexpected places is hard. 
Many people simly don't bother, and because exceptions are typically reserved for exceptonal 
cirtumstances, the problem may occur so rarely that it is never even noticed. Whether that is 
a good thing or a really bad ting depends on how much damage the software will do when it  
fails. 

## SELECTIVE CATCHING

When an exception makes it all the way to the bottom of the stack without being caught, 
it gets handled by the environment. What this means differes between environments. In browsers, 
a description of the error typically gets written to the JS console (reachable through the 
browser's 'Tools' or 'Developer' menu). 'Node.js', the browserless JS environment to be 
discussed in C20, is more careful about data corruption. It aborts the whole process when an 
unhandled exception occurs. 

For programmer mistakes, just letting the error go through is often the best one can do. An 
unhandled exception is a reasonable way to signal a broken program, and the JS console will, 
one modern browsers, provide one with some information about which function calls were on the 
stack when the problem occurred. 

For people that are *expected* to happen during routine use, crashing with an unhandled exception 
is a terrible strategy. 

Invalid use of the language, such as referencing a nonexistent binding, looking up a property 
on a `null`, or calling something that's not a function, will also result in the raising of 
exceptions. But wwe are agnostic to *what* did or *which* excpetion it caused. 

JS (in a rather glaring omission) doesn't provide direct support for selectively catching 
exceptions: either one catches them all or one doesn't catch any. This make it tempting to 
*assume* that the exception one gets is the one one was thinking about when one wrote the 
`catch` block.

But it might not be. some other assumption may be violated, or one might have introduced a 
bug that is causing an exception. Here is an example that *attempts* to keep calling `
`promptDirection` until it gets a valid answer:

```js
for (;;) {
  try {
    let dir = promtDirection("Where?"); // ← typo!
    console.log("You chose ", dir);
    break;
  } catch (e) {
    console.log("Not a valid direction. Try again.");
  }
}
```

The `for(;;)` construct is a way to intentionally create a loop that doesn't terminate 
on its own. We break out of the loop only when a valid direction is given. Unfortunately, 
we mispelled `promptDirection`, which will resut lin an "undefinable variable" error. 
Because the `catch `block completely ignores its exception value (`e`), assuming it knows
what the problem is, it wrongly treats the binding error as indicating  bad input. Not only
does this cause an infinite loop but it also "buries" the useful erro rmessage about the 
mispelled binding. 

As a general rule, don't blanket-catch exceptions unless it is for the purpose of "routing"
them somewhere -- for example, over the network to tell another system that our program 
crashed. And even then, thinking carefully about hwo one might be hiding information. 

We want to catch a *specific* kind of exception. ...

<!-- HERE -- selective catching... -->