# C12: PROJECT: A PROGRAMMING LANGUAGE

>>> "The evaluator, which determines the meaning of expressions in a programming languge, is just another program." -- Hal Abelson and Gerald Sussman, *Structure and Interpretation of Computer Programs*

Building one's owns programming language is surprisngly easy (as long as one does not aim too high) and very enlightening.

The main thing teach wants to show in this chapter is that there's no magic invovled in building a programming language. Teach has often felt that some human inventions were so immensely clever and complicated that teach'd never be able to understand them. But with a little reading and experimenting, they often turn out to be quite mundate.

Teach will help us build a programming language called Egg. It will be a tiny, simple language -- but one that is powerful enough to express any computation one can thik of. It will allow simple abstraction based on functions.

## PARSING

The most immediately visible part of a programming language is its *syntax*, or notation. A *parser* is a program that reads a piece of text and produces a data structure that reflects the structure of the progam contained in that text. If the text does not form a valid program, the parser should point out the error.

'Egg' will have a simple and uniform syntax. Everything in Egg is an expression. An expression can be the name of a bnding, a number, a string, or an *application*. Applications are used for function calls but also for constructs such as `if` or `while`. 

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

Contrast this to the parser teach wrote for the configuration file format in *C9*, which had a simple structure: it split the input into lines and handled those liens one at a time. There were only a few simple forms that a line was allowed to have.

Here we must find a different approach. Expressions are not separated into lines, and they have a recursive structure. Applicaiton expressions *contain* other espressions.

Fortunately, this problem can be solved very well by writing a parser ufnction that is recursive in a way that reflects the recursive nature of the language.

Teach defines a funciton `parseExpression` that takes a string input. It returns an object containing the data structure for the expression at the start of the string, along with the part of the string left after parsing this expression. When parsing subexpressions (the argument to an application, for example), this function can be called again, yielding the argument expression as well as the text that reamins. This text may in turn contain more arguments or may be the closing parenthesis that ends the list of arguments.

This is the first part of the parser:

```js
function parseExpression(program) {
  program = skipSpace(program);
  let match, expr;
  if (match = /^"([^"]*)"/.exec(program)) {
    expr = {type: "value", value: match[1]};
  } else if (match = /^\d+\b/.exec(program)) {
    expr = {type: "value", value: Number(match[0])};
  } else if (match = /^[^\s(),#"]+/.exec(program)) {
    expr = {type: "word", name: match[0]};
  } else {
    throw new SyntaxError("Unexpected syntax: " + program);
  }

  return parseApply(expr, program.slice(match[0].length));
}

function skipSpace(string) {
  let first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}
```

Because Egg, like JS, allows any amount of whitespace between its elements, we have to repeatedly cut the whitespace off the start of teh program string. The `skipSpace` function helps with this. 

After skipping any leading space, `parseExpression` uses three regular expressions to spot the three atomic elmeents that Egg supports: strings, numbers, and words. The parser constructs a different kind of data structure depending on which expression matches. If the input does not match one of these three forms, it is not a valid expression, and the parser throws an error. We use the `SyntaxErro` constructor here. This is an exception class defined by the standard, like `Error`, but more specific.

We then cut off the part that was matched from the program string and pass that, along with the object for the expression, to `parseApply`, which checks whether the expression is an application. If so, it parses a parenthesized list of arguments.

```js
function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] != "(") {
    return {expr: expr, rest: program};
  }

  program = skipSpace(program.slice(1));
  expr = {type: "apply", operator: expr, args: []};
  while (program[0] != ")") {
    let arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ",") {
      program = skipSpace(program.slice(1));
    } else if (program[0] != ")") {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }
  return parseApply(expr, program.slice(1));
}
```

If the next character in the program is not an opening parentesis, this is nto an application, and `parseApply` returns the expression it was given. Otherwise, it skps the opening parenthesis and creates the syntax tree boject for this application expression. It then recursively calls `parseExpression` to parse each argument until a closing parenthesis is found. The recursion is indirect, through `parseApply` and `parseExpression` calling each other.

Because an application expression can itself be applied (such as in `multiplier(2)(1)`), `parseApply` must, after it has parsed an application, call itself again to check whether another pair of parentheses follow.

This is all we need to parse 'Egg'. We wrap it in a conveient `parse` function that verifies that it has reached the end of the input string after parsing the expression (an Egg program is a single expression), and that gives us the program's data structure:

```js
function parse(program) {
  let {expr, rest} = parseExpression(program);
  if (skipSpace(rest).length > 0) {
    throw new SyntaxError("Unexpected text after program");
  }
  return expr;
}

console.log(parse("+(a, 10)"));
// → {type: "apply",
//    operator: {type: "word", name: "+"},
//    args: [{type: "word", name: "a"},
//           {type: "value", value: 10}]}
```

