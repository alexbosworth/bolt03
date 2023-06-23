const {OP_1} = require('bitcoin-ops');
const {OP_CHECKSEQUENCEVERIFY} = require('bitcoin-ops');
const {OP_CHECKSIGVERIFY} = require('bitcoin-ops');
const {script} = require('bitcoinjs-lib');

const {publicKeyByteLength} = require('./../constants');

const {decompile} = script;

/** Determine if a decompiled script is a v1 to remote output script

  {
    program: <Witness Program Hex String>
  }

  @returns
  <Is To Remote Script Bool>
*/
module.exports = ({program}) => {
  const script = decompile(Buffer.from(program, 'hex'));

  const toRemoteOutput = [
    'public_key', OP_CHECKSIGVERIFY,
    OP_1, OP_CHECKSEQUENCEVERIFY,
  ];

  if (script.length !== toRemoteOutput.length) {
    return false;
  }

  const invalidElement = script.find((element, i) => {
    if (toRemoteOutput[i] === element) {
      return false;
    }

    if (!Buffer.isBuffer(element) && !(element >= OP_2 && element <= OP_16)) {
      return true;
    }

    switch (toRemoteOutput[i]) {
    case 'public_key':
      return element.length !== publicKeyByteLength;

    default:
      return true;
    }
  });

  return !invalidElement;
};
