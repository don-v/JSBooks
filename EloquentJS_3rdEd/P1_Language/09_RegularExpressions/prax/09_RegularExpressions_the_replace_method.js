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