It works! It doens't give us very helpful information when it fails and doesn't store the line and column on which each expression starts, which might be helpful when reporting errors later, but it's good enough for our pursposes!

## THE EVALUATOR

What can we do with the syntax tree for a program? Run it, of course! And that is what the evaluator does. One gives it a syntax tree and a scope object that associates names with values, and it will evaluate the expression that the tree represents and returns the value that this produces.

```js
const specialForms = Object.create(null);

function evaluate(expr, scope) {
  if (expr.type == "value") {
    return expr.value;
  } else if (expr.type == "word") {
    if (expr.name in scope) {
      return scope[expr.name];
    } else {
      throw new ReferenceError(
        `Undefined binding: ${expr.name}`);
    }
  } else if (expr.type == "apply") {
    let {operator, args} = expr;
    if (operator.type == "word" &&
        operator.name in specialForms) {
      return specialForms[operator.name](expr.args, scope);
    } else {
      let op = evaluate(operator, scope);
      if (typeof op == "function") {
        return op(...args.map(arg => evaluate(arg, scope)));
      } else {
        throw new TypeError("Applying a non-function.");
      }
    }
  }
}
```

The evaluator has code for each of the expression types. A literal value expression produces its value. (For example, the expression `100` evaluates to the number 100.) For a binding, one must check whether it is actually defined in the scope and, if it is, fetch the binding's value.

Applications are more involved. If they are a special form, like `if`, we do not evaluate anything -- we just <?> and pass the argument expression, along with the scope, to the function that handles this form. If it is a normal call, we evaluate the operator, verify that it is a function, and call it with the evaluated arguments.

We use plain JS function values to represent Egg's function values. We will come back to this later, when the special form `fun` is defined.

The recursive structure of `evaluate` resembles the structure of the parse, and both mirror the stricture of the language itself. It would also be possible to combine the parser and the evaluator into one function and evaluate during parsing, but splitting them up this way makes the program clearer and more flexible.

This is really all that's needed to interpret Egg. It's that simple. But without defining a few special forms and adding some useful values to the environment, one can't do much with this language yet.

## SPECIAL FORMS

The `specialForms` object is used to define special syntax in Egg. It associates words with functions that evaluate to such forms. It is currently empty. Let's add `if`:

```js
specialForms.if = (args, scope) => {
  if (args.length != 3) {
    throw new SyntaxError("Wrong number of args to if");
  } else if (evaluate(args[0], scope) !== false) {
    return evaluate(args[1], scope);
  } else {
    return evaluate(args[2], scope);
  }
};
```

Egg's `if` construct expects exactly three arguments. It will evaluate the first, and if the result isn't the value of `false`, it will evaluate the second. Othewise, the third gets evaluated. This `if` form is more similar to JS's ternary `?:` operator than to JS's `if`. It is an expression, not a statement, and it produces a value -- namely, the result of the second or third argument.

Egg also differs from JS in how it handles the condition value to `if`. It will treat only the value `false` as false, not things like zero or the empty string.

The reason we need to represent `if` is a special form rather than a regular function is that all arguments to functions are evaluated before the function is called, wheras `if` should evaluates only *either* its second or its third argument, depneding on the value of the first.

The `while` form is similar:

```js
specialForms.while = (args, scope) => {
  if (args.length != 2) {
    throw new SyntaxError("Wrong number of args to while");
  }
  while (evaluate(args[0], scope) !== false) {
    evaluate(args[1], scope);
  }

  // Since undefined does not exist in Egg, we return false,
  // for lack of a meaningful result
  return false;
};
```

Another basic building block is `do`, which executes all its arguments form top to bottom. Its value is the value produced by the last argument.

```js
specialForms.do = (args, scope) => {
  let value = false;
  for (let arg of args) {
    value = evaluate(arg, scope);
  }
  return value;
};
```

To be able to create bindings and give them new values, we also create a form called `define`. It expects a word as its first argument and an expression producing the value to assign to that word as its second argument. Since `define`, like everything, is an expression, it must return a value. We'll make it return the value that ws assigned (just like JS's `=` operator):

```js
specialForms.define = (args, scope) => {
  if (args.length != 2 || args[0].type != "word") {
    throw new SyntaxError("Incorrect use of define");
  }
  let value = evaluate(args[1], scope);
  scope[args[0].name] = value;
  return value;
};
```

## THE ENVIRONMENT

The scope accepted by `evaluate` is an object with properties whose names correspond to binding names and whose values correspond to the values those bindings are bound to. Let's define an object to represent the global scope.

To be able to use the `if` construct just defined, one must have access to Boolean values. Since there are only two Boolean values, we do not need special syntax for them. We simply bind two names to the value `true` and `false` and use them.

