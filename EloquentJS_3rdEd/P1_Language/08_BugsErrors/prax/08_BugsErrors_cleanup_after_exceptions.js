const accounts = {
    a: 100,
    b: 0,
    c: 20
  };
  
  function getAccount() {
    let accountName = prompt("Enter an account name");
    if (!Object.hasOwn(accounts, accountName)) {
      throw new Error(`No such account: ${accountName}`);
    }
    return accountName;
  }
  
  function transfer(from, amount) {
    if (accounts[from] < amount) return;
    accounts[from] -= amount;
    accounts[getAccount()] += amount;
  }

  