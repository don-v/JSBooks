# C12: PROJECT: A PROGRAMMING LANGUAGE

>>> "The evaluator, which determines the meaning of expressions in a programming languge, is just another program." -- Hal Abelson and Gerald Sussman, *Structure and Interpretation of Computer Programs*

Building one's owns programming language is surprisngly easy (as long as one does not aim too high) and very enlightening.

The main thing teach wants to show in this chapter is that there's no magic invovled in building a programming language. Teach has often felt that some human inventions were so immensely clever and complicated that each'd never be able to understand them. But with a little reading and experimenting, they often turn out to be quite mundate.

Teach will help us build a programming language called Egg. It will be a tiny, simple language -- but one that is powerful enough to express any computation one can thik of. It will allow simple abstraction based on functions.

## PARSING

The most immediately visible part of a programming language is its *syntax*, or notation. A *parser* is a program that reads a piece of text and produces a data structure that reflects the structure of the progam contained in that text. If the text does not form a valid program, the parser shoudl point out the error.

'Egg' will have a simple and unifor syntax. Everything in Egg is an expression. An expression can be the name of a bnding, a number, a string, or an *application*. Applications are used for function calls but also for constructs such as `if` or `while`. 

To keep the parser simple, strings in Egg do not supoprt anything like backslash escapes. A string is simply a sequence of characters that are not double quotes, wrapped in double quotes. A number is a sequence of digits. Binding names can consist of any character that is not whitespace and that does ont have a special meaning in the syntax.

Applications are written the way they are in JS, by putting parentheses after an expression and having any number of arguments between those parentheses, separated by commas:

```
do(define(x, 10),
   if(>(x, 5),
      print("large"),
      print("small")))
```

The uniformity of the Egg language means that things that are operators in JS (such as `>`) are normal bindings in this language, applied just like other functions. Since the syntax has no concept of a block, we need a `do` construct to represent doing multiple things in a sequence.

The data structure that the parser will use to describe a program consists of expression objects, each of which has a `type` property indicating the kind of expression it is and other properties to describe its content. 

Expressions of type `"value"` represent literal strings or numbers. Their `value` property contains the string or number value that they represent. Expressiosn of type `"word"` are used for identifiers (names). Such objects have a `name` property that holds the identifier's name as a string. Finally, `"apply"` expressions represent applications. They have an `operator` property that refers to the expression that is being applied, as well as an `args` property that holds an array of argument expressions.

The `>(x, 5)` part of the previous program would be represented like this:

```
{
  type: "apply",
  operator: {type: "word", name: ">"},
  args: [
    {type: "word", name: "x"},
    {type: "value", value: 5}
  ]
}
```

Such a data structure is called a *syntax tree*. If one imagines the objects as dots an dthe links between them as lines between those dots, as shown in the following diagram, the structure has a treelike shape. The fact that expressions contain other expressions, which in turn might contain more expressions, is similar to the wy tree branches split and split again. 

![syntax tree image](../../../to_ignore/12_Project_AProgrammingLanguage/syntax_tree.png)