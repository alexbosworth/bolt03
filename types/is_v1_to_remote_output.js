const {scriptAsScriptElements} = require('@alexbosworth/blockchain');

const {OP_1} = require('./../ops');
const {OP_CHECKSEQUENCEVERIFY} = require('./../ops');
const {OP_CHECKSIGVERIFY} = require('./../ops');
const {publicKeyByteLength} = require('./../constants');

const {isBuffer} = Buffer;

/** Determine if a decompiled script is a v1 to remote output script

  {
    program: <Witness Program Hex String>
  }

  @returns
  <Is To Remote Script Bool>
*/
module.exports = ({program}) => {
  const script = scriptAsScriptElements({script: program}).elements;

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

    if (!isBuffer(element) && !(element >= OP_2 && element <= OP_16)) {
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
