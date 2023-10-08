# CHAPTER 2: PROGRAM STRUCTURE

This chapter expands beyond nouns and sentence fragments of JS language.

## EXPRESSIONS AND STATEMENTS

In C1, we declared values, and the applied operators to these values to
generate new values. Creating values is the main substance of any JS
program. But that substance has to be framed in a larger structure to be
useful. So that's what we'll cover next.

A fragment of code that produces a value is called an _expression_. Every
value that is written literally (such as `22` or `"pscyhoanalysis"`) is 
an expression. An expression between parentheses is also an expression, as
is a binary operator applied to two expressions or a unary operator applied 
to one.

This shows part of the beauty of a language-based interface. Expressions can
contain other expressions in a way similar to who subsentences in human 
languages are nested -- a subsentence can contains its own subsentences, 
and so on. This allows us to build expressions that describe arbitrarily 
complex computations.

If an expression corresponds to a sentence fragment, a JavaScript _statement_
corresponds to a full sentence. A program is a list of statements.

The simplest kind of statement is an expression with a semicolon after it. 
This is a program:

```js
1;
!false;
```

It is a useless program, though. An expression can be content to just produce
a value, which can then be used by the enclosing code. A statement stands on its
own, so it amounts to something only if it affects the world. It could display
something on the screen -- that counts as changing the world -- or it could change
the internal state of the machine in a way that will affect the statements that
come after it. These changes are called _side effects_. The statements in the
previous example just produces the values `1`, and `true` and then immediately 
throw them away. This leaves no impression on the world at all. When you run this
program, nothing observable happens.

In some cases, JS allows one to omit the semicolon at the end of a statement. In 
other cases, it has to be there, or the next line will be treated as part of the
same statement. The rules for when it can be safely ommitted are somewhat complex
and error-prone. So in this book, every statement that needs a semicolon will always
get one. I recommend you do the same, at least until you've learned ore about the
subtleties of missing semicolons. 

## BINIDNGS

How does a program keep an internal state? How does it remember things? We have 
seen how to produce nwe vlaues from old values, but this does not change the old
values, and the new values has to be immediately used or it wil dissipate again. To
catch and hold values, JS provides a thing called _binding_, or _variable_:

```js
let caught = 5 * 5;
```

That's a second kind of statement. The special word (_keyword_) `let` indicates that
this sentence is gong to define a binding. It is followed by the name of the binding
and, if we want to immediately give a value, by an `=` operator and an expression.

The previous statement creates a binding called `caught` and uses it to grab hold of
the number that is produced by multiplying `5` by `5`.

After a binding has been defined, its name can be used as an expression. The value
of such an expression is the value the binding currenclty holds. Here's an example:

```js
let ten = 10;
console.log(ten * ten);
// -> 100
```

When a binding points at a value, that does not mean it is tied to that value 
forever. The `=` operator can be used at any time on existing bindings to disconnect
them from their current value and have them point to a new one. 


```js
let mood = "light";
console.log(mood);
// -> light
mood = "dark";
console.log(mood);
// -> dark
```

One should imagine bindings as tentacles, rather than boxes. They do not
_contain_ values; they _grasp_ them -- two bindings can refer to the same value.
A program can access only the value that it still has a reference to. When one
needs to remember something, one grows a tentacle to hold on to it or one 
re-attaches one of one's existing tentacles to it.

Let's look at another example. To remember the number of dollars that Luigi
still owes, one creates a binidng. And then whe he pays back $35, one gives
the binding a new value:

```js
let luigisDebt = 140;
luigisDebt = luigisDebt - 35;
console.log(luigisDebt);
// → 105
```

When one defines a binding without giving it a value, the tentacle has nothing
to grasp, so it ends in thin air. If one asks for the value of an empty binding,
one'll get the value `undefined`.

A single `let` statement may define multiple bindings. The definitions must
be separated by commas:

```js
let one = 1, two = 2;
console.log(one + two);
// → 3
```

The words `var` and `const` can also be used to create bindings, in a similar
way to `let`:

```js
var name = "Ayda";
const greeting = "Hello ";
console.log(greeting + name);
// → Hello Ayda
```

The first, `var` (short for "variable"), is the way bindings were declared in pre-2015
JS. Teach will explain with precision how `var` differs from `let` in the following 
chapter (C03). Teach says that it functions similarly to `let`, but will be henceforth
rarely used in this book becuase it has confusing properties.

