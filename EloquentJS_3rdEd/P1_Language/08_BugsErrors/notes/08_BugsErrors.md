# C8: BUGS AND ERRORS

>>> "Debugging is twice as hard as writing the code in the first place. Therefore if you write the 
code as cleverly as possible, you are, by definition, not smart enough to debug it."

--Biran Kernighan and P.J. Plauger, *The Elements of Programming Style*

Flaws in computer programs are usually called *bugs*. It makes programmers feel good to imagine 
them as little things that just happen to crawl into our work. In reality, of course, we put them 
there ourselves. 

If a program is crystallized thought, we can roughtly categorize bugs into those caused by the 
thouhts being confused and those caused by mistakes introduced while converting a thought to code. 
The former type is generally harder to diagnose and fix than the latter. 

## LANGAUGE

Many mistakes could be potined out to us automatically by the computer if it knew enough about what 
we're trying to do. But here, JS' looseness is a hindrance. Its concept of bindings and properties is 
vague enough that it will rarely catch typos before actually running the program. Even then, it allows 
one to do some clearly nonsensical things without complaint, such as computing `true * "monkey"`.

There are some things that JS does complain about. Writing a program that does not follow the language's 
grammar will immediately make the computer complain. Other things, such as calling something that's not 
a function or looking up a property on an undefined value, will cause an error to be reported when the 
program tries to perform the action. 

Ofte, however, one's nonsense computation will merely produce `NaN` (not a number) or an undefined 
value, while the program happily continues, convinced that it's doing something meaningful. The mistake 
will manifest itself only later, after the bogus vlaue has traveled through several functions. It might 
not trigger an error at all, but silently cause the program's output to be wrong. Finding the source 
of such problems can be difficult. 

The process of finding mistakes -- bugs -- in programs is called *debugging*. 

## STRICT MODE

JS can be made a *little* stricter by enabling *strict mode*. This can be done by putting the 
string `"use strict"` at the top of a file or a function body. Here's an example:

```js
function canYouSpotTheProblem() {
  "use strict";
  for (counter = 0; counter < 10; counter++) {
    console.log("Happy happy");
  }
}

canYouSpotTheProblem();
// → ReferenceError: counter is not defined
```



<!-- HERE -- use strict... -->