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

A slightly different way to build an asynchronous program is to have asynchronous functions return an object that represents its (future) reslt instead of passing around callback functions. This way, such functions actually return something meaningful, and the shape of the program more closely resembles that of synchronous programs. 

This is what the standard class `Promise` is for. A *promise* is a receipt representing a value that may not be available yet. It provides a `then` method that allows one to register a function that should be called when the action for which it is waiting finishes. When the promise is *resolved*, meaning its value becomes available, such functions (there can be multiple) are called with the result value. It is possible to call `then` on a promise that has already resolved -- one's function will still be called.

The easiest way to create a promise is by calling `Promise.resolve`. ...

<!-- HERE -- PROMISES! -->