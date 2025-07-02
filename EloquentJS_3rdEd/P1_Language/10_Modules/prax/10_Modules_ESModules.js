const names = ["Sunday", "Monday", "Tuesday", "Wednesday",
               "Thursday", "Friday", "Saturday"];

export function dayName(number) {
  return names[number];
}
export function dayNumber(name) {
  return names.indexOf(name);
}

import {dayName} from "./dayname.js";
let now = new Date();
console.log(`Today is ${dayName(now.getDay())}`);
// → Today is Monday

import {dayName as nomDeJour} from "./dayname.js";
console.log(nomDeJour(3));
// → Wednesday

export default ["Winter", "Spring", "Summer", "Autumn"];

import seasonNames from "./seasonname.js";

import * as dayName from "./dayname.js";
console.log(dayName.dayName(3));
// → Wednesday