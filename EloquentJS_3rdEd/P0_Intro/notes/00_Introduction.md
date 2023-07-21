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
labeled `compare` to compute the value of `count -11`. ...

<!-- HERE -- binary code view! -->

