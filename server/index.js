const express = require('express');
const app = express();
const cors = require('cors');
const port = 3042;

const { verifySignature } = require('./services');

app.use(cors());
app.use(express.json());

// const balances = {
//   e2659602ed58ae16d8e1802c8606bf53e0a79169: 100,
//   '0xde0ea973d8c247d14370d7b4c15b0538614305b8': 50,
//   '0xc3bc75107d3603089ee0c55a921703c652b5be0d': 75,
// };

const balances = {
  e2659602ed58ae16d8e1802c8606bf53e0a79169: 100,
  de0ea973d8c247d14370d7b4c15b0538614305b8: 50,
  c3bc75107d3603089ee0c55a921703c652b5be0d: 75,
  '2f63f3759ccb43aa99eb184a5df370757ed9228a': 100,
  '9a13cf1ba1c9c4ab2557ef5e58d905a388e01b91': 99,
};

// '2f63f3759ccb43aa99eb184a5df370757ed9228a': 100,
// '9a13cf1ba1c9c4ab2557ef5e58d905a388e01b91': 99,
// Private key: 9a6751c9d27450370236f557dddc1ed8cfef1ac0f7e9fdf706e22790df6cb872
// Public key: e2659602ed58ae16d8e1802c8606bf53e0a79169

// Private key: 0c51b8bd66da5abbd6054072383702fe3e8c3db25eac07550b8eda0413e10eb8
// Public key: de0ea973d8c247d14370d7b4c15b0538614305b8

// Private key: ad52f376462947653ab4c57bab51156e546f5d8503dcde7d5847c13e8bf2c947
// Public key: c3bc75107d3603089ee0c55a921703c652b5be0d

app.get('/balance/:address', (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post('/send', (req, res) => {
  const { sender, recipient, amount, signature } = req.body;

  const msg = JSON.stringify({
    recipient,
    amount,
  });

  try {
    let isValid = verifySignature(signature, msg, sender);
    if (isValid === false) {
      res.status(400).send({ message: 'Invalid Signature!' });
      return;
    }
  } catch (ex) {
    console.log('Logging to the console the exception error: ');
    console.log(ex);
    res.status(400).send({ message: 'Invalid Signature!' });
    return;
  }

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: 'Not enough funds!' });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
