# REGULAR EXPRESSIONS

"Some people, when confronted with a prolem, thik 'I know, I'll use regular expressions.' Now 
they have two problem." -- James Zawinski

"When you cut against the grain of the wood, much strength is needed. When you program 
against the grain of the problem, much code is needed." -- Maser Yuan-Ma, *The Book of Programming*

Programming tools and techniques survive and spread in a chaotic, evolutionary way. It's not always 
the best or most brilliant ones that win, but rather the ones that function well enough within 
the right niche or that happen to be integrated with another successful piece of technology. 

In this chapter, teach will discuss one such tool, *regular expressions*. Regular expressions 
are a way to describe patterns in string data. They form a small, separate language that is part 
of JS and many other languages and systems. 

Regular expressions are both terribly awkward and extremely useful. Their syntax is cryptic 
and the programming interface JS provides for them is clumsy. But they are a powerful tool for 
inspecting and processing strings. Properly understanding regular expressions will make you a more 
effective programmer. 

## CREATING A REGULAR EXPRESSION

A regular expression is a type of object. It can be either constructed with the `RegExp` constructor 
or written as a literal by enclosing the pattern in forward slash (`/`) characters:

```js
let re1 = new RegExp("abc");
let re2 = /abc/;
```

Both of the regular expression objects above represent the same pattern: an *a* character 
followed by a *b* followed by a *c*. 

When using the `RegExp` constructor, the pattern is written as a normal string, so the 
usual rules apply for backslashes. 

The second notnation, where the pattenr appears between slash characters, treats backslashes 
somewhat differently. First, since a forward slash ends the pattern, we need to put a 
backslash before any forward slash that we want to be *part* of the pattern. In addition, 
backslashes that aren't part of special character codes (like `\n`) will be *preserved*, 
rather than ignored as they are in strings, and change the meaning of the pattern. Some 
characters, such as question amrkes and plus signs, have speical meanings in regular 
expressions and must be preceded by a backslash if they are meant to represent the character
itself:

```js
let aPlus = /A\+/;
```

## TESTING FOR MATCHES

Regular expression objects have a number of methods ...

<!-- HERE -- testing for matches -->