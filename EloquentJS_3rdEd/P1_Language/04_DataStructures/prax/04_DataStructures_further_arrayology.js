let x = `
let todoList = [];
function remember(task) {
  todoList.push(task);
}
function getTask() {
  return todoList.shift();
}
function rememberUrgently(task) {
  todoList.unshift(task);
}
`;

console.log(x);

let todoList = [];
function remember(task) {
  todoList.push(task);
}
function getTask() {
  return todoList.shift();
}
function rememberUrgently(task) {
  todoList.unshift(task);
}

x = `
console.log([1, 2, 3, 2, 1].indexOf(2));
// → 1
console.log([1, 2, 3, 2, 1].lastIndexOf(2));
// → 3
`;

console.log(x);

console.log('console.log([1, 2, 3, 2, 1].indexOf(2));',[1, 2, 3, 2, 1].indexOf(2));
// → 1
console.log('console.log([1, 2, 3, 2, 1].lastIndexOf(2));',[1, 2, 3, 2, 1].lastIndexOf(2));
// → 3

x = `
console.log([0, 1, 2, 3, 4].slice(2, 4));
// → [2, 3]
console.log([0, 1, 2, 3, 4].slice(2));
// → [2, 3, 4]`;

console.log(x);

console.log('console.log([0, 1, 2, 3, 4].slice(2, 4));',[0, 1, 2, 3, 4].slice(2, 4));
// → [2, 3]
console.log('console.log([0, 1, 2, 3, 4].slice(2, 4));',[0, 1, 2, 3, 4].slice(2));
// → [2, 3, 4]

x = `
function remove(array, index) {
  return array.slice(0, index)
    .concat(array.slice(index + 1));
}
console.log(remove(["a", "b", "c", "d", "e"], 2));
// → ["a", "b", "d", "e"]
`;

console.log(x);

function remove(array, index) {
  return array.slice(0, index)
    .concat(array.slice(index + 1));
}
console.log('console.log(remove(["a", "b", "c", "d", "e"], 2));:',remove(["a", "b", "c", "d", "e"], 2));
// → ["a", "b", "d", "e"]