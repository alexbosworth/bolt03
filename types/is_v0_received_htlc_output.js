const {OP_2} = require('bitcoin-ops');
const {OP_CHECKLOCKTIMEVERIFY} = require('bitcoin-ops');
const {OP_CHECKMULTISIG} = require('bitcoin-ops');
const {OP_CHECKSIG} = require('bitcoin-ops');
const {OP_DROP} = require('bitcoin-ops');
const {OP_DUP} = require('bitcoin-ops');
const {OP_ELSE} = require('bitcoin-ops');
const {OP_ENDIF} = require('bitcoin-ops');
const {OP_EQUAL} = require('bitcoin-ops');
const {OP_EQUALVERIFY} = require('bitcoin-ops');
const {OP_HASH160} = require('bitcoin-ops');
const {OP_IF} = require('bitcoin-ops');
const {OP_SIZE} = require('bitcoin-ops');
const {OP_SWAP} = require('bitcoin-ops');
const {script} = require('bitcoinjs-lib');

const {hash160ByteLength} = require('./../constants');
const {publicKeyByteLength} = require('./../constants');

const {decompile} = script;

/** Determine if a decompiled script is a v0 received htlc output script

  {
    program: <Witness Program Hex String>
  }

  @returns
  <Is Offered HTLC Script Bool>
*/
module.exports = ({program}) => {
  const script = decompile(Buffer.from(program, 'hex'));

  const template = [
    // To remote node with revocation key
    OP_DUP, OP_HASH160, 'public_key_hash', OP_EQUAL,
    OP_IF,
      OP_CHECKSIG,
    OP_ELSE,
      'public_key', OP_SWAP, OP_SIZE, 'number', OP_EQUAL,
      OP_IF,
        // To local node via HTLC-success transaction.
        OP_HASH160, 'payment_hash', OP_EQUALVERIFY, OP_2, OP_SWAP, 'public_key',
          OP_2, OP_CHECKMULTISIG,
      OP_ELSE,
        // To remote node after timeout.
        OP_DROP, 'number', OP_CHECKLOCKTIMEVERIFY, OP_DROP, OP_CHECKSIG,
      OP_ENDIF,
    OP_ENDIF,
  ];

  if (script.length !== template.length) {
    return false;
  }

  const invalidElement = script.find((element, i) => {
    if (template[i] === element) {
      return false;
    }

    if (!Buffer.isBuffer(element)) {
      return true;
    }

    switch (template[i]) {
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
