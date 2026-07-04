
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

// ## Teach ka Solution

// async function activityTable(day) {
//   let table = [];
//   for (let i = 0; i < 24; i++) table[i] = 0;

//   let logFileList = await textFile("camera_logs.txt");
//   for (let filename of logFileList.split("\n")) {
//     let log = await textFile(filename);
    // for (let timestamp of log.split("\n")) {
    //   let date = new Date(Number(timestamp));
    //   if (date.getDay() == day) {
    //     table[date.getHours()]++;
//       }
//     }
//   }

//   return table;
// }

function hello() {
  return new Promise((reject, resolve) => {
      
    })

}

function activityTable(day) { 
  return new Promise((resolve, reject) => {

  })

  const table = Array(24).fill(0);
  const clogsPromiseResult = textFile("camera_logs.txt");
  clogsPromiseResult.then((result) => {
    arrayOfLogFileNames = result.split("\n");
    const filePromises = arrayOfLogFileNames.map(file =>
      textFile(file));
      return Promise.all(filePromises)
        .then(allFileContents => {
          allFileContents.forEach((content, index) => {
            const lines = content.split('\n')
            for (let timestamp of lines) {
              let date = new Date(Number(timestamp));
              if (date.getDay() == day) {
                table[date.getHours()]++;
              }
            } 
          });
        })
  })
}
  
  
  
    activityTable(6)
  // .then(table => console.log(activityGraph(table)));
