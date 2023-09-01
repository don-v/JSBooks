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

<!-- HERE -- EXPRESSIONS AND STATEMENTS -->