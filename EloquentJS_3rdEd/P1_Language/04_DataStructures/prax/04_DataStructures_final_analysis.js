let x = `
function journalEvents(journal) {
    let events = [];
    for (let entry of journal) {
      for (let event of entry.events) {
        if (!events.includes(event)) {
          events.push(event);
        }
      }
    }
    return events;
  }
  
  console.log(journalEvents(JOURNAL));
  // → ["carrot", "exercise", "weekend", "bread", …]
`;

console.log(x);

function journalEvents(journal) {
    let events = [];
    for (let entry of journal) {
      for (let event of entry.events) {
        if (!events.includes(event)) {
          events.push(event);
        }
      }
    }
    return events;
  }
  
  console.log(journalEvents(JOURNAL));
  // → ["carrot", "exercise", "weekend", "bread", …]

x = `
for (let event of journalEvents(JOURNAL)) {
    console.log(event + ":", phi(tableFor(event, JOURNAL)));
  }
  // → carrot:   0.0140970969
  // → exercise: 0.0685994341
  // → weekend:  0.1371988681
  // → bread:   -0.0757554019
  // → pudding: -0.0648203724
  // and so on...
`

console.log(x);

for (let event of journalEvents(JOURNAL)) {
    console.log(event + ":", phi(tableFor(event, JOURNAL)));
  }
  // → carrot:   0.0140970969
  // → exercise: 0.0685994341
  // → weekend:  0.1371988681
  // → bread:   -0.0757554019
  // → pudding: -0.0648203724
  // and so on...


x = `
for (let event of journalEvents(JOURNAL)) {
    let correlation = phi(tableFor(event, JOURNAL));
    if (correlation > 0.1 || correlation < -0.1) {
      console.log(event + ":", correlation);
    }
  }
  // → weekend:        0.1371988681
  // → brushed teeth: -0.3805211953
  // → candy:          0.1296407447
  // → work:          -0.1371988681
  // → spaghetti:      0.2425356250
  // → reading:        0.1106828054
  // → peanuts:        0.5902679812
`;

console.log(x);

for (let event of journalEvents(JOURNAL)) {
    let correlation = phi(tableFor(event, JOURNAL));
    if (correlation > 0.1 || correlation < -0.1) {
      console.log(event + ":", correlation);
    }
  }
  // → weekend:        0.1371988681
  // → brushed teeth: -0.3805211953
  // → candy:          0.1296407447
  // → work:          -0.1371988681
  // → spaghetti:      0.2425356250
  // → reading:        0.1106828054
  // → peanuts:        0.5902679812

  