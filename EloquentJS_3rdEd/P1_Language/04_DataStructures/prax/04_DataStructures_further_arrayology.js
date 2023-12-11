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