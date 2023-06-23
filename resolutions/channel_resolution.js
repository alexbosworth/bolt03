const {isAnchorOutput} = require('./../types');
const {isToLocalOutput} = require('./../types');
const {isV0OfferedHtlcOutput} = require('./../types');
const {isV1OfferedHtlcOutput} = require('./../types');
const {isV0ReceivedHtlcOutput} = require('./../types');
const {isV1ReceivedHtlcOutput} = require('./../types');
const {isV1ToRemoteOutput} = require('./../types');

const {preimageByteLength} = require('./../constants');
const {publicKeyByteLength} = require('./../constants');

const sigLen = 69;

/** Channel resolution details from witness

  {
    witness: [<Witness Hex String>]
  }

  @returns
  {
    [type]: <Channel Resolution Type String>
  }
*/
module.exports = ({witness}) => {
  const [program] = witness.slice().reverse();

  if (Buffer.from(program, 'hex').length === publicKeyByteLength) {
    return {type: 'p2wpkh'};
  }

  if (isAnchorOutput({program})) {
    return {type: 'anchor'};
  }

  if (isToLocalOutput({program})) {
    const [p1, p2] = witness.map(n => Buffer.from(n, 'hex').length);

    if (p1 > sigLen && !p2.length) {
      return {type: 'csv_delayed'};
    }

    return {type: 'to_local_breach'};
  }

  if (isV0OfferedHtlcOutput({program}) || isV1OfferedHtlcOutput({program})) {
    const [p1, p2, p3, p4] = witness.map(n => Buffer.from(n, 'hex').length);

    if (!p1 && p2 > sigLen && p3 > sigLen && !p4) {
      return {type: 'offered_htlc_timeout'};
    }

    if (p1 > sigLen && p2 === preimageByteLength && !p4) {
      return {type: 'offered_htlc_settled'};
    }

    return {type: 'offered_htlc'};
  }

  if (isV0ReceivedHtlcOutput({program}) || isV1ReceivedHtlcOutput({program})) {
    const [p1, p2, p3, p4] = witness.map(n => Buffer.from(n, 'hex').length);

    if (p1 > sigLen && !p2) {
      return {type: 'received_htlc_timeout'};
    }

    if (!p1 && p2 > sigLen && p3 > sigLen && p4 === preimageByteLength) {
      return {type: 'received_htlc_settled'};
    }

    if (p1 > sigLen && p2 === publicKeyByteLength) {
      return {type: 'received_htlc_breach'};
    }

    return {type: 'received_htlc'};
  }

  if (isV1ToRemoteOutput({program})) {
    return {type: 'to_remote'};
  }

  return {type: 'unknown'};
};
