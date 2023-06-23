const {OP_16} = require('bitcoin-ops');
const {OP_CHECKSEQUENCEVERIFY} = require('bitcoin-ops');
const {OP_CHECKSIG} = require('bitcoin-ops');
const {OP_DROP} = require('bitcoin-ops');
const {OP_ENDIF} = require('bitcoin-ops');
const {OP_IFDUP} = require('bitcoin-ops');
const {OP_NOTIF} = require('bitcoin-ops');
const {script} = require('bitcoinjs-lib');

const {publicKeyByteLength} = require('./../constants');

const {decompile} = script;

/** Determine if a decompiled script is an anchor script

  {
    program: <Witness Program Hex String>
  }

  @returns
  <Is To Local Script Bool>
*/
module.exports = ({program}) => {
  const script = decompile(Buffer.from(program, 'hex'));

  const anchorOutput = [
    'public_key', OP_CHECKSIG, OP_IFDUP,
    OP_NOTIF,
      OP_16, OP_CHECKSEQUENCEVERIFY,
    OP_ENDIF,
  ];

  if (script.length !== anchorOutput.length) {
    return false;
  }

  const invalidElement = script.find((element, i) => {
    if (anchorOutput[i] === element) {
      return false;
    }

    if (!Buffer.isBuffer(element) && !(element >= OP_2 && element <= OP_16)) {
      return true;
    }

    switch (anchorOutput[i]) {
    case 'public_key':
      return element.length !== publicKeyByteLength;

    default:
      return true;
    }
  });

  return !invalidElement;
};
