# C4: DATA STRUCTURES: OBJECTS AND ARRAYS

Numbers, Booleans, and strings are the atoms that data structures are
built from. Many types of information require more than one atom, though.
_Objects_ allow us to group values -- including other objects -- to build
more complex structures.

The programs we built so far have been limited by the fact that they
were operating only on simple data types. This chapter will introduce
basic data structures. By the end of it, one'll know enough to start
writing useful programs.

The chapter will work through a more or less realistic programming
example, introducing concepts as tehy apply to the problem at hand.
The example code will often build on functions and bindings that
were introduced earlier in the text.

## THE WERESQUIRREL

Jacques turns into a squirrel and that causes problems. He wants to figure
out why this happens and so he collects data so he can later study 
the data to figure out why the transformations occur. Data structures
allow him to store this information.

## DATA SETS

To work with a chunk of digital data, we first have to find a way to 
represent it in our machine's memory. Sary, for example, that we want
to represent a collection of the numbers 2,3,5,7, and 11. We could 
get creative with strings -- after all, strings can haven any length, 
so we can put a lot of data in them -- an duse `"2 3 5 7 11"` as our
representation. But this is awkward. One'd have to somehow extrac
the digits and convert them back to numbers to access them.

Fortunately, JS provides a data type specifically for storing sequences
of values. It is called an _array_ and is written as a list of values
between square brackets, separated by commas:

```js
let listOfNumbers = [2, 3, 5, 7, 11];
console.log(listOfNumbers[2]);
// → 5
console.log(listOfNumbers[0]);
// → 2
console.log(listOfNumbers[2 - 1]);
// → 3
```

The notation for getting at the elements inside an array 
also uses square brackets. A pair of square brackets immediately after
an expression, with another expression inside of them, will look up
the element in the left-hand expression that corresponds to the _index
give by the expression in the brackets.

The first index of an array ...

<!-- HERE -- data sets -->