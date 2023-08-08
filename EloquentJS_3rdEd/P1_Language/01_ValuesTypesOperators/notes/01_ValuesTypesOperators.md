# VALUES, TYPES, AND OPERATORS

"Below the surface of the machine, the program moves. Without effort, it expands
and contracts. In great harmony, electrons scatter and regroup. The forms on the
monitor are but ripples on the water. The essence stays invisibly below." >>>
-- Master Yuan-Ma, _The Book of Programming_

Inside the computer's world, there is only data. One can read, modify, and 
create data -- but that which isn't data cannot be mentioned! All this data
is stored as long sequences of bits and is thus fundamentally alike.

_Bits_ are any kind of two-valued things, usually described by zeros and ones.
Inside the computer, they take forms such as high or low electrical charge, a 
strong or weak signal, or a shiny or dull spot on the surface of a CD. Any piece
of discrete information can be reduced to a sequence of zeros and ones and thus
represented in bits.

For example, we can express the number 13 in bits. It works the sam eway as a
decimal number, but instead of 10 different digits, one has onl 2, and the
weight of each increases by a factor of 2 from right to left. Here are the
bits tha tmake up the number 13, with weights of the digits shown below them:

```
0   0   0   0   1   1   0   1
128 64  32  16  8   4   2   1
```

So that's the binary number `00001101`. It's non-zero digits stand for 8,
4, 1 and add up to 13.

## VALUES

Imagine a sea of bits -- an ocean of them. A typical modern computer has more
than 30 billion bits in its volatile data storage (working memory). Non-volatile
storage (the hard disk or equivalent) tends to have yet a few orders of magnitude
more.

To be able to work with such quantities of bits without getting lost, we must 
separate them into chunks that represent pieces of information. In a JS 
environment, those chunks are called _values_. Though all values are made of
bits, they play different roles. Every value has a type that determines its 
role. Some values are numbers, some values are pieces of text, some values are 
functions, and so on.

To create a value, one must merely invoke its name. This is convenient. One
doesn't have to gather building material for one's values or pay for them. One
just calls for one, and _whoosh_, one has it! They are not really created from 
thin air, of course. Every value has to be stored somewhere, and if you want to 
use a gigantic amountof them at the same time, one might run out of memory. 
Fortunately, this is a problem only if one nees them all simultaneously. As
soon as one no longeruses a value, it will dissipate, leaving behind its bits
to be recycled as building material for the next generation of values. 

This chapter introduces the atomic elements of JS programs, tht is, the simple
value types and the operators that can act on such values!

## NUMBERS

Values of the _number_ type are, unsurprisingly, numeric values. In a JS
program, they are written as follows:

```js
13
```

Use that in a program, and it will cause the bit pattern for the number 13
to come into existence inside the computer's memory!

JS uses a fixed number of bits, 64, to store a single number value. There 
are only so many patterns one can make with 64 bits, which means the 
number of different numbers that can be represented is limited. With _N_
decimal digits, one can represent $10^N$ numbers. Similalry, given 64
binary digits, one can represent $2^{64}$ different numbers, which is about
18 quintillion (an 18 with 18 zeros after it)!

Computer memory used to be much smaller, and people tended to use groups of
8 or 16 bits to represent their numbers. It was easy to accidently _overflow_
such small numbers -- to end up with a number that did not fit into the given
number of bits. Today, evne computers that fit in one's pocket have plenty of
memory, so one is free to use 64-bit chunks, and one need to worry about 
overflow when dealing iwth truly astronomical numbers.

Not all whole numbers less than 18 quintillion fit ain a JS number, though.
Those bits also store negative numbers, so one bit indicates he sign of the
number. A bigger issue is that nonwhole number must also be represented. To
do this, some of the bits are used to store the position of the decimal 
point. The actual maximum whole number that can be stored i smore in the
range of 9 quadrillion (15 zeros) -- which is still quite large.

Fractional number are written using a dot:

```js
9.81
```

For very big or very small numbers, on emust also use scientific notation by
adding an _e_ (for _exponent_), followed by the exponent of the number.

```js
2.998e8
```

That is 2.998 x 10^8 = 299,800,000.

Calculations with whole numbers (also called _integers_) samller than the
aforementioned 9 quadrillion are guaranteed to alwasy be precise. Unfortunately,
calculations with fractional number are generally not. Just as $\pi$ (pi) 
cannot be precisely expressed by a finite number of decimal digits, many
numbers lose some precision when only 64 bits are available to store them. 
This is a shame, but it causes practical problems only in specific situaitons.
The important thing is to be aware of it and treat fractional digital numbers
as approximations, not as precise values.

## ARITHMETIC

The main thing to do with numbers is arithmetic. Arithmetic operations such as
addition or multiplication take two number values an dproduce a new number 
from them. Here is what they look like in JS:

```js
100 + 4 * 11
```

The `+` and `*` sign are called _operators_. The first stands for addition;
the second for multiplication. Putting an operator between two values will 
apply it to those values and produce a new value.

But does the example mean "add 4 and 100, and multiply the result by 11,"
or is the multiplication done before the adding? As one might have guessed,
the multiplication happens first. But as in mathematics, one can change this
by wrapping the addition in parentheses.

```js
(100 + 4) * 11
```

For subtraction, there is the `-` operator, and division can be done with the
`/` operator.

When operators appear together without parentheses, the order in which tehy are
applied is determined by the _precedence_ of the operators. The example shows that
multiplication comes before addition. The `/` operator has the same precedence as 
`*`. Likewise for `+` and `-`. When multiple operators with the same precedence 
appear net to each other, as in `1 - 2 + 1`, they are applied left to right:
`(1 - 2) + 1`.

These rules of precedence are not somehting one should worry about. When in doubt, 
just add parentheses. 

There is one more arithmetic operator, which one might not immediately recognize.
The `%` symbol is used to represent the _remainder_ operation. `X % Y` is the
remainder of dividing `X` by `Y`.  For example, `314 % 100` produces `14`, and
`144 % 12` gives `0`. The remainder opertor's precednce is the same as that of
multiplication and division. ONe'll also see this operator referred to as 
_modulo_.

## SPECIAL NUMBERS

There are three special values in JS that are considered numbers but don't behave
like normal numbers.

The first two are `Infinity` and `-Infinity`, which represent the positive and
negative infinities. `Infinity-1` is still `Infinity`, and so on. Don't put too
muc trust in infinitybased computatoin, though.  It isn't mathematically sound, 
will quickly lead to the next special number: `NaN`

`NaN` stands for "not a number", even though it _is_ a vlaue of the number type.
One'll get this result when you, for example, try to calculate `0 / 0` (zero
divided by zero), `Infinity - Infinity`, or any number of other numeric 
operations that don't yield a meaningful result. 

## STRINGS

<!-- HERE -- Strings!+ -->