```js
const topScope = Object.create(null);

topScope.true = true;
topScope.false = false;
```

We can now evaluate a simple expression that negates a boolean value.

```js
let prog = parse(`if(true, false, true)`);
console.log(evaluate(prog, topScope));
// → false
```

To supply basic arithmetic and comparison operators, we will also add some function values to the scope. In the interst of keepign the code short, we'll use `Function` to synthesize a bunch of operator functions in a loop instead of defining them individually:

```js
for (let op of ["+", "-", "*", "/", "==", "<", ">"]) {
  topScope[op] = Function("a, b", `return a ${op} b;`);
}
```

It is also useful to have a way to output values, so we'll wrap `console.log` in a function and call it `print`:

```js
topScope.print = value => {
  console.log(value);
  return value;
};
```

That gives us enough elementary tools to write simple programs. The following function provides a convenient way to parse a program and run it in a fresh scope:

```js
function run(program) {
  return evaluate(parse(program), Object.create(topScope));
}
```

We'll use object prototype chains to represent nested scopes so that the program can add bindings to its local scope without changing the top-level scope:

```js
run(`
do(define(total, 0),
   define(count, 1),
   while(<(count, 11),
         do(define(total, +(total, count)),
            define(count, +(count, 1)))),
   print(total))
`);
// → 55
```

This is the program we've seen several times before that computes the sum of the numbers 1 to 10, expressed in Egg. It is clearly uglier than the equivalent JavaScript program -- but not bad for a language implemented in fewer than 150 lines of code.

## FUNCTIONS

A programming without functions is a poor programming langauge indeed. Fortunately, it isn't hard to add a `fun` construct, which treates its last argument as the function's body an dused all arguments before that as the names of the function's parameters.

```js
specialForms.fun = (args, scope) => {
  if (!args.length) {
    throw new SyntaxError("Functions need a body");
  }
  let body = args[args.length - 1];
  let params = args.slice(0, args.length - 1).map(expr => {
    if (expr.type != "word") {
      throw new SyntaxError("Parameter names must be words");
    }
    return expr.name;
  });

  return function(...args) {
    if (args.length != params.length) {
      throw new TypeError("Wrong number of arguments");
    }
    let localScope = Object.create(scope);
    for (let i = 0; i < args.length; i++) {
      localScope[params[i]] = args[i];
    }
    return evaluate(body, localScope);
  };
};
```

Functions in Egg get their own local scope. The function produced by the `fun` form creates this local scope and adds the argument bindings to it. Itthen evaluates the function body in this scope and returns the result.

```js
run(`
do(define(plusOne, fun(a, +(a, 1))),
   print(plusOne(10)))
`);
// → 11

run(`
do(define(pow, fun(base, exp,
     if(==(exp, 0),
        1,
        *(base, pow(base, -(exp, 1)))))),
   print(pow(2, 10)))
`);
// → 1024
```

## COMPILATION

What we have built is an interpreter. During evaluation, it acts directly on the representatioan of the program produced by the parser.

*Compilation* is the process of adding another step between the parsing and the runnign of a program, which transforms the program into something that can be evaluated more efficiently by doing as much work as possible in advance. For example, in well-designed languages it is obvious, for each use of a binding, which binding is being referred to, without actually running the program. This can be used to avoid looking up the binding by name eveyr time it is accessed, instead directlyl fetching it form some pretermined memory location. 

Traditionally, compilation invovles converting the program to machine code, the raw format that a computer's processor can execute. But any process that converts a program to a different representation can be thought of as a compilation.

It would be impossible to write an alternative evaluation strategy for Egg, one that first converts the program to a JS program, uses `Function` to invoke the JS compiler on it, and runs the result. When done right, this would make Egg run very fast while still being quite simple to implement.

If one is interested in this topic nd willing to spend some time on it, teach encourages one to try to implement such a compiler as an exercise.

## CHEATING

When teach defined `if` and `while`, one probably noticed that they were more or less trivial wrappers around JS's own `if` and `while`. Similarly, the values in'Egg' are just regular old JS values. Bridging teh gap to a more primitive system, such as the machine code the processor understands, takes more effort -- but the way it works resembles waht we are doign here.

Though the toy language in this chapter doens't do anything that couldn't be done better in JS, there *are* situations where writing small languaes helps get real works done.

Such a language does not have to resember a typical programming language. If JS didn't come equipped with regular epressions, for example, one could write one's own parser and evluateor for regular expresisons. 

Or imagine one one is building a program that makes it possible to quickly create parsers by providing a logical description of the languagethey need to parse. One could define a specific notation for that, and a compiler that compiles it to a parser program. 

