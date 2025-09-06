# C11: ASYNCHRONOUS PROGRAMMING 

"Who can wait quietly while the mud settles?
Who can remain still until the moment of action?"
-- Laozi, *Tao Te Ching*

The central part of a computer, the part that carries out the individual steps that make up our programs, is called the *processor*. The programs we have seen so far will keep the processor busy until they have finished their work. The speed at which something like a loop that manipulates numbers can be execued depends pretty much entirely on the speed of the computer's processor and memory.

But many programs interact with things outside of the processor. For example, they may communicate over a computer netowrk or request data from the hard disk -- which is a lot slower than gettin git from memory.

When such a thing is happening, it would be a shame to let the processor sit idle -- there might be some other work it could do in the meantime. In part, this is handled by one's operating system, which will switch the processor between multiple running programs. But that doesn't help when we want a *single* program to be able to make progress while it is waiting for a network request.

## ASYNCHRONICITY

In a *synchronous* programming model, things happen one at a time. When one calls a function that performs a long-running action, it returns only when the action has finished and it can return the result. This stops one's program for the time the action takes.

An *asynchronous* model allows multiple things to happen at the same time. When one starts an action, one's program continues to run. When the action finished, the program is informed and gets access to the result (for example, the data read from disk).

We can compare synchronous and asynchronous programming using a small example: a program that makes two requests over the network and then combines the results.

In a synchronous environment, where the request function returns only after it has done its work, the easiest way to perform this task is to make the requests one after the other. This has the drawback that the second request will be started only when the first has finished. The total time take will be at least the sum of the two response times.

The solution to this problem, in a synchronous system, is to start additional threads of control. A thread is another running program whose execution may be interleaved with other programs by the operating system -- since most modern computers contain multiple processors, multiple threads may even run at the same time, on different processors. A second thread could start the second request, and then both threads wait for their results to come back, after which they resynchronize to combine their results. 

In the following diagram, the thick lines represent time the program spends running normally, and the thin lines represent time spent waiting for the network. In the synchronous model, the time take by the network is *part* of the timeline for a given thread of control. In the asynchronous model, starting a network action allows the program to continue running while the netowrk communication happens alonside it, notifying the program when it is finished. 

![threading diagram](../../../to_ignore/11_AsynchronousProgramming/threading_diagram.png)

Another way to describe the difference is that waiting for action to finish is *implicit* in the synchronous model, while it is *explicit* -- under our control  -- in the asynchronous one.

Asynchronicity cuts both ways. It makes expressing programs that do not fit the stright-line model of control easier, but it can also make expressing programs that do follow a straight line more awkward. We'll see some ways to reduce this awkwardness later in the chapter.

