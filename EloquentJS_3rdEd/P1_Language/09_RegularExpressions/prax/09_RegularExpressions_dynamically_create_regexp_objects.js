let name = "harry";
let regexp = new RegExp("(^|\\s)" + name + "($|\\s)", "gi");
console.log(regexp.test("Harry is a dodgy character."));
// → true

let name_ = "dea+hl[]rd";
let escaped = name_.replace(/[\\[.+*?(){|^$]/g, "\\$&");
let regexp_ = new RegExp("(^|\\s)" + escaped + "($|\\s)",
                        "gi");
let text = "This dea+hl[]rd guy is super annoying.";
console.log(regexp_.test(text));
// → true