```
expr = number | string | name | application

number = digit+

name = letter+

string = '"' (! '"')* '"'

application = expr '(' (expr (',' expr)*)? ')'
```

This is what is usually called a *domain-specific language*, a language tailored to express a narrow domain of knowledge. Such a language can be more expressive than a general-purpose language because it is designed to describe exactly the things that need to be described in its domain and nothing else.

## EXERCISES

#### PROMPT1

explain this JavaScript code: 

```JavaScript
function parseExpression(program) {
  program = skipSpace(program);
  let match, expr;
  if (match = /^"([^"]*)"/.exec(program)) {
    expr = {type: "value", value: match[1]};
  } else if (match = /^\d+\b/.exec(program)) {
    expr = {type: "value", value: Number(match[0])};
  } else if (match = /^[^\s(),#"]+/.exec(program)) {
    expr = {type: "word", name: match[0]};
  } else {
    throw new SyntaxError("Unexpected syntax: " + program);
  }

  return parseApply(expr, program.slice(match[0].length));
}
```

#### RESPONSE1

This JavaScript function, typically found in chapters building a parser (like in Eloquent JavaScript for the "Egg" programming language), is responsible for parsing the first expression found in a string of code.

It identifies whether the expression is a string literal, a number, or a word (like a variable name or function identifier), converts it into an Abstract Syntax Tree (AST) node, and then hands off the rest of the parsing to another function (parseApply).
Step-by-Step Breakdown
1. Skipping Whitespace
```JavaScript

program = skipSpace(program);
```
    What it does: Calls a helper function (skipSpace) to remove any leading spaces, tabs, or newlines from the beginning of the program string so that parsing starts cleanly on a meaningful character.

2. Pattern Matching via Regular Expressions

The function uses an if...else if...else chain with Regular Expressions (.exec()) to check what kind of token the code starts with. If a match is found, match[0] contains the matched text, and match[1] (if capturing groups are used) contains specific captured data.

    String Literals:
```JavaScript

    if (match = /^"([^"]*)"/.exec(program)) {
      expr = {type: "value", value: match[1]};
    }
```
        Matches: Text enclosed in double quotes (e.g., "hello").

        Result: Creates an AST node of type: "value" holding the string content inside the quotes (match[1]).

    Numbers:
```JavaScript

    else if (match = /^\d+\b/.exec(program)) {
      expr = {type: "value", value: Number(match[0])};
    }
```
        Matches: One or more digits followed by a word boundary (e.g., 42).

        Result: Creates an AST node of type: "value", converting the matched string into an actual JavaScript number using Number().

    Words (Identifiers / Keywords):
```JavaScript

    else if (match = /^[^\s(),#"]+/.exec(program)) {
      expr = {type: "word", name: match[0]};
    }
```
        Matches: A sequence of characters that are not whitespace, parentheses, commas, hash signs, or quotes. This captures variable names or function names (e.g., x, sum, if).

        Result: Creates an AST node of type: "word" with a name property holding the identifier.

    Syntax Errors:
```JavaScript

    else {
      throw new SyntaxError("Unexpected syntax: " + program);
    }
```
        What it does: If the string doesn't match any of the valid starting patterns, it throws an error halting execution.

3. Continuing the Parse
```JavaScript

return parseApply(expr, program.slice(match[0].length));
```
    What it does: Once the primary expression object (expr) is built, it slices off the part of the string that was just successfully parsed (program.slice(match[0].length)) and passes both the expression and the remaining string to parseApply. This handles syntax like function calls (e.g., sum(1, 2)).

#### PROMPT2

explain each regular expression, and also how the match groups work

#### RESPONSE2

##### 1. Detailed Breakdown of Each Regular Expression

Each regular expression (regex) in the function uses the caret `^` anchor, which ensures that the match must occur at the very beginning of the `program` string.

* **String Literal Regex**: `/^"([^"]*)"/`

  * `^`: Asserts the start of the string.
  
  * `"`: Matches a literal opening double quote.
  
  * `([^"]*)`: This is a capturing group. It matches zero or more characters (`*`) that are not a double quote (`[^"]`).
  
  * `"`: Matches the literal closing double quote.*Purpose*: Captures string values like `"hello world"`.
  
  * **Number Regex**: `/^\d+\b/`
  
    * `^`: Asserts the start of the string.
    
    * `\d+`: Matches one or more digits (`0` through `9`).
    
    * `\b`: A word boundary. This ensures that the number isn't just the prefix of a larger invalid word (e.g., matching just `42` out of `42x`).
    
    * *Purpose*: Captures numeric values like `42` or `3.14` (though `\d+` handles the integer portion).
    
  * **Word Regex**: `/^[^\s(),#"]+/`
  
    * `^`: Asserts the start of the string.
    
    * `[^\s(),#"]+`: A negated character set inside brackets `[...]` with a plus sign `+` (meaning "one or more times"). It matches **any character except**:
    
      * `\s` (whitespace, spaces, tabs, newlines)
      
      * `(` or `)` (parentheses)
      
      * `,` (commas)
      
      * `#` (comments, often used in this specific toy language)
      
      * `"` (double quotes)
      
    * *Purpose*: Captures identifiers, variable names, or operator symbols like `x`, `sum`, or `+`.
    