The word `const` stands for _constant_. It defines a constant binding, which points 
at the same value for as long as it lives. This is useful for bindings that give a 
name to a value so that one can easily refer to it later.

## BINDING NAMES

Binding names can be any word. Digits can be part of binding names -- `catch22`, is a
valid name, for example -- but the name must not start with a digit. A binding name may
include dollar signs `$` or underscores `_` but no other punctuation or special
characters.

Words with special meaning, such as `let`, are _keywords_, and they may not be used as
binding names. There are also a number of words that are "reserved for use" in future
versions of JS, which also can't be used as binding names. The full list of keywords and
reserved words is rather long:

```
break
case
catch
class
const
continue
debugger
default
delete
do
else
enum 
export
extends
false
finally
for
function
if 
implements
import
interface
in
instanceof
let
new
package
private
protected
public
return
static
super
switch
this 
throw
true
try 
typeof
var
void
while
with 
yield
```

When creating a binding produces an unexpected syntax error, it may be the 
case that one is attempting to assign a reference to a reserved word from
the list above!

## THE ENVIRONMENT

The collection of bindings and their values that exist at a given time is called
the _environment_. When a program starts up, this environment is not empty. It
always contains bindings that are part of the language standard, an dmost of the 
time, it also has bindings that provide ways to interact with the surrounding
system. For example, in a browser, there are functions to interact with the
currently loaded website and to read mouse and keyboard input.

## FUNCTIONS

A lot of the values provided in the default environment have the type _functions_.
A function is a piece of program wrapped in a value. Such a value can be
_applied_ in order to run the wrapped program. For example, in a browser
environment, the binding `prompt` holds a function that shows a little dialog
box asking for user input. It is used like this:

```js
prompt("Enter passcode");
```

Executing a function is called _invoking_, _calling_, or _applying_ it. One can
call a function by putting parentheses after an expression that produces a function
value. Usually one'll direclty use the name of the binding that holds the function.
The values between the parentheses are given to the program inside the function.
In the example, the `prompt` function uses the string that was given to it as the 
text to display in the dialog box that appears in the browser window. Values given
to function are called _arguments_. Different functions might need a different number
or different types of arguments.

The `prompt` function isn't used much in modern web programming, mostly because one
has no control over the way the resulting dialog box looks, but can be helpful in 
toy programs and experiements.

## THE `console.log` FUNCIONT

In the examples, teach uses `console.log` to output values. Most JS systems (including
all modern web browsers and Node.js) provide a `console.log` function that writes out
its arguments to _some_ text output device. In browsers, the output lands in the JS
console. This part of the browser interface is hidden by default, but most browsers
open it when one presses F12 or, on a mac, <COMMAND-OPTION-I>. If that does not work,
serach through the menus for an item named 'Developer Tools' or similar.

