# INTRODUCTION

This book is about instructing computers and making them do 
what one wants is not always easy!

If one needs to send email or use a calculator, one can 
open an email client application or calculator application,
respectively, to accomplish those tasks. For unique open-ended
tasks, there probably is no application. 

_Programming_ is the act of constructing a _program_ -- a 
set of precise instructions telling a computer what to do.
Because computers are dumb, pedantic beasts, programming is 
fundamentally tedious and frustrating.

Program can be rewarding; it can allow one to do things in
seconds that would otherwise take _forever_ by hand. It is
a way to make one's computer  do things it couldn't do 
before. Provides a wonderful exercise in abstract thinking.

Most programming is done with programming languages. A
_programming language_ is an artificially constructed
language used to instruct computers. Communicating with a
computer borrows heavily from human communication -- computer
languages allow words and phrases to be combined in new
ways, making it possible to express ever new concepts.

1980s, 1990s, BASIC and DOS prompts were the main method of
interacting with computers. These have been replaced wiht 
visual interfaces which are easier to learn, but offer
less flexibility. Computer languages still exist, if one
knows where to look. JS is built in to every browser and
thus available on amost every device.

Goal of this book is to try to make one familiar enough 
with JS so that oen may do useful and amusing things with
it!

# ON PROGRAMMING

Teach will teach basic principles of programming alongside
JS. Programming based on simple and clear fundamental rules;
however, programs built upon these rules tend to become 
complex enough to introduce their own rules and complexity.
One is building a maze, in a way, and one may get lost in it!

Strategy for learning programming:

> When action grows unprofitable, gather information; when 
>information grows unprotifatable, sleep.

-- Ursula K. Leguin, _The Left Hand of Darkness_

A program can be:

1. text typed by a programmer
2. the directing force that makes the computer do what it does
3. data in the computer's memory, that controls actions performed
on the same memory.

Program analagy with 'Machine': lots of separate parts tend to be 
involved, and to make the whole thing tick, we have to consider
the ways in which these parts interconnect and contriute to teh
operation of the whole!

A computer is a physical machine that acts as a host for these
immaterial machines! Computers can only perform simple tasks;
however, they are useful because they can process these simple 
task at an incredibly high speed. A program coan ingeniously 
combine an enormous number of these simple actions to do very 
complictated things.

A program is a building of thought! Without care, a program's
size and complexity will grow out of control, confusing even
the persion who created it. Keeping programs under control is
the main problem of programming. When a program works, it is 
beautiful. The art of programming is the skill of controlling 
complexity. The great program is subdued -- made simple in
its complexity!

A sense of what a good program look like is developed in 
prax, notn learned from a list of rules.

# WHY LANGUAGE MATTERS

In the beginning, at the birth of computing, there were no 
programming languages. Programs look at follows:

