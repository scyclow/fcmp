const Transfer = require('../models/Transfer');

async function find (req, res) {
  try {
    const transfers = await Transfer.find();
    res.send(transfers);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

async function create (req, res) {
  const { payer, payee, amount } = req.body;

  try {
    const transfer = await Transfer.register({ payer, payee, amount });
    res.send(transfer);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

async function execute (req, res) {
  const { payerToken, transferId: _id } = req.body;

  try {
    const transfer = await Transfer.findOne({ _id })
    const execution = await transfer.execute(payerToken);
    res.status(200).send(execution);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = { find, create, execute };
