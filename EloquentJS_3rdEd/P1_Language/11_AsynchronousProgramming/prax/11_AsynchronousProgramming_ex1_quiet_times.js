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

// load dependencies
require("./code/load")("code/hangar2.js", "code/chapter/11_async.js");

let video = new VideoPlayer(clipImages, 100);
video.play().catch(e => {
  console.log("Playback failed: " + e);
});
setTimeout(() => video.stop(), 15000);

/* 

To read the files, use the `textFile` function defined earlier -- given a filename, it returns a 
promise that resolves to the file's content. Remember that `new Date(timestamp)` creates a `Date` 
object for that time, which hs `getDay` and `getHours` methods returning the day of the week and 
the hour of the day, (respectively).

Both types of files -- the list of logfiles and logfiles themselves -- have each piece of data 
on its own line, separated by a newline ("\n") characters.
*/

function textFile(filename) {
  return new Promise(resolve => {
    readTextFile(filename, text => resolve(text));
  });
}


async function activityTable(day) {
  let logFileList = await textFile("camera_logs.txt");
  // Your code here
}

activityTable(1)
  .then(table => console.log(activityGraph(table)));