Both prominent JS programming platforms -- browsers and Node.js -- make operations that might take a while asynchronous, rather than reying on threads. Since programming with threads is notoriously hard (understanding what a program does i much more difficult when it's oding multiple things at once), this is generally considered a good thing. 

## CALLBACKS

One approach to asynchronous programming is to make functions that need to wait for something, take an extra argument, a *callback function*. The asynchronous function starts a process, sets things up so that the callback function is called when the process finishes, and then returns.

As an example, the `setTimeout` function, available both in 'Node.js' and in browsers, waits a given number of milliseconds and then calls a function.

```js
setTimeout(() => console.log("Tick"), 500);
```

Waiting is not generally important work, but it can be very useful when one needs to arrange for something to happen at a certain time or check whether some action is taking longer than expected.

Another example of a common asynchronous operation is reading a file from a device's storage. Imagine one has a function `readTextFile` that reads a file's content as a string and passes it to a callback function:

```js
readTextFile("shopping_list.txt", content => {
  console.log(`Shopping List:\n${content}`);
});
// → Shopping List:
// → Peanut butter
// → Bananas
```

The `readTextFile` function is not part of standard JS. We wil see how to read files in the browser and in Node.js in later chapters.

Performing multiple asynchronous actions in a row using callbacks means that one has to keep passing new functions to handle the continuation of the computation after the actions. An asynchronous function that compares two files and produces a boolean indicating whether their content is the same might look like this:

```js
function compareFiles(fileA, fileB, callback) {
  readTextFile(fileA, contentA => {
    readTextFile(fileB, contentB => {
      callback(contentA == contentB);
    });
  });
}
```

This style of programming is workable, but the indentation level increases with each asynchornous action because one ends up in another function. Doing more complicated things, such as warpping asynchronous actions in a loop, can get awkward.

In a way, asynchronicity is *contagious*. Any function call that calls a funciton asynchronously must itself be asynchronous, using a callback or similar mechanism to deliver its result. Calling a callback is somewhat more invovled and error prone than simply returning a value, so needing to structure large parts of one's program that way is not great.

## PROMISES

[MDN Promises docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

A slightly different way to build an asynchronous program is to have asynchronous functions return an object that represents its (future) reslt instead of passing around callback functions. This way, such functions actually return something meaningful, and the shape of the program more closely resembles that of synchronous programs. 

This is what the standard class `Promise` is for. A *promise* is a receipt representing a value that may not be available yet. It provides a `then` method that allows one to register a function that should be called when the action for which it is waiting finishes. When the promise is *resolved*, meaning its value becomes available, such functions (there can be multiple) are called with the result value. It is possible to call `then` on a promise that has already resolved -- one's function will still be called.

The easiest way to create a promise is by calling `Promise.resolve`. This function ensures that the value one gives it is wrapped in a promise. If it's already a promise, it is simply returned. Otherwise, one gets a new promise that immediately resolves with your value as its result.

```js
let fifteen = Promise.resolve(15);
fifteen.then(value => console.log(`Got ${value}`));
// → Got 15
```

To create a promise that does not immediately resolve, one can use `Promise` as a constructor. It has a somewhat odd interface: the constructor expects a function as its argument, which it immediately calls, passing it a function that it can use to reslve the promise.

For example, this is how one could create a promise-based interface for the `readTextFile` function:

```js
function textFile(filename) {
  return new Promise(resolve => {
    readTextFile(filename, text => resolve(text));
  });
}

textFile("plans.txt").then(console.log);
```

Note how, in contrast to callback-style funcitons, this asynchronous function returns a meaningful value -- a promise to give you the contenst of the file at some point in the future. 

A useful thing about the `then` method is that it itself returns another promise. This one resolves to the value returned b teh callback function or, if that returned value is a promise, to the value that promise resolves to. Thus, one can "chain" multiple calls to `then` together to setup ups a sequence of asynchronous actions.

This function, which reads a file full of filenames and returns the content of a ranndom file in that list, shows this kind of asynchronous promise pipeline:

```js
function randomFile(listFile) {
  return textFile(listFile)
    .then(content => content.trim().split("\n"))
    .then(ls => ls[Math.floor(Math.random() * ls.length)])
    .then(filename => textFile(filename));
}
```

The function returns the result of this chain of `then` calls. The initial promise fetches the list of files as a string. The first `then` call transforms that string into an array of lines, producing a new promise. The second `then` call picks a random line form that, producing a third promise that yields a single file name. The final `then` call reads this file, so the result of the function as a whole is a promise that returns the content of a random file.

In this code, the functions used in the first two `then` call returns a regular value that will immediately be passed into the promise returned by `then` when the function returns. The last `then` call returns a promise (`textFile(filename)`), making an actual asynchronous step.

It would also have been possible to perform all these steps inside a single `then` callback, since only the last step is actually asynchronous. But the kind of `then` wrappers that only do some synchronous data transformation are often useful, such as wehn one wants to return a promise that produces a processed version of some asynchronous result.

```js
function jsonFile(filename) {
  return textFile(filename).then(JSON.parse);
}

jsonFile("package.json").then(console.log);
```

Generally, it is useful to think of a promise as a device that lets code ignore the question of when a value is going to arrive. A normal value has to actually exist before we can reference it. A promised value is a value that *might* already be there or might appear at some point in the future. Computations defined in terms of promises, by writing them together with `then` calls, are executed asynchronously as their inputs become avaialble. 

## FAILURE

Regular JS computations can fail by throwing an exception. Asynchronous computations often need something like that. A network request may fail, a file may not exist, or some code that is part of the asynchronous computation may throw an exception.

One of the most pressing problems with the callback style of asynchronous programming is that it makes it extremely diffiuclt to ensure failures are properly reported to the callbacks.

A common convention is to use the first argument to the callback to indicate that the action failed, and the second to pass the value produced by the action when it is successful:

```js
someAsyncFunction((error, value) => {
  if (error) handleError(error);
  else processValue(value);
});
```

Such callback functions must always check whether they received an exception and make sure that any problems they cause, including exceptions thrown by function they call, are caught and given to the right function.

Promises make this easier. They can be either resolved (the action finished successfully) or rejected (it failed). Resolve handlers (as registered with `then`) are called only when the action is successful, and rejections are propagated to the new promise returned by `then`. When a handler throws an exception, this automatically causes the promise produced by its `then` call to be rejected. If any element in a chain of asynchronous action fails, the outcome of the whole chain is marked as rejected, as no success handlers are called byond the point where it failed.

Much like resolving a promise provides a value, rejecting one also provides a value, usually called the *reason* of the rejection. When an exception value is used as the reason. Similarly, when a handler returns a promise that is rejected, that rejection flows into the next promise. There's a `Promise.reject` function that creates a new immediately rejected promise.

To explicitly handle such rejections, promises have a `catch` method that registers a handler to be called when the promise is rejected, similar to how `then` handlers handle normal resolution. It's also very much like `then` in that it returns a new promise, which resolves to the original promise's value when that resolves normally and to the result of the `catch` handler otherwise. If a `catch` handler throws an error, the new promise is also rejected.

As a shorthand, `then` also accepts a rejection handler as a second argument, so one can install both types of handlers in a single method call: `.then(acceptHandler, rejectHandler)`.

A function passed to the `Promise` constructor receives a second argument, alongside the resolve function, which it can use to reject the new promise.

When our `readTextFile` function encounters a problem, it passes the error to its callback function as a second argument. Our `textFile` wrapper should actually check that argument so that a failure causes thepromise it returns to be rejected.

```js
function textFile(filename) {
  return new Promise((resolve, reject) => {
    readTextFile(filename, (text, error) => {
      if (error) reject(error);
      else resolve(text);
    });
  });
}
```

The chain of promise values created by calls to `then` and `catch` thus form a pipeline through which asynchronous values or failures move. Since such chains are created by registering handlers, each link has a success handler or a rejection handler (or both) associated with it. Handlers that don't match the type of outcome (success or failure) are ignored. Handlers that do match are called, and thier outcome determines what kind of value comes next -- success when they return a non-promise value, rejection when they throw an exception, and the outcome of the promise when they return a promise.

```js
new Promise((_, reject) => reject(new Error("Fail")))
  .then(value => console.log("Handler 1:", value))
  .catch(reason => {
    console.log("Caught failure " + reason);
    return "nothing";
  })
  .then(value => console.log("Handler 2:", value));
// → Caught failure Error: Fail
// → Handler 2: nothing
```

The first `then` handler function isn't called because at that point of the pipeline the promise holds a rejection. The `catch` handler handles that rejection and returns a value, which is given to the second `then` handler function.

Much like an uncaught exception is handled by the environment, JS environments can detect when a promise rejection isn't handled and will report this as an error.

## CARLA

<!-- HERE -- CARLA! -->
