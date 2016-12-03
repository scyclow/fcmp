const Account = require('../models/Account');

async function find (req, res) {
  try {
    const accounts = await Account.find();
    res.send(accounts);
  }
  catch (error) {
    res.status(500).send({ error });
  }
}

async function create (req, res) {
  try {
    const account = await Account.create({});
    const secretToken = await account.createToken();
    res.send({
      secretToken,
      address: account.address,
      balance: account.balance,
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).send({ error });
  }
}


module.exports = { find, create };