##### 2. How Match Groups Work Here

In JavaScript, when you use regular expression methods like `.exec()`, the return value is an array-like object (referred to as `match` in your code) containing details about the match.

  * `match[0]` **(The Full Match)**:
  
  Regardless of parentheses, index `0` always contains the **entire substring** that matched the full regular expression pattern.
  
    * *Example*: If `program` is `"hello" + 5`, running the string regex results in:
    
      `match[0]` $\rightarrow$ `'"hello"'` (including the outer quotes).
      
    * This is why the code uses `match[0].length` to slice off the exact portion of the string that was just processed.
  
  * `match[1]` **and Beyond (Capturing Groups)**:
  
  Parentheses `()` in a regular expression create **capturing groups**. They tell JavaScript to remember the specific slice of text that matched only what is inside those parentheses.
  
    * *Example*: For the string regex `/^"([^"]*)"/`, the capturing group `([^"]*)` isolates everything inside the quotes. If program is `"hello"`, then:
    
      * `match[0]` $\rightarrow$ `'"hello"'`
      
      * `match[1]` $\rightarrow$ `'hello'` (the quotes are stripped away).
      
    * This allows the code to assign `expr = {type: "value", value: match[1]}` so the resulting AST node stores the raw string value *without* the literal quote characters.

#### PROMPT3

explain the following JavaScript code: 

```js
function parseApply(expr, program) {
  program = skipSpace(program);
  if (program[0] != "(") {
    return {expr: expr, rest: program};
  }

  program = skipSpace(program.slice(1));
  expr = {type: "apply", operator: expr, args: []};
  while (program[0] != ")") {
    let arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpace(arg.rest);
    if (program[0] == ",") {
      program = skipSpace(program.slice(1));
    } else if (program[0] != ")") {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }
  return parseApply(expr, program.slice(1));
}
```

#### RESPONSE4

This JavaScript code is part of a parser for a custom programming language (specifically, the "Egg" language from the book Eloquent JavaScript).

The `parseApply` function is responsible for parsing function applications (or expression applications), which look like function calls, such as `sum(1, 2)` or chained calls like `f(x)(y)`. It takes an existing expression (`expr`) and the remaining code string (`program`), returning an updated Abstract Syntax Tree (AST) node.
Step-by-Step Breakdown
1. Checking for an Application
```JavaScript

program = skipSpace(program);
if (program[0] != "(") {
  return {expr: expr, rest: program};
}
```

    `skipSpace(program)`: Removes any leading whitespace from the code string.

    The check `(!= "(")`: If the next character is not an opening parenthesis, it means the current expression is not being followed by a function call. The function simply returns the current expression as-is along with the remaining unparsed code.

2. Initializing the Application Node
```JavaScript

program = skipSpace(program.slice(1));
expr = {type: "apply", operator: expr, args: []};
```

    If the code does start with an `(`, it means we are dealing with an application.

    `program.slice(1)` strips away the opening parenthesis.

    It transforms the current `expr` into an AST node of type `"apply"`. The original expression becomes the `operator` (the thing being called), and an empty `args` array is created to hold the arguments.

3. Parsing Arguments Inside the Parentheses
```JavaScript

while (program[0] != ")") {
  let arg = parseExpression(program);
  expr.args.push(arg.expr);
  program = skipSpace(arg.rest);
  if (program[0] == ",") {
    program = skipSpace(program.slice(1));
  } else if (program[0] != ")") {
    throw new SyntaxError("Expected ',' or ')'");
  }
}
```

    `while (program[0] != ")")`: Loops through the code until it hits the closing parenthesis ).

    `parseExpression(program)`: Parses the individual argument expression.

    `expr.args.push(arg.expr)`: Adds the newly parsed argument to our application's argument list.

    Comma & Error Handling:

        If the next character is a comma (`,`), it consumes it and moves on to the next argument.

        If it's neither a comma nor a closing parenthesis, it throws a `SyntaxError` because the syntax is malformed.

