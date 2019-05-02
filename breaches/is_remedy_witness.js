const {OP_CHECKSEQUENCEVERIFY} = require('bitcoin-ops');
const {OP_CHECKSIG} = require('bitcoin-ops');
const {OP_DROP} = require('bitcoin-ops');
const {OP_ELSE} = require('bitcoin-ops');
const {OP_ENDIF} = require('bitcoin-ops');
const {OP_IF} = require('bitcoin-ops');
const {script} = require('bitcoinjs-lib');

const {dummyNumberBytes} = require('./constants');
const {dummyPubKeyBytes} = require('./constants');
const {dummySignatureBytes} = require('./constants');
const {opTrueBytes} = require('./constants');

const {decompile} = script;
const dummySignature = Buffer.from(dummySignatureBytes, 'hex');
const {isArray} = Array;
const opTrue = Buffer.from(opTrueBytes, 'hex');

const toLocal = [
  OP_IF,
  Buffer.from(dummyPubKeyBytes, 'hex'),
  OP_ELSE,
  Buffer.from(dummyNumberBytes, 'hex'),
  OP_CHECKSEQUENCEVERIFY,
  OP_DROP,
  Buffer.from(dummyPubKeyBytes, 'hex'),
  OP_ENDIF,
  OP_CHECKSIG,
];

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

  const scriptElements = decompile(toLocalScript);

  // Witness script must have the correct number of elements
  if (scriptElements.length !== toLocal.length) {
    return {is_remedy: false};
  }

  const incorrectScriptElement = scriptElements.find((element, i) => {
    const expectedElement = toLocal[i];

    if (Buffer.isBuffer(element)) {
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
