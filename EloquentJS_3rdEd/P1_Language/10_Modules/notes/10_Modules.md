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

A 'CommonJS module' looks like a regular script, but it has access to two bindings that it sues to interact with other modules. The first is a function called `require`. when oen calls this with the module name of one's dependency, it makes sure the module is loaded and returns its interface. The second is an object named `exports`, which is the interface object for the module. It starts out empty and one adds properties ot it to defined exported values.

This 'CommonJS' example module provides a date-formatting function. It uses two packages form NPM: `ordinal` -- to convert numbers to strings like "1st" and "2nd", and `date-names` -- to get the English names for weekdays and months. It exports a single function, `formatDate`, which takes a `Data` object and a template string.

The template string may contain codes that direct the format, such as `YYYY` for the full year and `Do` for the ordinal day of the month. One could give it a string like `"MMMM Do YYYY"` to get output like `November 22nd 2017`:

```js
const ordinal = require("ordinal");
const {days, months} = require("date-names");

exports.formatDate = function(date, format) {
  return format.replace(/YYYY|M(MMM)?|Do?|dddd/g, tag => {
    if (tag == "YYYY") return date.getFullYear();
    if (tag == "M") return date.getMonth();
    if (tag == "MMMM") return months[date.getMonth()];
    if (tag == "D") return date.getDate();
    if (tag == "Do") return ordinal(date.getDate());
    if (tag == "dddd") return days[date.getDay()];
  });
};
```

The interface of `ordinal` is a single function, whereas `date-name` exports an object containing multiple things -- `days`, and `months` are arrays of names. Destructuring is very convenient when creating bindings for imported interfaces.

The module adds its interface function to `exports` so that modules that depnd on it get access to it. We could use the module like this:

```js
const {formatDate} = require("./format-date.js");

console.log(formatDate(new Date(2017, 9, 13),
                       "dddd the Do"));
// → Friday the 13th
```

CommonJS is implemented with a module loader that, when loading a module, wraps its code in a function (giving it its own local scope) and passes the `require` and `exports` bindings to that function as arguments. 

If we assume we have access to a `readFile` function that reads a file by name and gives us its content, we can define a simplified form of require like this:

```js
function require(name) {
  if (!(name in require.cache)) {
    let code = readFile(name);
    let exports = require.cache[name] = {};
    let wrapper = Function("require, exports", code);
    wrapper(require, exports);
  }
  return require.cache[name];
}
require.cache = Object.create(null);
```

`Function` is a built-in JavaScript functon that takes a list of arguments (as a comma-separated string) and a string containing the function body and returns a function value with those arguments and that body. This is an interesting concept -- it allows a program to create new pieces of program from string data -- but also a dangerous one, since if someone can trick one's program into putting a string they provide into `Function`, they can make the program do anything they want. 

Standard JS provides no such function as `readFile`, but different JS environments, such as the browser and Node.js, provide their own ways of accessing files. The example just pretends that `readFile` exists. 

To aovid loading the same module multiple times, `require` keeps a store (cache) of already loaded modules. When called, it first checks whether the requested module has been loaded and, if not, loads it. This involves reading the module's code, wrapping it in a function, and calling it.

By defining `require` and `exports` as parameters for the generated wrapper function (and passing the appropriate values when calling it), the loader makes sure that these bindings are available in the module's scope.

An important difference between this system and ES modules is that ES modules imports happen before a module's script starts running, whereas `require` is a normal function, invoked when the module is already running. Unlike `import` declarations, `require` calls *can* appear inside functions, and the name of the dependency can be any expression that evaluates to a string, whereas `import` allows only plain quoted strings.

The transition of the JS community from CommonJS style to ES modules has been a slow and somewhat rough one. Fortunately we are now at a point where most of the poular packages on NPM provide their code as ES modules, and Node.js allows ES modules to import from CommonJS modules. While CommonJS code is still something one will run across, there is no real reason to write new programs in this style anymore.

## BUILDING AND BUNDLE

Many JS packages aren't technically written in JS. Language extensions such as TypeScript, the type checking dialect mentioned in *C8*, are widely used. People also often start using planned new language featurs long before they have been added to the platforms that actually run JS. To make this possible, they *compile* their code, translating it from their chosen JS dialect to plain old JS -- or even to past versions of JS -- so that browsers can run it. 

Including a modular program that consists of 200 different files in a web page produces its own problems. If fetching a single file over the network takes 50 milliseconds, loading the whole program takes 10 seconds, or maybe half that if one can load several files simultatneously. That's a lot of wasted time. Because fetching a single big file tends to be faster than fetching a lot of tiny ones, web programmers have started using tools that combine their programs (which they painstakingly split into modules) into a single big file before they publish it to the web. Such tools are called *bundlers*. 

And we can go further. Apart form the number of files, the *size* of the files also determines how fast they can be trasferred over the network. Thus, the JS community has invented *minifiers*. These are tools that take a JS program and make it smaller by automatically removing comments and whtiespace, renaming bindings, and replacing pieces of code with equivalent code that takes up less space.

It is not uncommon for the code that one finds in an NPM package or that runs on a web page to have gone through *multiple* stages of transformation -- coverting from modern JS to historic JS, combining the modules into a single file, and minifying the code. We don't go into the details of these tools in this book, since there are many of them, and which one is popular changes regularly. Just be aware that such things exist, and look them up when you need them.

