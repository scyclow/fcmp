const Account = require('../models/Account');

async function find (req, res) {
  try {
    const accounts = await Account.find();
    res.send(accounts);
  }
  catch (error) {
    res.status(500).send({ error: error.message });
  }
}

async function create (req, res) {
  try {
    const { address, balance, createToken } = await Account.create({});
    const secretToken = await createToken();
    res.send({ secretToken, address, balance });
  }
  catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}


module.exports = { find, create };
