console.log("papa".replace("p", "m"));
// → mapa

console.log("Borobudur".replace(/[ou]/, "a"));
// → Barobudur
console.log("Borobudur".replace(/[ou]/g, "a"));
// → Barabadar

console.log(
    "Liskov, Barbara\nMcCarthy, John\nMilner, Robin"
      .replace(/(\p{L}+), (\p{L}+)/gu, "$2 $1"));
  // → Barbara Liskov
  //   John McCarthy
  //   Robin Milner

  let stock = "1 lemon, 2 cabbages, and 101 eggs";
  function minusOne(match, amount, unit) {
    amount = Number(amount) - 1;
    if (amount == 1) { // only one left, remove the 's'
      unit = unit.slice(0, unit.length - 1);
    } else if (amount == 0) {
      amount = "no";
    }
    return amount + " " + unit;
  }
  console.log(stock.replace(/(\d+) (\p{L}+)/gu, minusOne));
  // → no lemon, 1 cabbage, and 100 eggs