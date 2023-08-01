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

Imagine a sea of bits...

<!-- HERE -- values! -->