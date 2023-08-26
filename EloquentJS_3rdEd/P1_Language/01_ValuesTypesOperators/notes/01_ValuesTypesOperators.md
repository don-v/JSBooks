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

The next basic data type is the _string_. Strings are used to represent text.
They are written by enclosing their content in quotes.

```js
`Down on the sea`
"Lie on the ocean"
'Float on the ocean'
```

One can use single quotes, double quotes, or backticks to mark strings, as
long as the quotes at the start and the end of the string match.

Almost anything can be put between quotes, and JS will make a string value out
of it. But a few characters are more difficult. One can imagine how putting
quotes between quotes might be hard. _Newlines_ (the characters one gets when one 
presses <ENTER>) can be included without escaping only when the string is quotes 
with backticks (```).

To make it possible to include such characters in a string, the following notation 
is used: whenever a backslash (`\`) is ofund inside quoted text, it indicates that
the character after it has a special meaning. This is called _escaping_ the 
character. A quote that is preceded by a backlash will not end the string but 
be part of it. When an `n` character occurs after a backslash, it is interpreted
as a newline. Similarly, a `t` after a backslash means a tab character. Take 
the following string:

```js
"This is the first line\nAnd this is the second"
```

The actual text contained in this:

```
This is the first line
And this is the second
```

There are, of course situations where one wants a backslash in a string to
be just a backslash, not a special code. If two backslashes follow each other, 
they will collapse together, and only one will be left in the resulting string
value. This i show the string _"A newline character is written like "\n"."_
can be expressed:

```js
"A newline character is written like \"\\n\"."
```

Strings, too, have to be modeled as a series of bits to be able to exist inside
the computer. The way JS does this is based on the _Unicode_ standard. This 
standard assigns a number to virtually every character one would ever need, 
including characters from Greek, Arabic, Japanese, Aremenian, and so on. If
we have a number for every character, a string can be described as a sequence of
numbers.

And that's what JS does. But there's a complication: JS' representation uses 16
bits per string per element, which can describe up to 2**16 different characers.
But Unicode defines more than that -- about twice as many, at this point. So some
characters, such as many emoji, take up two "character positions" in JS strings. 
We return to this concept in C5!

Strings cannot be divided, multiplied, or subtracted, but the `+` operator _can_
be used on them. It does not add, but it _concatenates_ -- it glues two strings
together. The following line will produce the string `"concatenate"`:

```js
"con" + "cat" + "e" + "nate"
```

String values have a number of associated functions (_methods_) that can be
used to perform other operations on them. Teach discusses this further in C4!

Strings written with single or double quote behave very much the same -- the only
difference is in which type of quote one needs to escape inside of them.
Backtick-quoted strings, usually called _template literals_, can do a few more tricks.
Apart from being able to span lines, they can embed other values.

```js
`half of 100 is ${100 / 2}`
```

When one writes something inside `${}` in a template literal, it's result will be
computed, converted to a string, and included in the string at that position!. The
example produces `"half of 100 is 50"`.

## UNARY OPERATORS

Not all operators are symbols. Some are written as words. One example is the 
`typeof` operator, which produces a string value naming the type of the value
one gives it.

```js
console.log(typeof 4.5);
// -> number
console.log(typeof "x");
// -> string
```

We will use `console.log` in example code to indicate that we want to see
the result of evaluating something. More about that in the next chapter.

The other operators shown all operated on two values, but `typeof` takes only 
one. Operators that use two values are called _binary_ operators, while those
that take one are called _unary_ operators. The minus operator can be used 
both as a binary operatory and as a unary operator.

```js
console.log(- (10 - 2));
// -> 8
```

## BOOLEAN VALUES

It is often useful to have a value that distinguishes between only two 
possibilities, like "yes" and "no" or "on" and "off". For this purpose,
JS has a _Boolean_ type, which has just two values, `true` and `false`.

### COMPARISON

Here is one way to produce Boolean values:

```js
console.log(3 > 2)
// -> true
console.log(3 < 2 )
// -> false
```

The `>` and `<` signs are the traditional symbols for "is greater than"
and "is less than", respectively. They are binary operators. Applying
them results in a Boolean value that indicates they old true in this
case.

String can be compared in the same way.

```js
console.log("Aardvard" < "Zoroaster")
// -> true
```

The way strings are ordered is roughly alphabetic but not really what
you'd expect to see in a dictionary: uppercase letters are always "less"
than lowercase ones, so `"Z"` < `"a"`, and nonalphabetic characters
(`"!"`, `"-"`, etc.) are also included in the ordeirng. When comparing
strings, JS goes over the characters from left to right, comparing
Unicode codes, one by one.

Othere similar operators are `">="` (greater than or equal to), `"<="`
(less than or equal to), `"=="` (equal to), and `"!="` (not equal to).

```js
console.log("Itchy" != "Scratchy");
// -> true
console.log("Apple" == "Orange");
// -> false
```

There is only one value in JS that is not equal to itself, and that is
NaN ("not a number").

```js
console.log(Nan == Nan);
// -> false
```

`Nan` is supposed to denote the result of a nonsensical computation, and 
as such, it isn't equal to the result of any _other_ nonsensical 
computations.

## LOGICAL OPERATORS

There are also some operations that can be applied to Boolean values 
themselves. JS supports three logical operators: _and_, _or_, and
_not_. These can be used to "reason" about Booleans.

The `&&` operator represents logical _and_. It is a binary operator, 
and its result is true only if both values give to it are true:

```js
console.log(true && false);
// -> false
console.log(true && true);
// -> true
```

The `||` opertor denotes logical _or_. It produces true if either of the 
values given to it is true:

```js
console.log(false || true);
// -> true
console.log(false || false);
// -> false
```

_Not_ is written as an exclamation mark (`!`). It is a unary operator that
flips the value given to it -- `!true` produces `false` and `!false` 
produces true.

When mixing these Boolean operators with arithmetic and other operators, it
is not always obvious when parentheses are needed. In prax, one can usually
get by with knowing that of the operators we have seen so far, `||` has the 
lowest precedence, then comes `&&`, then the comparison operators (`>`, `==`,
and so on), and then the rest. This order has been chosen such that, in typical
expressions like the following one, as few parentheses as possible are necessary:

```js
1 + 1 == 2 && 10 * 10 > 50
```

The last logical operator I will discuss is not unary, not binary, but _ternary_,
operating on three values. It is written with a question mark and a colon, like
this:

```js
console.log(true ? 1 : 2);
// -> 1
console.log(false ? 1 : 2);
// -> 2
```

This one is called the _conditional_ operator (or sometimes just the _ternary_
operator since it is the only such operator in the language). The value on the
left of the question mark "picks" which of the other two values will come out. 
When it is true, it chooses the middle value, and when it is false, it chooses
the value on the right.

## EMPTY VALUES

There are two special values, written `null`, and `undefined`, that are used
to denote the absence of a _meaningful_ value. They are themselves values,
but they carry no information.

Many operations in the language that don't produce a meaningful value (you'll
see some later) yield _undefined_ simply because they have to yield _some_ 
value.

The difference in meaning between _undefined_ and _null_ is an accident of
JS' design, and it doesn't matter most of the tie. In case where one actually
have to concern yourself with these values, I recommend treating them as mostly
interchangeable.

## AUTOMATIC TYPE CONVERSION

In the Introduction, I mentioned that JS goes out of its way to accept almost 
any program one gives it, even programs that do odds things. This is nicely
demonstrated by the following expressions:

```js
console.log(8 * null);
// -> 0
console.log("5" - 1);
// -> 4
console.log("5" + 1);
// -> 51
console.log("five" * 2);
// -> Nan
console.log(false == 0);
// -> true
```

When an operator is applied to the "wrong" type of value, JS will quietly convert
that value to the type it needs, using a set of rules that often aren't what one 
wants to expect. This is called _type coercion_. The _null_ in the first expression
becomes `0`, and teh `"5"` in the second expression becomes `5` (from string to number).
Yet in the third expression, `+` tries string concatenation before numeric addition,
so the `1` is converted to `"1"` (from number to string).

When something that doesn't map to a number in an obvious ways (such as `"five"` or 
`undefined`) is converted to a number, one gets the value `NaN`. Further artithmetic
operations on `NaN` keep producing `NaN`, so if you find yourself getting one of those
in an unexpected place, look for accidental type conversions.

When comparing values of the same type using `==`, the outcome is easy to predict: one 
should get true when both values are the same, except in the case of `NaN`. But when the
type differe, JS uses a complicated and confusing set of rules to determine what to do. 
In most cases, it just tries to convert one of the values to the other value's type. 
However, when `null` or `undefined` occurs on either side of the opeartor, it produces
true only if both side are one of `null` or `undefined`.

```js
console.log(null == undefined);
// -> true
console.log(null == 0);
// -> false
```

That behavior is often useful. When one wants to test whether a value has a real
value instead of `null` or `defined`, one can compare it to `null` with `==`
or (or `!=`) operator.

But what if you want to test whether something refers to the precise vlaue `false?`.
Expressions like `0 == false` and `"" == false` are also true because of automatic
type conversion. When one does _not_ want any type conversions to happen, there are 
two additional operators: `===` and `!==`. The first tests whether a value is 
_precisely_ equal to the other, and the second tests whether it is not precisely 
equal. So `"" === false` is false as expected.

Teach recommend using the three-character comparison operators defensively to prevent
unexpected type conversions from tripping one up. But when you're certain the types
on both sides will be the same, there is no problem with using the shorter operators.

## SHORT-CIRCUITING OF LOGICLAL OPERATORS

The logical operators `&&` and `||` handle values of different types in a peculiar
way. They will convert the value on their left side to Boolean type in order to
decide what to do, but dependingon the operator and the result of that conversion, 
they will return either the _original_ left-hand value or the right-hand value.

The `||` operator, for example, will return the value to its left when
that can be converted to true and will return the value on its right otehrwise. This
has the expected effect when the values are Boolean and does something analogous
for values of other types.

```js
console.log(null || "user");
// -> user
console.log("Agnes" || "user");
// -> Agnes
```

We can use this functionality as a way to fall back on a default value. If one
has a value tha tmight be empty, one can put `||` after it with a replacement value.
If the initial value cna be converted to `false`, one'll get the replacement instead.
The rules for converting strings and number to Boolean values state that `0`, `NaN`,
and the empty string(`""`) count as `false`, while all the other values count as
`true`. So `0 || -1` produces `-1` and `"" || "!?"`. 

The `&&` operator works similarly but the other way around. When the value to
its left is something that converts to false, it returns that value, and otherwise
it returns the value on its right.

Another important property of these two operators is that the part to their right
is evaluated only when necessary. In the case of `true || X`, no matter what `X`
is -- even if it's a piece of a program that does something _terrible_--the result
will be true, and `X` is never evaluated. The same goes for `false && X`, which is
false, and will ignore `X`. This is called _short-circuit evaluation_.

## SUMMARY

We looked at four types of JS values in this chapter: numbers, strings, Booleans,
and undefined values.

Such values are created by typing in their name (`true`, `null`) or value (`13`,
`"abc"`). One can combine and transform values with operators. We saw binary
operators for arithmetic (`+`, `-`, `*`, `/`, and `%`), string concatenation (`+`),
comparison (`==`, `!=`, `===`, `!==`, `<`, `>`, `<=`, `>=`), and logic (`&&`,`||`),
as well as several unary operators (`-`, to negate a number, `!` to negate logically,
and `typeof` to find a value's type) and a ternary operator (`?:`) to pick one of 
values based on a third value.

This gives one enough information to use JS as a pocket calculator but not much 
more. The next chapter will start lying these expression together into basic 
programs.

<!-- HERE -- SUMMARY +-->