## MODULE DESIGN

Structuring programs is one of the subtler aspects of programming. Any nontrivial piece of functionality can be organized in various ways.

Good program design is subjective -- there are trad-offs invovled, and matters of taste. The best way to learn the value of well-structured design is to read or work on a lot of programs and notice what works and what doesn't. One should not assume that a painful mess is "just the way it is". One can improve the structure of almost everything by putting more thought into it.

One aspect of module design is ease of use. If one is designing something that is intended to be used by multiple peple--or even by yourself, in three months when one no longer remembers the specifics of what one did--it is helpful if one's interface is simple and predictable.

That may mean following existing conventions. A good example is the `ini` package. This module imitates the standard `JSON` object by providing `parse` and `stringify` (to write an 'INI' file) function, and, like `JSON`, converts between strings and plain objects. The interface is small and familiar, and  after one has owrked with it once, one'll likely remember how to use it.

Even if there's no standard function or widely used package to imitate, one can keep one's modules predictable by using simple data structures and doing a single, focused thing. Many of the 'INI'-file parsing modules on NPM provide a function that directly reads such a file from the hard disk and parses it, for example. This makes it impossible to use such modules in the browser, where we don't have direct filesystem access, and adds complexity that would have been better addressed by *composing* the module with some file-reading function.

This points to another helpful aspect of module design -- the ease with which something can be composed with other code. Focused modules that compute values are applicable in a wider range of programs than bigger modules that perform complciated actions with side effects. An 'INI' file reader that insists on reading teh file from disk is useless in a scanario where the file's content comes from some other source.

Relatedly, stateful objects are sometimes useful or even necessary, but if something can be done with a function, use a function. Several of the 'INI' file readers on 'NPM' provide an interface style that requires one to first create an object, then load the file into one's object, and finally use specialized methods ot get at the results. This type of things is common in the OOP tradition, and it's terrible. Instead of making a single function call and moving on, one has to perform the ritual of moving one's objects through its varous states. And because the data is now wrapped in a specialized object type, all code that interacts with it has to know about that type, creating unnecessary interdependencies.

Often, defining new data structures can't be avoided -- only a few basic ones are provided by the language, and many types of data have to be mroe complex than an array or a map. But when an array suffices, use an array.

An example of a slightly more complex data structure is the graph from *C7*. There is no single obvious way to represent a graph in JS. In that chapter, we used an object whose properties hold arrays of strings -- the other nodes reachable from that node.

There are several different pathfinding packges on 'NPM', but none of them uses this graph format. They usually allow the graph's edges to have a weight, which is the cost or distance associated with it. That isn't possible in our representation.

For example, there's the `dijkstrajs` package. A well-knwon approach to pathfinding, quite similar to our `findRoute` function, is called *Dijkstra's algo*, after Edsger Dijkstra, who first wrote it down. The `js` suffix is often added to a package names to indicate the fact that they are written in JS. The `dijkstrajs` package uses a graph format similar to ours, but instead of arrays, it uses objects whose property values are numbers -- the weights of the edges.

If we anted to use that pacakge, we'd have to make sure that our graph was stored in the format it expects. All edges get the same weight, since out simplified model treats each road as having hte same cost (one turn):

```js
const {find_path} = require("dijkstrajs");

let graph = {};
for (let node of Object.keys(roadGraph)) {
  let edges = graph[node] = {};
  for (let dest of roadGraph[node]) {
    edges[dest] = 1;
  }
}

console.log(find_path(graph, "Post Office", "Cabin"));
// → ["Post Office", "Alice's House", "Cabin"]
```

This can be a barrier to composition -- when various packages are using different data structures to describe similar things, combining them is difficult. Therefore, if one wants to design for composability, find out what data structures other people are using and, when possible, follow their example.

Designing a fitting module structure for a program can be difficult. In the phase where one is still exploring the problem, tring different things to see waht works, one might want to not worry about it too much, since keeping everything organized can be a big distraction. Once one has something that feels solid, that's a good time to take a step back and organize it.

# SUMMARY

Modules provide structure to bigger programs by separating the code into pieces with clear interfaces and dependencies. The interface is the part of the module that's visisble to to other modules, and the dependencies are the other modules it makes use of.

Because JS historically did not improve a module system, the 'CommonJS' system was built on top of it, Then at some point it *did* get a built-in system, which now coexists uneasily with the 'CommonJS' system.

A package is a chunk of code that can be distributed on its own 'NPM' is a repository of JS packages. One can download all kinds of useful (and useless) packages from it.

## EXERCISES

### A MODULAR ROBOT

These are the bindings that the project form *C7*` creates:

```js
roads
buildGraph
roadGraph
VillageState
runRobot
randomPick
randomRobot
mailRoute
routeRobot
findRoute
goalOrientedRobot
```

If one were to write that project as a modular program, wht modules would one create? Which module would depend on which other module?, and what would their interfaces look like?

Which pieces are likely to be available prewritten on 'NPM'? Woudl one prefer to use an 'NPM' package or write them oneself?

<!-- HERE -- p. ex1 -- modular robot!!
+++ -->