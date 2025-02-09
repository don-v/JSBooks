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

<!-- HERE -- testing... -->