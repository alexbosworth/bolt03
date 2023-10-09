const {scriptAsScriptElements} = require('@alexbosworth/blockchain');

const {OP_2} = require('./../ops');
const {OP_16} = require('./../ops');
const {OP_CHECKSEQUENCEVERIFY} = require('./../ops');
const {OP_CHECKSIG} = require('./../ops');
const {OP_DROP} = require('./../ops');
const {OP_ELSE} = require('./../ops');
const {OP_ENDIF} = require('./../ops');
const {OP_IF} = require('./../ops');
const {publicKeyByteLength} = require('./../constants');

const {isBuffer} = Buffer;

/** Determine if a decompiled script is a to local output script

  {
    program: <Witness Program Buffer Hex String>
  }

  @returns
  <Is To Local Script Bool>
*/
module.exports = ({program}) => {
  const script = scriptAsScriptElements({script: program}).elements;

  const toLocalOutput = [
    OP_IF,
      // Penalty transaction
      'public_key',
    OP_ELSE,
      // Wait for a delay
      'csv_delay', OP_CHECKSEQUENCEVERIFY, OP_DROP,
      'public_key',
    OP_ENDIF,
    OP_CHECKSIG,
  ];

  if (!script || script.length !== toLocalOutput.length) {
    return false;
  }

  const invalidElement = script.find((element, i) => {
    if (toLocalOutput[i] === element) {
      return false;
    }

    if (!isBuffer(element) && !(element >= OP_2 && element <= OP_16)) {
      return true;
    }

    switch (toLocalOutput[i]) {
    case 'csv_delay':
      return false;

    case 'public_key':
      return element.length !== publicKeyByteLength;

    default:
      return true;
    }
  });

  return !invalidElement;
};
