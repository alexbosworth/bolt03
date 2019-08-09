const {Transaction} = require('bitcoinjs-lib');

const channelResolution = require('./channel_resolution');

const {fromHex} = Transaction;

/** Get resolution type of input

  {
    transaction: <Transaction Hex String>
    vin: <Transaction Input Index Number>
  }

  @throws
  <Error>

  @returns
  {
    type: <Resolution Type String>
  }
*/
module.exports = ({transaction, vin}) => {
  const tx = fromHex(transaction);

  const witness = tx.ins[vin].witness.map(n => n.toString('hex'));

  return {type: channelResolution({witness}).type};
};
