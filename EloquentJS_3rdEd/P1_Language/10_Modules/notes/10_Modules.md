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

A module's interface thus consists of a collection of named bindings, which other modules that depend on the module can access. Imported bindings can be renamed to give them a new local name using `as` after their name.

```js
import {dayName as nomDeJour} from "./dayname.js";
console.log(nomDeJour(3));
// → Wednesday
```

A module may also have a special export named `default`, which is often used for modules tht only export a single binding. To define a default export, one writes `export default` before an expression, a function declaration, or a class declaration:

```js
export default ["Winter", "Spring", "Summer", "Autumn"];
```

Such a binding is imported by omitting the braces around the name of the import:

```js
import seasonNames from "./seasonname.js";
```

To import all bindings from a module at the same time, one can use `import *`. One provides a name, and that name will be bound to an object holding all the module's exports. This can be useful when one is using a lot of different exports:

```js
import * as dayName from "./dayname.js";
console.log(dayName.dayName(3));
// → Wednesday
```

## PACKAGES

One of the advantages of building a program out of separate pieces and being able to run some of those pieces on their own is that one might be able to use the same piece in different programs.

But how does one set this up? Say teach wants to use the `parseINI` function from *C9* in another program. If it is clear what the function depends on(in this case, nothing), teach can just copy that module into his new project and use it. But then, if teach finds a mistake in the code, teach'll probably fix it in whichever program teach is working with at the time and forget to als ofix it in the other program.

One one starts duplicating code, one'll quickly find oneslef wasting time and energy moving copies around and keeping them up to date. That's where *packages* come in. A package is a chunk of code that can be distributed (copied and installed). It may contain one or more modules and has information about which other packages it depends on . A package also usually comes with documentation explaining what it does so that people who didn't write it ight still be able to use it.

When a problem is found in a package or a new feature is added, the package is updated. Now the programs that depend on it (which may also be packages) can copy the new version to get the improvements that were made to the code.

Working in this way requires infrastructure. We need a place to store and find packges and a convenient way to install and upgrade them. In the JS world, this infrastructure is provided by NPM (`https://npmjs.com`)

NPM is two things: an online service wehre one can download (and upload) packages, and a program (bundled wiht Node.js) that helps one install and manage them.

At the time of writing, there are more than 3 million different packages available on NPM. A large portion of those are rubbish, to be fair. But almost every useful, publicly available JS package can be found on NPM. For example, an 'INI' file parser, similar to the one we built in *C9*, is available under the package name `ini`. 

*C20* will show how to install such packages localy using the `npm` command lineprogram.

Having quality packages available for download is extrmely valuable. It means that we can often avoid reinventing a program that 100 people have written before and get a solic, well-tested implementaiton at the press of a few keys.

Software is cheap to copy, so once someone ahs written it, distributing it to other people is an efficient process. Writing it in the first place *is* work, though, and responding to people who have found problems in the code or who want to propose new features is even more work. 

By default, one owns the copyright to the code one writes, and other people may use it only with one's permission. But because some people are just nice and because publishing good software cna help make one a little bit famous among programmers, many packages are published udner a license that explicitly allows other people to use it.

Most code on 'NPM' is licensed this way. Some licenses require ont ot also publish code that one builds on top of the package under the same license. Others are less demaning, requiring only that one keeps the license with the code as one distributes it. The JS community mostly uses the latter type of license. When using other people's packages, one should be aware of their licenses. 

Now, instead of writing one's own INI file parser, one can use NPM:

```js
import {parse} from "ini";

console.log(parse("x = 10\ny = 20"));
// → {x: "10", y: "20"}
```

## COMMONJS MODULES

Before 2015, when the JS language had no built-in module system, people were already building large systems in JS. To make that workable, they *needed* modules.

The community designed its own improvised module systems on top of the language. These use function to create local scope for the modules and regualr object to represent module interfaces. 

Initially, people just manually wrapped their entire module in an "immediately invoked function expression" to create the module's scope and assigned thier interface to a single global variable:

```js
const weekDay = function() {
  const names = ["Sunday", "Monday", "Tuesday", "Wednesday",
                 "Thursday", "Friday", "Saturday"];
  return {
    name(number) { return names[number]; },
    number(name) { return names.indexOf(name); }
  };
}();

console.log(weekDay.name(weekDay.number("Sunday")));
// → Sunday
```

This style of modules provides isolation, to a certain degree, but it does nto declare dependencies. Instead, it just puts its interface into the global scpe and expects its dependencies, if any, to do the same. This is not ideal.

If we implement our own module loader, we can do better. The most widly used approach to bolted-on JS modules is called *CommonJS modules*. Node.js used this module system form the start (though it is now alos knows how to load ES modules), and it is the module system used by many packages on NPM.

A 'CommonJS module' looks like a regular script, but it has access to two bindings that it sues to interact with other modules. The first is a function called `require`. when oen calls this with the module name of one's dependency, it makes sure the module is laoded and returns its interface.

<!-- HERE -- p. COMMONJS MODULES!! -->