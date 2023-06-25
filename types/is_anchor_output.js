const {scriptAsScriptElements} = require('@alexbosworth/blockchain');

const {OP_16} = require('./../ops');
const {OP_CHECKSEQUENCEVERIFY} = require('./../ops');
const {OP_CHECKSIG} = require('./../ops');
const {OP_DROP} = require('./../ops');
const {OP_ENDIF} = require('./../ops');
const {OP_IFDUP} = require('./../ops');
const {OP_NOTIF} = require('./../ops');
const {publicKeyByteLength} = require('./../constants');

const {isBuffer} = Buffer;

/** Determine if a decompiled script is an anchor script

  {
    program: <Witness Program Hex String>
  }

  @returns
  <Is To Local Script Bool>
*/
module.exports = ({program}) => {
  const script = scriptAsScriptElements({script: program}).elements;

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

    if (!isBuffer(element) && !(element >= OP_2 && element <= OP_16)) {
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
