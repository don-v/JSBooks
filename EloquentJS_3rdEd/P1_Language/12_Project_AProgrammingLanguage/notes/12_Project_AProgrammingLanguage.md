# C12: PROJECT: A PROGRAMMING LANGUAGE

>>> "The evaluator, which determines the meaning of expressions in a programming languge, is just another program." -- Hal Abelson and Gerald Sussman, *Structure and Interpretation of Computer Programs*

Building one's owns programming language is surprisngly easy (as long as one does not aim too high) and very enlightening.

The main thing teach wants to show in this chapter is that there's no magic invovled in building a programming language. Teach has often felt that some human inventions were so immensely clever and complicated that each'd never be able to understand them. But with a little reading and experimenting, they often turn out to be quite mundate.

Teach will help us build a programming language called Egg. It will be a tiny, simple language -- but one that is powerful enough to express any computation one can thik of. It will allow simple abstraction based on functions.

## PARSING

The most immediately visible part of a programming language is its *syntax*, or notation. A *parser* is a program that reads a piece of text and produces a data structure that reflects the structure of the progam contained in that text. If the text does not form a valid program, the parser shoudl point out the error.

'Egg' will have a simple and unifor syntax. Everything in Egg is an expression. An expression can be the name of a bnding, a number, a string, or an *application*. Applications are used for function calls but also for constructs such as `if` or `while`. 

To keep the parser simple, strings in Egg do not supoprt anything like backslash escapes. A string is simply a sequence of characters that are not double quotes, wrapped in double quotes. A number is a sequence of digits. ...

<!-- HERE! -->