4. Handling Chained Applications (Recursion)
```JavaScript

return parseApply(expr, program.slice(1));
```

    Once the loop finishes, it strips off the closing parenthesis `)` using `program.slice(1)`.

    Recursion: It calls `parseApply` again with the new `expr` node. This handles chained applications (e.g., `f(1)(2))`, where the result of the first call is immediately treated as an operator for a second call.


#### PROMPT4

explain this code: 

```JS
const specialForms = Object.create(null);

function evaluate(expr, scope) {
  if (expr.type == "value") {
    return expr.value;
  } else if (expr.type == "word") {
    if (expr.name in scope) {
      return scope[expr.name];
    } else {
      throw new ReferenceError(
        `Undefined binding: ${expr.name}`);
    }
  } else if (expr.type == "apply") {
    let {operator, args} = expr;
    if (operator.type == "word" &&
        operator.name in specialForms) {
      return specialForms[operator.name](expr.args, scope);
    } else {
      let op = evaluate(operator, scope);
      if (typeof op == "function") {
        return op(...args.map(arg => evaluate(arg, scope)));
      } else {
        throw new TypeError("Applying a non-function.");
      }
    }
  }
}
```

#### RESPONSE

This code is the core evaluation engine for a custom interpreter (typically from the "Project: An Egg Language" chapter in Eloquent JavaScript). It takes a parsed expression tree (an Abstract Syntax Tree, or AST) and executes it within a given environment (scope).

Here is a breakdown of how it works, section by section:
Key Components

    specialForms: An object created with Object.create(null) (meaning it has no default prototype properties like toString). It is used to store syntactic forms that need custom evaluation rules, such as if, while, or define (where arguments shouldn't always be evaluated immediately).

    evaluate(expr, scope): The recursive function that processes different types of expression nodes.

Step-by-Step Breakdown
1. Literal Values
```JavaScript

if (expr.type == "value") {
  return expr.value;
}
```
    What it does: If the expression is a primitive value (like a number or a string, e.g., 42 or "hello"), it simply returns that value directly.

2. Words / Variables
```JavaScript

} else if (expr.type == "word") {
  if (expr.name in scope) {
    return scope[expr.name];
  } else {
    throw new ReferenceError(`Undefined binding: ${expr.name}`);
  }
}
```
    What it does: If the expression is a variable name (word), it checks if that variable exists in the current scope (environment).

    Outcome: If found, it returns the variable's value; otherwise, it throws a ReferenceError.

3. Function Applications / Operations
```JavaScript

} else if (expr.type == "apply") {
  let {operator, args} = expr;
  if (operator.type == "word" &&
      operator.name in specialForms) {
    return specialForms[operator.name](expr.args, scope);
  } else {
    let op = evaluate(operator, scope);
    if (typeof op == "function") {
      return op(...args.map(arg => evaluate(arg, scope)));
    } else {
      throw new TypeError("Applying a non-function.");
    }
  }
}
```

    What it does: This handles function calls or syntactic constructs. It destructures the expression into an operator and its args (arguments).

    Special Forms Check: If the operator is a word that matches a registered special form (like an if statement), it executes that special form's custom logic, passing it the raw arguments and scope.

    Standard Evaluation: If it's a regular function call:

        It evaluates the operator to get the actual function.

        It evaluates every argument in args using .map(...).

        It calls the function using the spread operator (...) with the evaluated arguments.

        If the operator isn't actually a function, it throws a TypeError.

    Summary: This function acts as the brain of a mini-language interpreter, deciding whether to return literal data, look up variables, execute special syntax, or evaluate and run standard functions.

Would you like to see an example of how specialForms or a sample scope object would be plugged into this function?

#### PROMPT
explain all of the syntax in the following JavaScript code: ```module.exports = function(...args) { for (let arg of args) (1,eval)(require("fs").readFileSync(__dirname + "/../" + arg, "utf8")) }```

#### RESPONSE
Here is the explanation of the syntax used in your JavaScript code snippet.
This code is written for Node.js (a JavaScript runtime). Its purpose is to read multiple local files dynamically and execute their contents as JavaScript code in the global scope.
## Code Breakdown

```js
module.exports = function(...args) {
```

* module.exports: This is a Node.js-specific global object used to export code from a file so it can be imported and reused in other files using require(). Here, it is assigning a function as the default export.
* function(...args): This defines an anonymous function. The ...args syntax is a rest parameter. It gathers all arguments passed into the function and places them into a single array named args.

------------------------------
```js
  for (let arg of args)
```

* for (let arg of args): This is a for...of loop. It iterates over each item in the args array. In each loop iteration, the variable arg holds the value of the current file path string. Notice there are no curly braces {} following the loop; this means the loop will only execute the single statement directly beneath it.

------------------------------

```js
    (1,eval)(require("fs").readFileSync(__dirname + "/../" + arg, "utf8"))
```
This line contains the core logic and is broken down into two main parts: finding the file content, and executing it.
1. Locating and Reading the File:

* `require("fs")`: Imports Node.js's built-in File System (`fs`) module, which allows the script to interact with the computer's files.
* `.readFileSync(...)`: A synchronous method belonging to the `fs` module that reads the entire contents of a file. It pauses code execution until the file is fully read.
* `__dirname`: A Node.js environment variable that contains the absolute path of the directory where the current script file lives.
* `+ "/../" + arg`: Uses string concatenation to build a file path. It starts at `__dirname`, goes up one directory level (`/../`), and appends the file name or relative path stored in `arg`.
* `"utf8"`: The second argument passed to `readFileSync`. It specifies the character encoding. Without this, the method returns a raw buffer of binary data; with it, it returns the file contents as a readable text string.

2. Executing the File Content:

* `(1,eval)`: This is a JavaScript trick known as an indirect eval call.
* The comma `,` is the comma operator. It evaluates each of its operands from left to right and returns the value of the last operand. So, `(1, eval)` simply returns the global eval function.
   * Why use it? In JavaScript, calling `eval()` directly executes code within the local scope of the function. However, using an indirect call like `(1, eval)()` forces the evaluated code to execute in the global scope instead. This prevents the code inside the read files from messing with or accessing the variables inside this specific loader function.
* `(...)`: The final set of parentheses immediately invokes the function returned by `(1, eval)`, passing the file's text string into it to be executed as active JavaScript.

#### PROMPT
so let's say I have a file named *main.js*. I want to use this code and store it in a file named *load.js* that you just explained to load other JavaScript code from another file *to_be_loade.js*. Basically, I want to run the `main.py` script with node from the command line, but I want to ensure that `to_be_loaded.js` is available to the `main.js` file during execution.


#### RESPONSE
To make this setup work, the ../ in your load.js syntax means that load.js must live inside a subdirectory (like a utils folder) so that it looks upward into the main project folder to find to_be_loaded.js.
Here is the exact file structure and code required to run this successfully.
## 1. Directory Structure
Create a project folder with the following layout:

```
my-project/
├── main.js
├── to_be_loaded.js
└── utils/
    └── load.js
```
------------------------------
## 2. File Contents## utils/load.js
This contains the exact utility code you provided.

```JS
module.exports = function(...args) {
  for (let arg of args)
    (1,eval)(require("fs").readFileSync(__dirname + "/../" + arg, "utf8"))
}
```

## to_be_loaded.js
This is the file you want to inject. Because load.js uses an indirect eval, any variables or functions declared here will become globally accessible.

```JS
// Variables and functions automatically become global via indirect evalvar sharedMessage = "Success! to_be_loaded.js has been executed.";
function sayHello() {
  console.log("Hello from the injected script!");
}
```

## main.js
This is your entry point. It imports the loader, targets your target file, and then utilizes its injected code.

```JS
// 1. Import the loader functionconst load = require('./utils/load');
// 2. Execute the loader targeting your file // (load.js automatically goes up one folder and looks for this filename)
load('to_be_loaded.js');
// 3. You can now freely use everything inside to_be_loaded.js
console.log(sharedMessage);
sayHello();
```
------------------------------
## 3. Execution Command
Open your terminal, navigate to your my-project directory, and run main.js using Node:

node main.js

Output:

Success! to_be_loaded.js has been executed.
Hello from the injected script!

If you want to tweak this setup, let me know:

* Do you want to avoid putting load.js inside a subdirectory (i.e., keep all three files in the exact same folder)?
* Do you want to modify the loader so it can return data using standard module.exports instead of relying on global scope injection?

### PROMPT
I used the following JavaScript code: ```module.exports = function(...args) {
  for (let arg of args)
    (1,eval)(require("fs").readFileSync(__dirname + "/../" + arg, "utf8"))
}
``` to load code from another module (`to_be_loaded.js` into the global namespace for my `main.js` script to have access to while executing. However, when I run my `main.js` script with node, I get the following error: `ReferenceError: <var-name> is not defined`; however, `<var-name>` was in fact defined in teh file `to_be_loaded.js`. What might be going wrong?

### RESPONSE:

The `ReferenceError: <var-name> is not defined` error occurs due to how **Node.js module scoping** and **JavaScript `eval` scoping rules** interact. Even though you are using an indirect eval `(1, eval)(...)` to run the code in the global scope, the variables declared inside `to_be_loaded.js` fail to bleed into `main.js` for a few key reasons:

### Why It Fails

1. **`let` and `const` are Block-Scoped to the `eval` Call**
If `<var-name>` in `to_be_loaded.js` is declared using `let` or `const`, those variables are strictly scoped to that specific `eval` execution block. They do not persist globally or leak out to other modules.
2. **`var` Does Not Automatically Attach to `global` in Node.js**
Even if you use `var`, top-level variable declarations inside Node.js modules (or module-like eval contexts) do not automatically become properties of the Node.js `global` object.
3. **Module Isolation**
Node.js treats every file as an isolated module wrapped in its own function scope. An indirect `eval` evaluates code globally, but it doesn't automatically bridge local module environments together.

---

### How to Fix It

Depending on what you are trying to achieve, you have two primary ways to resolve this:

#### Approach 1: Explicitly attach to the `global` object (If you must inject into the global namespace)

If your goal is truly to make the variable globally available across files without using `require`, you must explicitly attach it to the `global` object inside `to_be_loaded.js`:

```javascript
// inside to_be_loaded.js
global.myVarName = "Hello from loaded file";

```

Then, `main.js` can access it directly via `global.myVarName` or just `myVarName`.

#### Approach 2: Use standard CommonJS exports (Recommended)

Relying on `eval` to manage namespaces can lead to hard-to-debug bugs, security risks, and poor performance. The idiomatic Node.js way is to export the variables or functions explicitly:

```javascript
// inside to_be_loaded.js
const varName = "Hello from loaded file";
module.exports = { varName };

```

And load it cleanly in `main.js`:

```javascript
// inside main.js
const { varName } = require("./path/to_to_be_loaded.js");
console.log(varName);

```

---


### ARRAYS

Add support for arrays to Egg by adding the following three functions to the top scope: `array(...values)` to construct an array containing the argument values, `length(array)` to get an array's length, and `element(array, n)` to fetch the *n*th elmeent from an array.

```js
// Modify these definitions...

topScope.array = "...";

topScope.length = "...";

topScope.element = "...";

run(`
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3))))
`);
// → 6
```

