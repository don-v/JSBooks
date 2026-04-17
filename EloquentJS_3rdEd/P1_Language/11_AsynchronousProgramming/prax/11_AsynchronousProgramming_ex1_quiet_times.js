/* 

### EX1: QUIET TIMES

There's a security camera near Carla's lab that's activated by motion sensor. It is connected to 
the network and starts sending out a video stream when it is active. Because she'd rather not be 
discovered, Carla has set up a system that notices this kind of wireless network traffic and turns 
on a light in her lair whenever there is activity outside, so she knows when to keep quiet.

She's also been logging the times at which the camera is tripped for a while and wants to use this 
information to visualize which times, in an average week, tend to be quiet and which tend to be 
busy. The log is stored in files holding one time stamp number (as returned by `Date.now()`) per line.

1695709940692
1695701068331
1695701189163

The "camera_logs.txt" file holds a list of logfiles. Write an asynchronous funciton 
`activityTable(day)` that for a given day of the week returns an array of 24 numbers, one for each 
hour of the day, that hold the number of camera network traffic observations seen in tha hour of 
the day. Days are identified by number using the system used by `Date.getDay`, where Sunday is 0 
and Saturday is 6.

The `activityGraph` function, provided by the sandbox, summarizes such a table into a string. 

*/

const { text } = require("node:stream/consumers");

// load dependencies
// require("./code/load")("code/hangar2.js", "code/chapter/11_async.js");
require("./11_AsynchronousProgramming_ex/code/load")("code/hangar2.js", "code/chapter/11_async.js");


// let video = new VideoPlayer(clipImages, 100);
// video.play().catch(e => {
//   console.log("Playback failed: " + e);
// });
// setTimeout(() => video.stop(), 15000);

/* 

To read the files, use the `textFile` function defined earlier -- given a filename, it returns a 
promise that resolves to the file's content. Remember that `new Date(timestamp)` creates a `Date` 
object for that time, which has `getDay` and `getHours` methods returning the day of the week and 
the hour of the day, (respectively).

Both types of files -- the list of logfiles and logfiles themselves -- have each piece of data 
on its own line, separated by a newline ("\n") characters.
*/

// function readTextFile(filename, callback) {
//     if (/^activity/.test(filename)) generateLogs()
//     let file = filename == "files.list" ? Object.keys(files).join("\n") : files[filename]
//     Promise.resolve().then(() => {
//       if (file == null) callback(null, "File " + filename + " does not exist")
//       else callback(file)
//   })
// }

// function textFile(filename) {
//   return new Promise((resolve, reject) => {
//     readTextFile(filename, (text, error) => {
//       if (error) reject(error);
//       else resolve(text);
//     });
//   });
// }


function textFile(filename) {
  return new Promise(resolve => {
    readTextFile(filename, text => resolve(text));
  });
}


async function activityTable(day) {
  let logFileList = await textFile("camera_logs.txt");
  // Your code here
  console.log(logFileList)
  logFileArray = logFileList.split('\n');
  console.log(logFileArray)
  // for (log of logFileArray) {
  //   logContent = await textFile(log);
  //   console.log(logContent);
  // }
  log = logFileArray[0];
  logContent = await textFile(log);
  console.log(`log-name: ${log}; content:\n${logContent}`);
  timestamps = logContent.split('\n');
  console.log(timestamps);


for (log of logFileArray) {
  arrayLogsLogContents = [];
  logContent = await textFile(log);
  console.log(`log-name: ${log}; content:\n ${logContent}`);
  timestamps = logContent.split('\n');
  console.log(timestamps);
  arrayLogsLogContents.push({'log-name': log, 'log-contents': timestamps});
}



  // Initialize counter for 24 hours (0 to 23)
const hourCounts = new Array(24).fill(0);

// Optional: Store day + hour for each timestamp
const perTimestampInfo = [];

timestamps.forEach(ts => {
  // Convert milliseconds to seconds and create Date object (UTC)
  const date = new Date(Number(ts));        // JavaScript Date handles ms timestamps directly
  
  const hour = date.getHours();      // 0 to 23 (UTC)
  const weekday = date.getDay();     // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  
  // Increment the hour counter
  hourCounts[hour] += 1;
  
  // Optional: save day of week and hour for this timestamp
  perTimestampInfo.push({ weekday, hour, timestamp: ts });
});

// === RESULTS ===
console.log("Hour frequencies (0 to 23):");
console.log(hourCounts);

// Pretty print
console.log("\nHourly breakdown:");
hourCounts.forEach((count, hour) => {
  console.log(`Hour ${hour.toString().padStart(2, '0')}: ${count} timestamps`);
});

// Optional: Show day of week names
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

console.log("\nPer timestamp info (first 5):");
perTimestampInfo.slice(0, 5).forEach(info => {
  console.log(`Timestamp: ${info.timestamp} → ${dayNames[info.weekday]}, Hour ${info.hour}`);
});
  
  return hourCounts;
}

activityTable(1)
  .then(table => console.log(activityGraph(table)));