[!binary code example]('../../../../to_ignore/00_intro/bin_code.png)

The image above displays a program that adds numbers form 1 to 10
together and prints the result: `1 + 2 + ... + 10 = 55`. It could
run on a simple, hypothetical machine. To program early computers, 
it was necessary to set large arrays of swtiches in the right 
position or punch holes in strips of cardboard and feed them to
the computer. One can probaby imagein how tedious and error-prone
this procedure was. Even writing simple programs requries much
cleverness and discipline. Complex ones were nearly inconceivable.

Of course, manually entering these arcane patterns of bits (the ones
and zeros) did give the programmer a profound sense of being a mighty
wizard. 

Each line of the previous program contains a single instruciton. It
could be written in English like this:

1. Store the number `0` in memory location `0`.
2. Store the number `1` in memory location `1`.
3. Store the value of memory location `1` in memory location `2`.
4. Substract the number `11` form the value in memory locaiton `2`.
5. If the value in memory location `2` is the number `0`, continue
with instruction 9.
6. Add the value of memory location `1` to memory locaiton `0`.
7. Add the number `1` to the value of memory location `1`.
8. Continue with instruction 3.
9. Output the value of memory locaiton 0.

Although that is already more readable than the soup of bits,
it is still rather obscure. Using names instead of numbers for the instructions and memory locaiton helps:

```
Set "total" to 0.
Set "count" to 1.
[loop]
Set "compare" to "count"
Subtract 11 from "compare".
If "compare" is zero, continue at [end].
Add "count" to "total".
Add 1 to "count".
Continue at [loop].
[end]
Output "total".
```

The first two lines give two memory locations their starting values: `total` 
will be used to build up the result of the computation, and `count` will 
keep track of the number that we are currently looking at. The lines using 
`compare` are probably the weirdest ones. The program wants to see whether 
`count` is equal to `11` to decide whether it can stop running. Because our 
hypothetical machine is rather primitive, it can only test whether a number 
is zero an dmakes a decision based on that. So it uses the memory location 
labeled `compare` to compute the value of `count -11` and make a decision
based on that value. The next two lines add the value of `count` to the 
result and increment `count` by `1` every time the the program has
determined that `count` is not yet set to `11`.

Here is the same program written in JS:

```js
let total = 0, count = 1;
while (count <= 10) {
    total += count;
    count += 1;
}
console.log(total);
// -> 55
```

This version gives us a few more improvements. Most important, there
is no need to specify the way we want the program to jump back and
forth anymore. The `while` construct takes care of that. It continues
executing the block (wrapped in braces) below it as long as the 
condition it was given holds. That condition is `count <= 10`, 
which means "_count_ is less than or equal to 10." We no longer have
to create a temporary value and compare that to zero, which was just
an uninteresting detial. Part of the power of programming languages 
is that they can take care of uninterstgin details for us.

At the end of the program, after the `while` contruct finished, 
the `console.log` operation is used to write the result!

Finally, here is what the program could look like if we happened to
have the convenient operations `range` and `sum` avaiable, which 
respectively create a colleciton of numbers wihtin a range and
compute the sum of a collection of numbers:

```js
console.log(sum(range(1,10)));
// -> 55
```

The moral of this story is that the same program can be expressed
in both long and short, unreadable and readable ways. The first
version of the program was extremely obscure, whereas this last one
is almost English: `log` the `sum` of the `range` of numbers from 
1 to 10. (We will see in later chapters how to define operations like
`sum` and `range`.)

A good programming language helpes the programmer by allowing them to
talk about the actions that the computer has to perform on a higher
level. It helps omit details, provides convenient building blocks
(such as `while` and `console.log`), allows you to define your own
building blocks (such as `sum` and `range`), an dmakes those blocks
easy to compose.

## WHAT IS JAVASCRIPT?

JavaScript was introduced in 1995 as a way to add programs to web
pages in the Netscape Navigator browser. The language has since been
adopted by all other major graphical web browsers. It has made modern
web applications possible -- applications with which you can interact
directly without doing a page reload for every action. JavaScript is 
also used in more traditional websites to provide various forms of
interactivtiy and cleverness.

It is important to note that JavaScript has almost nothing to do with
the programming language named Java. The similar name was inspired by
marketing considertions rather than good judgment. When JavaScript was
being introduced, the Java language was being heavily marketed and was
gaining popularity. Someone thought it was a good idea to try ride along
on this success. Now we are stuck with the name.

After its adoption outside of Netsape, a standard documetn was written 
to describe teh way the JavaScript language should work so that the various
pieces of software that claimed to support JavaScript were actually talking
about the same language. This is called the ECMAScript standard, after
the Ecma International organization that did the standardization. In
practice, the terms ECMAScript and JavaScript can be used interchangeably--
they are two names for the same language.

There are those who will say _terrible_ things about JavaScript. Many of
these things are true. When I was required to write something in JavaScript
for the first time, I quickly came to despise it. It would accept almost 
anything I typed but interpret it in a way that was completely different 
from what I meant. This had a lot to do with the fact that I did not have 
a clue what I was doing, of course, but here is a rel issue here: 
JavaScript is ridiculously liberal in what it allows. The idea behind this
design was that it would make programming in JavaScript easier for beginners. 
In actuality, it mostly makes findings problems in your programs harder 
because the system will not point them out to you.

This flexibility also has its advantges, though. It leaves space for a lot
of techniques that are impossible in more rigid languages, and as one will
see (for example in C10), it can be used to overcome some of JS'
shortcomings. 

There have been several JS versions. ECMAScript version 3 was the widely 
supported version in the time of JS' ascent to dominance, roughly between
2000 and 2010. Ambitious version 4 was attempted, but politically diffiuclt, 
so it was abandoned in 2008, which lead to a less ambitious v5 in 2009. v6
came out in 2016, which included many updated originally planned for v4.

The fact that the language is evolving means that browsers have to constantly
keep up, and if one is using an older browser, it may not support every. The
language designers are careful to not make any changes that could break
existing programs, so new browsers can still run old programs. In this
book, teach uses the JS version from 2017!

<!-- HERE -- what is javascript! -->

