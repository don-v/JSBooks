for (;;) {
    try {
      let dir = promtDirection("Where?"); // ← typo!
      console.log("You chose ", dir);
      break;
    } catch (e) {
      console.log("Not a valid direction. Try again.");
    }
  }

  class InputError extends Error {}

  function promptDirection(question) {
    let result = prompt(question);
    if (result.toLowerCase() == "left") return "L";
    if (result.toLowerCase() == "right") return "R";
    throw new InputError("Invalid direction: " + result);
  }

  for (;;) {
    try {
      let dir = promptDirection("Where?");
      console.log("You chose ", dir);
      break;
    } catch (e) {
      if (e instanceof InputError) {
        console.log("Not a valid direction. Try again.");
      } else {
        throw e;
      }
    }
  }