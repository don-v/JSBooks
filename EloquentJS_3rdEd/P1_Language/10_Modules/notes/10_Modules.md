# CHAPTER 10: MODULES

"Write code that is easy to delete, not easy to extend." -- Tef, *programming is terrible*

Ideally, a program has a clear, straightforward structure. The way it works is easy to explain, and each part plays a well-defined role.

In prax, programs grow organically. Pieces of functionality are added as the programmer identifies new needs. Keeping such a program well structured requires constant attention and work. This is work that will pay off only in the future, the *next* time someone works on the program, so it's tempting to neglect it an dallow various parts of the program to become deeply entanbled.

This causes two practical issues. First, understanidng an entangled syetm is hard. If everything can touch everything else, it is diffiuclt to look at any given piece in isolation. One is forced to build up a holistic understanding of the entire thing. Second, if one wants to use any of the functionality from such a program in another situation, rewriting it amy be easier than trying to disentangle it from its context. 

The phrase "big ball of mud" is often used for such large, structureless programs, Everything sticks together, and when one tries to pick out a piece, the whole thing comes apart, and one succeeds ony in making a mess. 

## MODULAR PROGRAMS

*Modules* are an attempt to avoid these problems. A module is a piece of program that specifies which other pieces it relies on and which functionality it provides for other modules to use (its *interface*).

Module interfaces have a lot in common with object interfaces, as we saw in *C6*. They make part of the module available to the outside world and keep the rest private. 

But the interface that a module provides for others to use is only half the story. A good module system also requries modules to specify which code *they* use from other modules. These relations are called *dependencies*. If module A uses functionality from module B, it is said to *depend* on that module. When these are clearly specified in the module itself, they can be used to fitur eout which other modules needs to be present to be able to use a given module and to automatically load dependencies. 

When the ways in which modules interact with each other are explicit, a system becomes more like the 'LEGO', where pieces intereact through well-defined connectors, and less like mud, where everything mixes with everything elese.

## ES MODULES

The original JS language did not have any concept of a module. All scripts ran in the same scope, and accessing a function defined in another script was done by referencing the global bindings created by that script. This actively encouraged accidental, hard-to-see entanglement of code and invited problems like unrelated scripts trying to use the same binding name. 

Since ECMAScript 2015, JS spports two different types of programs. *Scripts* behave in the old way: their bindings are defined in the global scope, and they have no way to directly reference other scripts. *Modules* get their won separate scope and support the `import* and `export* keywords, which aren't available in scripts, to declare their dependencies and interface. This module system is usually called *ES modules* (where *ES* stands for ECMAScript).

A modular program is composed of a number of such modules, wired together via their imports and exports. 

The following example module converts between day names and numbers (as returned by `Date`'s `getDay` method). It defines a constant that is not part of its interface, and two functions that are. It has no dependencies:

```js
const names = ["Sunday", "Monday", "Tuesday", "Wednesday",
               "Thursday", "Friday", "Saturday"];

export function dayName(number) {
  return names[number];
}
export function dayNumber(name) {
  return names.indexOf(name);
}
```

The `export` keyword can be put in front of a function, class, or binding definition to indicate that that binding is part of the module's interface. This makes it possible for other modules to use that binding by importing it:

```js
import {dayName} from "./dayname.js";
let now = new Date();
console.log(`Today is ${dayName(now.getDay())}`);
// → Today is Monday
```

The `import` keyword, followed by a list of binding names in braces, makes bindings from another modujle available in the current module. Modules are identified by quoted strings.

How such a module name is resolved to an actual program differes by platform. The browser treats them as web addresses, whereas 'Node.js' resolves them to files. When one runs a module, all the other modules it depends on -- and the modules *those* depend on -- are loaded, and the exported binidngs are made available to the modules that import them. 

Import and export declarations cannot appear inside of functions, loops, or other blocks. They are immediately resolved when the module is loaded, regardless of how the code in the module executes. To reflect this, they must appear only in the outer module body. 

<!-- HERE -- p. ES modules! -->