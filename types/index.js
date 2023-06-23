const isAnchorOutput = require('./is_anchor_output');
const isV0OfferedHtlcOutput = require('./is_v0_offered_htlc_output');
const isV1OfferedHtlcOutput = require('./is_v1_offered_htlc_output');
const isV0ReceivedHtlcOutput = require('./is_v0_received_htlc_output');
const isV1ReceivedHtlcOutput = require('./is_v1_received_htlc_output');
const isV1ToRemoteOutput = require('./is_v1_to_remote_output');
const isToLocalOutput = require('./is_to_local_output');

module.exports = {
  isAnchorOutput,
  isToLocalOutput,
  isV0OfferedHtlcOutput,
  isV0ReceivedHtlcOutput,
  isV1OfferedHtlcOutput,
  isV1ReceivedHtlcOutput,
  isV1ToRemoteOutput,
};
