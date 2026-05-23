
/* Rewrite the function from the previous exercise without `async/await`, using plain Promise methods.

In this style, using `Promise.all` will be more convenient than trying to model a loop over the logfiles. 
In the `async` function, just using `await` in a loop is simpler. If reading a file takes some time, which of 
these two approaches will take the least time to run?

If one of the files listed in the file list has a typo, and reading it fails, how does the failure end up in the 
`Promise` object that your function returns?
 */

const { text } = require("node:stream/consumers");

// load dependencies
// require("./code/load")("code/hangar2.js", "code/chapter/11_async.js");
require("./11_AsynchronousProgramming_ex/code/load")("code/hangar2.js", "code/chapter/11_async.js");

function textFile(filename) {
  return new Promise(resolve => {
    readTextFile(filename, text => resolve(text));
  });
}

function activityTable(day) {
  // Your code here
}

activityTable(6)
  .then(table => console.log(activityGraph(table)));
