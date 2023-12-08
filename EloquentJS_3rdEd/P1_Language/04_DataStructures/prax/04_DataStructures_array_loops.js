let x = `
for (let i = 0; i < JOURNAL.length; i++) {
    let entry = JOURNAL[i];
    // Do something with entry
  }
`;

console.log(x);

for (let i = 0; i < JOURNAL.length; i++) {
    let entry = JOURNAL[i];
    // Do something with entry
  }

x = `
for (let entry of JOURNAL) {
    console.log("{entry.events.length} events.");
  }
`;

console.log(x);

for (let entry of JOURNAL) {
    console.log(`${entry.events.length} events.`);
  }

