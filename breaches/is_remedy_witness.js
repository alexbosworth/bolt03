const {scriptAsScriptElements} = require('@alexbosworth/blockchain');

const {dummyNumberBytes} = require('./constants');
const {dummyPubKeyBytes} = require('./constants');
const {dummySignatureBytes} = require('./constants');
const {OP_CHECKSEQUENCEVERIFY} = require('./../ops');
const {OP_CHECKSIG} = require('./../ops');
const {OP_DROP} = require('./../ops');
const {OP_ELSE} = require('./../ops');
const {OP_ENDIF} = require('./../ops');
const {OP_IF} = require('./../ops');
const {opTrueBytes} = require('./constants');

const bufferAsHex = buffer => buffer.toString('hex');
const dummySignature = Buffer.from(dummySignatureBytes, 'hex');
const hexAsBuffer = hex => Buffer.from(hex, 'hex');
const {isArray} = Array;
const {isBuffer} = Buffer;
const opTrue = Buffer.from(opTrueBytes, 'hex');

/** Determine if witness elements represent a to_local breach remedy witness

  {
    witness: [<Witness Element Number or Buffer>]
  }

  @returns
  {
    is_remedy: <Witness Elements Are Breach Remedy Witness Elements Bool>
  }
*/
module.exports = ({witness}) => {
  // Must have a witness
  if (!isArray(witness)) {
    return {is_remedy: false};
  }

  const toLocal = [
    OP_IF,
    hexAsBuffer(dummyPubKeyBytes),
    OP_ELSE,
    hexAsBuffer(dummyNumberBytes),
    OP_CHECKSEQUENCEVERIFY,
    OP_DROP,
    hexAsBuffer(dummyPubKeyBytes),
    OP_ENDIF,
    OP_CHECKSIG,
  ];

  // Witness must have the correct number of elements
  if (witness.length !== [dummySignature, opTrue, toLocal].length) {
    return {is_remedy: false};
  }

  const [signature, flag, toLocalScript] = witness;

  // Signature must have a normal signature length
  if (signature.length < dummySignature.length) {
    return {is_remedy: false};
  }

  // Script path must be one of justice
  if (!flag.equals(opTrue)) {
    return {is_remedy: false};
  }

  const script = bufferAsHex(toLocalScript);

  const scriptElements = scriptAsScriptElements({script}).elements;

  // Witness script must have the correct number of elements
  if (scriptElements.length !== toLocal.length) {
    return {is_remedy: false};
  }

  const incorrectScriptElement = scriptElements.find((element, i) => {
    const expectedElement = toLocal[i];

    if (isBuffer(element)) {
      return element.length < expectedElement.length;
    }

    return element !== expectedElement;
  });

  // Elements in the witness script must be correct
  if (!!incorrectScriptElement) {
    return {is_remedy: false};
  }

  return {is_remedy: true};
};
