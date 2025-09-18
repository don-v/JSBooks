async function fileSizes(files) {
  let list = "";
  await Promise.all(files.map(async fileName => {
    list += fileName + ": " +
      (await textFile(fileName)).length + "\n";
  }));
  return list;
}

fileSizes(["plans.txt", "shopping_list.txt"])
  .then(console.log);