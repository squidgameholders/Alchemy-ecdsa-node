## strose

<!-- https://university.alchemy.com/course/ethereum/md/632dc78559c9c00004791afd -->

Helpful Resources

We're going to be incorporating the concepts we learned from this week into the final project. Here are a few resources you'll find helpful when working on this project:

Public Key Exercises in the Digital Signatures lesson (Recover Keys, Sign Message, Hash Messages)
The Ethereum Cryptography library https://github.com/ethereum/js-ethereum-cryptography - specifically random private key generation https://github.com/ethereum/js-ethereum-cryptography#secp256k1-curve .

## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions

For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4

### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder
2. Run `npm install` to install all the depedencies
3. Run `node index` to start the server

The application should connect to the default server port (3042) automatically!

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

Addresses used:
Private key: 9a6751c9d27450370236f557dddc1ed8cfef1ac0f7e9fdf706e22790df6cb872
Public key: e2659602ed58ae16d8e1802c8606bf53e0a79169

Private key: 0c51b8bd66da5abbd6054072383702fe3e8c3db25eac07550b8eda0413e10eb8
Public key: de0ea973d8c247d14370d7b4c15b0538614305b8

Private key: ad52f376462947653ab4c57bab51156e546f5d8503dcde7d5847c13e8bf2c947
Public key: c3bc75107d3603089ee0c55a921703c652b5be0d

Private key: dab52c790303e3d683537930c8b4175abca4a2e02f7393ad1f1296843313a155
Public key: 2f63f3759ccb43aa99eb184a5df370757ed9228a

Private key: c6082772427109275f96b4e2f730a2aa9555c17d7d224229f82677173e50dda0
Public key: 9a13cf1ba1c9c4ab2557ef5e58d905a388e01b91

## To get full digital signature:

cd scripts
node signer.js -p PRIVATE_KEY -d MESSAGE_HEX
