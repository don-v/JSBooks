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

<!-- HERE -- ENVIRONMENT-->