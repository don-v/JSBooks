/* Currently, the only way to assign a binding a value is `define`. This contruct acts as a way both to define new bindings and to give existing ones a new value.

This ambiguity causes a problem. When one tries to give a nonlocal binding a new value, one will end up defining a local one with the same name instead. Some languges work like this by design, but teach has always found it an awkward way to handle scope.

Add a specil form `set`, similar to `define`, which gives a binding a new value, updating the binding in an outer scope if it doesn't already exist in the inner scope. If the binding is not defined at all, throw a `ReferenceError` (another standard error type).

The technique of representing scopes as simple objects, which has made things convenient so far, will get in one's way a little at this point. One might want to use the `Object.getPrototypeOf` function, which returns the prototype of an object. Also remember that one can use `Object.hasOwn` to find out if a given object has a property.
 */

specialForms.set = (args, scope) => {
  // Your code here.
};

run(`
do(define(x, 4),
   define(setx, fun(val, set(x, val))),
   setx(50),
   print(x))
`);
// → 50
run(`set(quux, true)`);
// → Some kind of ReferenceError