When running examples (or one's own code) on the pages of this book, `console.log` 
output will be shown after the example, instead of in the browser's JS console.

```js
let x = 30;
console.log("the value of x is", x);
// → the value of x is 30
```

Though binding names cannot contain period characters, `console.log` does have
one. This is because `console.log` isn't a simple binding. It is actually an
expression that retrieves the `log` property from the value held by the 
`console` binding. We'll find out exactly what this means in C4!

## RETURN VALUES

Showing a diaglog box or writing text to the screen is a _side effect_. A 
lot of functions are useful because of the side effects they produce. Functions
may also produce values, in which case tehy don't need to have a side effect to 
be useful. For example, the function `Math.max` takes any number arguments and
returns the argument with the greatest value relative to all other arguments!

```js
console.log(Math.max(2, 4));
// → 4
```

When a function produces a value, it is said to _return_ that value. Anything
that produces a value is an expression in JS, which means function calls can
be used within larger expressions. Here a call to `Math.min`, which is the
opposite of `Math.max`, is used as part of a 'plus' expression:

```js
console.log(Math.min(2, 4) + 100);
// → 102
```

The following chapter explains how one writes one's own functions.

## CONTROL FLOW

When one's program contains more than one statement, the statements are 
executed as if they are a story, from top to bottom. This example program
has two statements. The first one asks the user for a number, and the 
second which is executed after the first, shows the square of that number:

```js
let theNumber = Number(prompt("Pick a number"));
console.log("Your number is the square root of " +
            theNumber * theNumber);
```

The function `Number` converts a value to a number. We need that conversion
because the result of `prompt` is a string value, and we want a number. 
There are similar functions called `String` and `Boolean` that converts to
those types.

Here is a rather trivial schematic representation of straight-line control
flow:

![Straign-line Execution](../../../to_ignore/02_ProgramStructure/Straight_line_flow.png)

## CONDITOINAL EXECUTION 

Not all programs are straight roads. We may, for example, want to create a 
branching road, where the program takes the proper branch based on the 
situation at hand. This is called _conditional execution_.

![Conditional Execution](../../../to_ignore/02_ProgramStructure/Conditional_execution.png)

Conditoinal execution is created with the `if` keyword in JS. IN the simple case,
we want some code to be executed if, and only if, a certain condition is satisfied.
We might for example, want to show the square of the input only if the input is 
actually a number:  

```js
let theNumber = Number(prompt("Pick a number"));
if (!Number.isNaN(theNumber)) {
  console.log("Your number is the square root of " +
              theNumber * theNumber);
}
```

With this modification, if one enter "parrot", no output is shown.

The `if` keyword execues or skips a statement depending on the value  
of a Boolean expression. The deciding expression is written after the
keyword, between parentheses, followed by the statement to execute.

The `Number.isNaN` function is a standard JS function that returns 
`true` only if the argument it is given is `NaN`. The `Number` function
happens to return `NaN` when oen gives it a string that doesn't represent
 a valid number. Thus, the condition translates to "unless `theNumber`
 is not-a-number, do this".

 The statement after the `if` is wrapped in braces (`{ and }`) in this
 example. The braces can be used to group any number of statments into
 a single statement, called a _bock_. One could also have omitted them
 in this case, since they hold only a single statement, but to avoid
 having to think about whether they are needed, most JS programmers use
 them in every wrapped statement like this. We'll mostly follow that
 convention in this book, except for the occasional one-liner:

 ```js
 if (1 + 1 == 2) console.log("It's true");
// → It's true
 ```

One often won't just have code that executes when a condition holds true,
but also code that handles the other case. This alternate path is 
represented by teh second arrow in the diagram. One can use the `else`
keyword, together with `if`, to create two separate, alternative
execution paths.

```js
let theNumber = Number(prompt("Pick a number"));
if (!Number.isNaN(theNumber)) {
  console.log("Your number is the square root of " +
              theNumber * theNumber);
} else {
  console.log("Hey. Why didn't you give me a number?");
}
```

If oen has more than two paths to choose from, one can "chain" multiple
`if/else` pairs together. Here's an example:

```js
let num = Number(prompt("Pick a number"));

if (num < 10) {
  console.log("Small");
} else if (num < 100) {
  console.log("Medium");
} else {
  console.log("Large");
}
```

The program will first check whether `num` is less than 10. If it is, it 
chooses that branch, shows `"Small"`, and is done. If it isn't, iti takes
the else branch, which itself contains a second `if`. If it isn't, it
takes the `else` branch, which itself contains a second `if`. If the second
condition `(< 100)` holds, that means the number is at least 10 but below
100, and `"Medium"` is shown. If it doesn't, the second and last `else`
branch is chosen.

The schema for this program looks something like this:

![Conditional Execution -- If else](../../../to_ignore/02_ProgramStructure/Conditional_if_else.png)

## WHILE AND DO LOOPS

Consider a program that outputs all even numbers from 0 to 12. One way to write 
this is as follows:

```js
console.log(0);
console.log(2);
console.log(4);
console.log(6);
console.log(8);
console.log(10);
console.log(12);
```

That works, but the idea of writing a program is to make something _less_
work, not more. If we needed all even number less than 1000, this approach would
be unworkable. What we need is a way to run a piece of code multiple times. 
This form of control flow is called a _loop_:

![Conditional Execution -- If else](../../../to_ignore/02_ProgramStructure/Looping.png)

Looping control flow allows us to go back to some point in the program where we 
were before and repeat it with our current program state. If we combine this with
a binding that counts, we can do something like this:

```js
let number = 0;
while (number <= 12) {
  console.log(number);
  number = number + 2;
}
// → 0
// → 2
//   … etcetera
```

A statement starting with the keyword `while` creates a loop. the word `while` is 
followed by an expression in parentheses and then a statement, much like `if`. The 
loop keeps entering that statement as long as the expression produces a value that 
evaluates to `true` when converted to 'Boolean'.

The `number` binding demonstrates the way a binding can track the progress of a 
program. Every time the loop repeats, `number` gets a value that is 2 more than its
previous value. At the beginning of every repetition, it is compared with the number
12 to decide whether the program's work is finished.

As an example that actually does something useful, we can now write a program that
calculates and shows the value of $2^10$ (2 to the 10th power). We use two bindings:
one to keep track of our result and one to count how often we have multiplied by 
2. The loop tests whether the second binding has reached 10 yet and, if not, updates
both bindings.

```js
let result = 1;
let counter = 0;
while (counter < 10) {
  result = result * 2;
  counter = counter + 1;
}
console.log(result);
// → 1024
```

The counter could also have started at 1 and checked for `<=10`, but for reasons that 
will become apparent in C4, it is a good idea to get used to counting form `0`

A `do` loop is a control structure similar to a `while` loop. It differes only on one 
point: a do loop always execues its body at least once, and it starts testing whether
it should stop only after that first execution. To reflect this, the test appears after 
the body of the loop!

```js
let yourName;
do {
  yourName = prompt("Who are you?");
} while (!yourName);
console.log(yourName);
```

This program will force one to enter a name. It will ask again and again until it
gets something that is not an empty string. Applying the `!` operator will convert 
a value to 'Boolean' type before negating it, an dall strings except "" convert to
`true`. This mean the loop continues going until one provides a non-empty name. 

## INDENTING CODE

In the examples, teach has been adding spaces in front of statements that are part
of some larger statement. These spaces are not required -- the computer will accept 
the program just fine without them. In fact, even the line breaks in programs are 
optional. One could write a program as a single long line if one felt like that.

The role of this indentation inside blocks is to make the structure of the code 
stand out. In code where new blocks are opened inside other blocks, it can become
hard to see where one block ends and another begins. With proper indentation, the
visual shape of a program corresponds to the shape of the blocks inside it. I like
to use two spaces for every open block, but tastes differ -- some people use four
spaces, and some people use tab characters. The imporant thing is that each new 
block adds the same amount of space. 

```js
if (false != true) {
  console.log("That makes sense.");
  if (1 < 2) {
    console.log("No surprise there.");
  }
}
```

Most code editor programs (including the one in this book) will help by automatically
indenting new lines the proper amount.

## FOR LOOPS

Many loops follow the pattern shown in the `while` examples. First a "counter" 
binding is created to track the progress of the loop. Then comes a `while` loop. 
usually wiht a test expression that checks whether the counter has reached its end
value. At the end of the loop body, the counter is updated to track progress.

Because this pattern is so common, JS and similar languages provide a slightly
shorter and more comprehensive form, the `for` loop:

```js
for (let number = 0; number <= 12; number = number + 2) {
  console.log(number);
}
// → 0
// → 2
//   … etcetera
```

This program is exactly equivalent to the earlier even-number-printing example. The
only change is that all the statements that are related to the "state" of the loop are
grouped together after `for`.

The parentheses after a `for` keyword must contain two semicolons. The part before the
first semicolon _initializes_ the loop, usually by defining a binding. The second part
is the expression that _checks_ whether the loop must continue. The final part _updateds_
the state of the loop after every iteration. In most cases, this is shorter and
clearer than a `while` construct.

This is the code that computes $2^10$ using `for` instead of `while`:

```js
let result = 1;
for (let counter = 0; counter < 10; counter = counter + 1) {
  result = result * 2;
}
console.log(result);
// → 1024
```

## BREAKING OUT OF A LOOP

Having the looping condition produce `false` is not the only way a loop
can finish. There is a special statement called `break` that has the effect
of immediately jumping out of teh enclosing loop.

This program illustrates the `break` statement. It finds the first number 
that is both greater than or equal to 20 and divisble by 7:

```js
for (let current = 20; ; current = current + 1) {
  if (current % 7 == 0) {
    console.log(current);
    break;
  }
}
// → 21
```

Using the remainder (`%`) operator is an easy way to test whether a number
is divisible by another number. If it is, the remainder of the divisio will be
zero. 

The `for` construct in the example does not have a part that checks for the
end of the loop. This means that the loop will never stop unless the `break`
statement inside is executed.

If one was to remove that `break` statement or one accidentally writes an 
end condition that always produces `true`, one's program would get stuck in
an _infinite loop_. A program stuck in an infinite loop will never finish
running, which is usually a bad thing.

If one creates an infinite loop in one of the examples on these pages, you'll
usually be asked whether one wants to stop the script after a few seconds. If
that fails, one will have to close the tab that one is working in, or on some
browsers close one's whole browser, to recover.

The `continue` keyword is similar to `break`, in that it influences the progress
of a loop. When `continue` is enountered in a loop body, control jumps out of the
body and continues with the loop's next iterration. 

## UPDATING BINDINGS SUCCINCTLY

Especially when looping, a program often needs to "update" a binding to hold a
value based on that binding's previous value.

```js
counter = counter + 1;
```

JS provides a shortcut for this:

```js
counter += 1;
```

Similar shortcuts work for many other operators, such as `result *=2` to
double `result` or `counter -= 1` to ocunt downward.

This allows us to shorten our counting example a little more:

```js
for (let number = 0; number <= 12; number += 2) {
  console.log(number);
}
```

For `counter += 1` and `counter -= 1`, there are evne shorter equivalents:
`counter++` and `counter--`.

## DSIPATCHING ON A VALUE WITH SWTICH

It is not uncommon for code to look like this:

```js
if (x == "value1") action1();
else if (x == "value2") action2();
else if (x == "value3") action3();
else defaultAction();
```

There is a construct called `switch` that is intended to express such a "dispatch"
in a more direct way. Unfortunately, the syntax JS uses for this (which it 
inherited from the C/Java line of programming language) is somewhat awkward -- a
chain of `if` statements may look better. Here is an example:

```js
switch (prompt("What is the weather like?")) {
  case "rainy":
    console.log("Remember to bring an umbrella.");
    break;
  case "sunny":
    console.log("Dress lightly.");
  case "cloudy":
    console.log("Go outside.");
    break;
  default:
    console.log("Unknown weather type!");
    break;
}
```

One may put any number of `case` labels inside the block opened by
`switch`. The program will start executing at the label that corresponds to
the value that `switch` was given, or at `default` if no matching value is
found. It will continue executing, even across other labels, until it 
reaches a `break` statement. In some cases, such as the `"sunny"` case
in the example, this can be used to share some code between cases (it
recommends going outside for both sunny and cloudy weather). But be
careful -- it is easy to forget such a `break`, which will cause the
program to execute code one does not want executed. 

## CAPITALIZATION

Binding names may not contain spaces, yet it is often helpful to use
multiple words to clearly describe what the binding represents. These
are pretty much one's choices for writing a binding name with several
words in it:

```js
fuzzylittleturtle
fuzzy_little_turtle
FuzzyLittleTurtle
fuzzyLittleTurtle
```

The first style can be hard to read. Teach rather likes the look of the
underscores, though that style is a bit more challenging to type. The 
standard JS functions, and most JS programmers, follow the bottom style--
they capitalize every word except the first. It is not hard to get used 
to little things like that, and code with mixed naming styles can be
jarring to read, so teach follows this (the bottom style) convention!

In a few cases, such as the `Number` function, the first letter of a 
binding is also capitalized. This was done to mark this function as a
_constructor_. Waht a constructor is will become clear in C6. For now,
the important thing is not to be bothered by this apparent lack of
consistency.

## COMMENTS

Often, raw code does not convey all the information one wants a program
to convey to human readers, or it conveys it in such a cryptic way, that
people might not understand it. At other times, one might just want to 
include some realted thoughts as part of one's program. This is what 
_comments_ are for.

A comment is a piece of text that is part of a progrram but is completey
ignored by the computer (interpreter?). JS has two ways of writing comments.
To write a single-line comment, one can use two slash characters (`//`)
and then the comment text after it:

```js
let accountBalance = calculateBalance(account);
// It's a green hollow where a river sings
accountBalance.adjust();
// Madly catching white tatters in the grass.
let report = new Report();
// Where the sun on the proud mountain rings:
addToReport(accountBalance, report);
// It's a little valley, foaming like light in a glass.
```

A `//` comment goes only to the end of the line. A section of text between
`/*` and `*/` will be ignored in its entirety, regardless of whether it 
contains line breaks. This is useful for adding blocks of information about 
a file or a chunk of program.

```js
/*
  I first found this number scrawled on the back of an old
  notebook. Since then, it has often dropped by, showing up in
  phone numbers and the serial numbers of products that I've
  bought. It obviously likes me, so I've decided to keep it.
*/
const myNumber = 11213;
```

## SUMMARY

One now knows that a program is built out of statements, which themselves
sometimes contain more statements. Statements tend to contain expressions,
which themselves can be built out of smaller expressions.

Putting statements after one another give one a program this is executed from
top to bottom. One can introduce distrubances in the flow of control by using 
conditional (`if`, `else`, and `switch`) and looping (`while`, `do`, and `for`)
staments.

Bindings can be used to file pieces of data under a name, and they are useful
for tracking state in one's program. The environment is the set of bindings that
are defined. JS systems always put a number of useful standard bindings into
one's environment.

Functions are special values that encapsulate a piece of a program. One can 
invoke them by writing `functionName([arg1, arg2,...argn])`. Such a function
call is an expression and may produc a value.

## EXERCISES

If one is unsure how to test one's exercises, refer to the 'Introduction'. 

Each exercise starts with a problem description. Read this description and 
try to solve the exercise. If one runs into problems, consider reading the
hints after the exercise. Full solutions to the exercises are not inluded in
this book, but one can find them online at 
`https://eloquentjavascript.net/code`. If one wants to learn something from 
the exercises, teach recommends looking at the solutions only after one has
solved the exercise or at least after one has attacked it long and hard 
enough to have a slight headache.

## LOOPING A TRIANGLE

Write a loop tha tmakes seven calls to `console.log` to output the following
triangle:

```js
#
##
###
####
#####
######
#######
```

It may be useful to know that one can find the length of a string by
writing by accessing its `length` attribute as follows:

```js
let abc = "abc";
console.log(abc.length);
// → 3
```

Most exercises contain a piece of code that one can modify to solve the
exercise. Remember that one can click code blocks to edit them!

### DISPLAY HINTS: TRIANGLES

```js
/*You can start with a program that prints out the numbers 1 to 7, which you can derive by making a few modifications to the even number printing example given earlier in the chapter, where the for loop was introduced.

Now consider the equivalence between numbers and strings of hash characters. You can go from 1 to 2 by adding 1 (+= 1). You can go from "#" to "##" by adding a character (+= "#"). Thus, your solution can closely follow the number-printing program.*/
```

my solution:

```js
let tri = '#';
for (let index = 1; index < 8; index++) {
    console.log(tri);
    tri += '#';
}
```

## FIZZBUZZ

Write a program that uses `console.log` to print all the numbers form 1 to 100,
with two exceptions. for numbers divisble by 3, print "Fizz" instead of the 
number, and for numbers divisible by 5 (and not 3), print "Buzz" instead.

When one has that working, modify one's program to print "FizzBuzz" for numbers
that are divisible by both `3` and `5` (and still print "Fizz" or "Buzz" for 
numbers divisble by only of those)

(This is actually an interview question that has been claimed to weed out a 
significant percentage of programmer candidates. So if one is able to solve 
it, one can say that one's market value has increased!)

### DISPLAY HINTS: FIZZBUZZ

```js
/* Going over the numbers is clearly a looping job, and selecting what to print is a matter of conditional execution. Remember the trick of using the remainder (%) operator for checking whether a number is divisible by another number (has a remainder of zero).

In the first version, there are three possible outcomes for every number, so you’ll have to create an if/else if/else chain.

The second version of the program has a straightforward solution and a clever one. The simple solution is to add another conditional “branch” to precisely test the given condition. For the clever solution, build up a string containing the word or words to output and print either this word or the number if there is no word, potentially by making good use of the || operator. */
```

my solution:

```js
for (let index = 1; index < 101; index++) {
    if (index % 3 === 0 && index % 5 === 0) {
        console.log(`${index}: FizzBuzz`); 
        continue;   
    }    
    if (index % 3 === 0) {
        console.log(`${index}: Fizz`); 
        continue;   
    }
    if (index % 5 === 0) {
        console.log(`${index}: Buzz`); 
        continue;
    }
    console.log(index);
}
```

<!-- HERE -- fizz buzz exercise +++-->