/* bits are any kind of two-valued things, usually described
by zeros and ones! Inside computer, take forms such as 
high-low electrical charge, strong-weak signal, shiny or 
dull spot on the surface of a CD; any piece of discrete information
can be reduced to a sequence of zeros and ones and thus
be represetned as bits!


13 in bits, similar to decimal, except instead of 10 different
digits, we only have 2, weight of each increases by factor of 2;

13 = 
0*2**7 +
0*2**6 +
0*2**5 +
0*2**4 +
1*2**3 +
1*2**2 +
0*2**1 +
1*2**0

= 00001101 (first column above)
*/

//NUMBERS

/* JS uses a fixed number of bits 64 to
store a single number value. 2**64 which is
18 quintillion -- 18 with 18 zeros after it!

not all whole number less than 18 quintillion fit in a 
JS number -- bits also store negative numbers so one bit
indicates the sign of the number; non-whole numbers also
represented, so some bits used to store decimal! so
actual whole number max is actually 9 quadrillion 
(15 zeros)*/

console.log(`
fractional number: 9.81
scientific notation: 2.998e8 = 2.998*10**8 = 299,800,000
`);

console.log(`
100+4*11 = ${100+4*11}
(100+4)*11 = ${(100+4)*11}
`);

// SPECIAL NUMBERS

/* Infinity, -Infinitiy, represent positive and negative
infinities; Infinity-1 = Infinity! */

console.log(`Infinity - 1 = ${Infinity-1}`);

/* the other special number is NaN which stands for 'not
a number'! still a number type, but is generated whenever
a result is not meaningful: 0/0; Infinity - Infinity!*/