#### MY SOLUTION:

```js
topScope.array = Function("...values", "return new Array(...values);");

topScope.length = Function("array", "return array.length;");

topScope.element = Function("array", "element", "return array[element];");
```

#### TEACH KA HINTS:

<!-- 

The easiest way to do this is to represent Egg arrays with JavaScript arrays.

The values added to the top scope must be functions. By using a rest argument (with triple-dot notation), the definition of array can be very simple.

 -->

#### TEACH KA SOLUTION:

```js
topScope.array = (...values) => values;

topScope.length = array => array.length;

topScope.element = (array, i) => array[i];
```

### EX2: CLOSURE

The way teach defined `fun` allows functions in 'Egg' to reference the surrounding scope, allowing the function's body to use local values that were visible at the time the function was defined, just like JS functions do. 

The following program illustrates this: function `f` returns a function that adds its arguments to `f`'s argument, meaning that it needs access to the local scope inside of `f` to be able to use binding `a`. 

```
run(`
do(define(f, fun(a, fun(b, +(a, b)))),
   print(f(4)(5)))
`);
// → 9
```

Go back to the definition of `fun` form and explain which mechanism causes this to work.

#### EX2 -- CLOSURE: MY SOLUTION

it appears this section of the `fun` definition allows access to locally scoped variables:

