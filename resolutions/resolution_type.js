const {componentsOfTransaction} = require('@alexbosworth/blockchain');

const channelResolution = require('./channel_resolution');

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
  const {inputs} = componentsOfTransaction({transaction});

  const witness = inputs[vin].witness || [];

  return {type: channelResolution({witness}).type};
};
