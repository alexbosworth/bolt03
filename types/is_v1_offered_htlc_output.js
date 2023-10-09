const {scriptAsScriptElements} = require('@alexbosworth/blockchain');

const {hash160ByteLength} = require('./../constants');
const {OP_1} = require('./../ops');
const {OP_2} = require('./../ops');
const {OP_CHECKMULTISIG} = require('./../ops');
const {OP_CHECKSEQUENCEVERIFY} = require('./../ops');
const {OP_CHECKSIG} = require('./../ops');
const {OP_DROP} = require('./../ops');
const {OP_DUP} = require('./../ops');
const {OP_ELSE} = require('./../ops');
const {OP_ENDIF} = require('./../ops');
const {OP_EQUAL} = require('./../ops');
const {OP_EQUALVERIFY} = require('./../ops');
const {OP_HASH160} = require('./../ops');
const {OP_IF} = require('./../ops');
const {OP_NOTIF} = require('./../ops');
const {OP_SIZE} = require('./../ops');
const {OP_SWAP} = require('./../ops');
const {publicKeyByteLength} = require('./../constants');

const {isBuffer} = Buffer;

/** Determine if a decompiled script is a v1 offered htlc output script

  {
    program: <Witness Program Hex String>
  }

  @returns
  <Is Offered HTLC Script Bool>
*/
module.exports = ({program}) => {
  const script = scriptAsScriptElements({script: program}).elements;

  const offeredHtlcOutput = [
    // To remote node with revocation key
    OP_DUP, OP_HASH160, 'public_key_hash', OP_EQUAL,
    OP_IF,
      OP_CHECKSIG,
    OP_ELSE,
      'public_key', OP_SWAP, OP_SIZE, 'number', OP_EQUAL,
      OP_NOTIF,
        // To local node via HTLC-timeout transaction (timelocked).
        OP_DROP, OP_2, OP_SWAP, 'public_key', OP_2, OP_CHECKMULTISIG,
      OP_ELSE,
        // To remote node with preimage.
        OP_HASH160, 'payment_hash', OP_EQUALVERIFY,
        OP_CHECKSIG,
      OP_ENDIF,
      // Do not allow the child spend to be in the same block
      OP_1, OP_CHECKSEQUENCEVERIFY, OP_DROP,
    OP_ENDIF,
  ];

  if (!script || script.length !== offeredHtlcOutput.length) {
    return false;
  }

  const invalidElement = script.find((element, i) => {
    if (offeredHtlcOutput[i] === element) {
      return false;
    }

    if (!isBuffer(element)) {
      return true;
    }

    switch (offeredHtlcOutput[i]) {
    case 'number':
      return false;

    case 'public_key':
      return element.length !== publicKeyByteLength;

    case 'payment_hash':
    case 'public_key_hash':
      return element.length !== hash160ByteLength;

    default:
      return true;
    }
  });

  return !invalidElement;
};