```js
let localScope = Object.create(scope);
    for (let i = 0; i < args.length; i++) {
      localScope[params[i]] = args[i];
    }
    return evaluate(body, localScope);
```

#### EX2 -- CLOSURE: DISPLAY HINTS

Again, we are riding along on a JavaScript mechanism to get the equivalent feature in Egg. Special forms are passed the local scope in which they are evaluated so that they can evaluate their subforms in that scope. The function returned by fun has access to the scope argument given to its enclosing function and uses that to create the function’s local scope when it is called.

This means that the prototype of the local scope will be the scope in which the function was created, which makes it possible to access bindings in that scope from the function. This is all there is to implementing closure (though to compile it in a way that is actually efficient, you’d need to do some more work).

#### EX2 -- CLOSURE: TEACH KA SOLUTION

'teach ka solution' is in this exercises 'display hints' section!

### EX3 -- COMMENTS

It would be nice if we could write comments in Egg. For example, wherever we find a hash sign (`#`), we could treat the rest of the line as a comment and ignore it, similar to `//` in JS.

We do not have to make any big changes to the parser to support this. We can simply change `skipSpace` to skip comments as if they are whitespace so tht all the points where `skipSpace` is called will now also skip comments. Make this change.

```js
// This is the old skipSpace. Modify it...
function skipSpace(string) {
  let first = string.search(/\S/);
  if (first == -1) return "";
  return string.slice(first);
}

console.log(parse("# hello\nx"));
// → {type: "word", name: "x"}

console.log(parse("a # one\n   # two\n()"));
// → {type: "apply",
//    operator: {type: "word", name: "a"},
//    args: []}
```

<!-- HERE -- ex3 comments +++ -->