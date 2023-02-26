const secp = require('ethereum-cryptography/secp256k1');
const { keccak256 } = require('ethereum-cryptography/keccak');
const { utf8ToBytes, toHex } = require('ethereum-cryptography/utils');

function extractPublicKey(fullKey) {
  let kec = keccak256(fullKey.slice(1, fullKey.length));
  return toHex(kec.slice(kec.length - 20, kec.length));
}

function getAddress(publicKey) {
  // slice of the first byte of the Uint8Array publicKey
  const sliceKey = publicKey.slice(1);
  // hash the rest of the public key => returns a Uint8Array keccak256 hash
  const hashKey = keccak256(sliceKey);
  // return last 20 bytes of the Uint8Array keccak256 hash
  return hashKey.slice(-20);
}

function verifySignature(sig, msg, pubKey) {
  const msgHash = keccak256(utf8ToBytes(msg));
  let actualSignature = sig.slice(0, sig.length - 1);
  let recoveryBit = parseInt(sig[sig.length - 1]);
  const sigPubKey = secp.recoverPublicKey(
    msgHash,
    actualSignature,
    recoveryBit
  );
  const mainKey = extractPublicKey(sigPubKey);
  return mainKey == pubKey;
}

module.exports = {
  verifySignature,
  extractPublicKey,
  getAddress,
};
