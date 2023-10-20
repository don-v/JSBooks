let ex = `let launchMissiles = function() {
    missileSystem.launch("now");
  };
  if (safeMode) {
    launchMissiles = function() {/* do nothing */};
  }`;

console.log(ex);

let launchMissiles = function() {
    missileSystem.launch("now");
  };
  if (safeMode) {
    launchMissiles = function() {/* do nothing */};
  }