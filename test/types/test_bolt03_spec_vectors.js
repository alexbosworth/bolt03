const {deepStrictEqual} = require('node:assert').strict;
const test = require('node:test');

const types = require('./../../types');

// Script test vectors from BOLT 03 appendices
//
// Appendix C wscripts are from "commitment tx with all five HTLCs untrimmed"
// Appendix F wscripts are the witness scripts of the HTLC resolution
// transactions of "commitment tx with seven outputs untrimmed"
// The anchor and to_remote scripts are formed as specified using the
// appendix C local_funding_pubkey and remotepubkey values

const tests = [
  {
    args: {
      program: '63210212a140cd0c6539d07cd08dfe09984dec3251ea808b892efeac3ede9402bf2b1967029000b2752103fd5960528dc152014952efdb702a88f71e3c1653b2314431701ec77e57fde83c68ac',
    },
    description: 'Appendix C to_local wscript is a to local output',
    expected: true,
    method: 'isToLocalOutput',
  },
  {
    args: {
      program: '76a91414011f7254d96b819c76986c277d115efce6f7b58763ac67210394854aa6eab5b2a8122cc726e9dded053a2184d88256816826d6231c068d4a5b7c820120876475527c21030d417a46946384f88d5f3337267c5e579765875dc4daca813e21734b140639e752ae67a914b43e1b38138a41b37f7cd9a1d274bc63e3a9b5d188ac6868',
    },
    description: 'Appendix C HTLC 2 offered wscript is a v0 offered HTLC output',
    expected: true,
    method: 'isV0OfferedHtlcOutput',
  },
  {
    args: {
      program: '76a91414011f7254d96b819c76986c277d115efce6f7b58763ac67210394854aa6eab5b2a8122cc726e9dded053a2184d88256816826d6231c068d4a5b7c820120876475527c21030d417a46946384f88d5f3337267c5e579765875dc4daca813e21734b140639e752ae67a914b43e1b38138a41b37f7cd9a1d274bc63e3a9b5d188ac6868',
    },
    description: 'Appendix C HTLC 2 offered wscript is not a v1 offered HTLC',
    expected: false,
    method: 'isV1OfferedHtlcOutput',
  },
  {
    args: {
      program: '76a91414011f7254d96b819c76986c277d115efce6f7b58763ac67210394854aa6eab5b2a8122cc726e9dded053a2184d88256816826d6231c068d4a5b7c8201208763a914b8bcb07f6344b42ab04250c86a6e8b75d3fdbbc688527c21030d417a46946384f88d5f3337267c5e579765875dc4daca813e21734b140639e752ae677502f401b175ac6868',
    },
    description: 'Appendix C HTLC 0 received wscript is a v0 received HTLC output',
    expected: true,
    method: 'isV0ReceivedHtlcOutput',
  },
  {
    args: {
      program: '76a91414011f7254d96b819c76986c277d115efce6f7b58763ac67210394854aa6eab5b2a8122cc726e9dded053a2184d88256816826d6231c068d4a5b7c8201208763a914b8bcb07f6344b42ab04250c86a6e8b75d3fdbbc688527c21030d417a46946384f88d5f3337267c5e579765875dc4daca813e21734b140639e752ae677502f401b175ac6868',
    },
    description: 'Appendix C HTLC 0 received wscript is not a v1 received HTLC',
    expected: false,
    method: 'isV1ReceivedHtlcOutput',
  },
  {
    args: {
      program: '76a91414011f7254d96b819c76986c277d115efce6f7b58763ac67210394854aa6eab5b2a8122cc726e9dded053a2184d88256816826d6231c068d4a5b7c820120876475527c21030d417a46946384f88d5f3337267c5e579765875dc4daca813e21734b140639e752ae67a914b43e1b38138a41b37f7cd9a1d274bc63e3a9b5d188ac6851b27568',
    },
    description: 'Appendix F offered HTLC wscript is a v1 offered HTLC output',
    expected: true,
    method: 'isV1OfferedHtlcOutput',
  },
  {
    args: {
      program: '76a91414011f7254d96b819c76986c277d115efce6f7b58763ac67210394854aa6eab5b2a8122cc726e9dded053a2184d88256816826d6231c068d4a5b7c820120876475527c21030d417a46946384f88d5f3337267c5e579765875dc4daca813e21734b140639e752ae67a914b43e1b38138a41b37f7cd9a1d274bc63e3a9b5d188ac6851b27568',
    },
    description: 'Appendix F offered HTLC wscript is not a v0 offered HTLC',
    expected: false,
    method: 'isV0OfferedHtlcOutput',
  },
  {
    args: {
      program: '76a91414011f7254d96b819c76986c277d115efce6f7b58763ac67210394854aa6eab5b2a8122cc726e9dded053a2184d88256816826d6231c068d4a5b7c8201208763a914b8bcb07f6344b42ab04250c86a6e8b75d3fdbbc688527c21030d417a46946384f88d5f3337267c5e579765875dc4daca813e21734b140639e752ae677502f401b175ac6851b27568',
    },
    description: 'Appendix F received HTLC wscript is a v1 received HTLC output',
    expected: true,
    method: 'isV1ReceivedHtlcOutput',
  },
  {
    args: {
      program: '76a91414011f7254d96b819c76986c277d115efce6f7b58763ac67210394854aa6eab5b2a8122cc726e9dded053a2184d88256816826d6231c068d4a5b7c8201208763a914b8bcb07f6344b42ab04250c86a6e8b75d3fdbbc688527c21030d417a46946384f88d5f3337267c5e579765875dc4daca813e21734b140639e752ae677502f401b175ac6851b27568',
    },
    description: 'Appendix F received HTLC wscript is not a v0 received HTLC',
    expected: false,
    method: 'isV0ReceivedHtlcOutput',
  },
  {
    args: {
      program: '21023da092f6980e58d2c037173180e9a465476026ee50f96695963e8efe436f54ebac736460b268',
    },
    description: 'Anchor script for the local_funding_pubkey is an anchor output',
    expected: true,
    method: 'isAnchorOutput',
  },
  {
    args: {
      program: '210394854aa6eab5b2a8122cc726e9dded053a2184d88256816826d6231c068d4a5bad51b2',
    },
    description: 'Anchors to_remote script for remotepubkey is a to remote output',
    expected: true,
    method: 'isV1ToRemoteOutput',
  },
];

tests.forEach(({args, description, expected, method}) => {
  return test(description, (t, end) => {
    deepStrictEqual(types[method](args), expected, 'Got expected result');

    return end();
  });
});
