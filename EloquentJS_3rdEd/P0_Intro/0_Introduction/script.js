let total = 0, count = 1;
while (count <=10) {
    total += count;
    count += 1;
}
console.log(total);

// TYPOGRAPHIC CONVENTIONS

function factorial(n) {
    if (n == 0) {
        return 1;
    } else {
        return factorial(n-1)*n
    }
}

let x = factorial(8)
console.log(x);