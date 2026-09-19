/* 
The way teach defined `fun` allows functions in 'Egg' to reference the surrounding scope, 
allowing the function's body to use local values that were visible at the time the function 
was defined, just like JS functions do. 

The following program illustrates this: function `f` returns a function that adds its 
arguments to `f`'s argument, meaning that it needs access to the local scope inside 
of `f` to be able to use binding `a`. 

```
run(`
do(define(f, fun(a, fun(b, +(a, b)))),
   print(f(4)(5)))
`);
// → 9
```

Go back to the definition of `fun` form and explain which mechanism causes this to work.

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


 */

