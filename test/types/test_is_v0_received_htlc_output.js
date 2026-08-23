const {deepStrictEqual} = require('node:assert').strict;
const test = require('node:test');

const {isV0ReceivedHtlcOutput} = require('./../../types');

const tests = [
  {
    args: {program: ''},
    description: 'Empty program is not a received HTLC output',
    expected: false,
  },
  {
    args: {
      program: '76a9141ae1de0ffd68893bd5f6fc31b993e80555df4cd58763ac6721035ccefb1942ba7b276b9a6776cff0114e9049fddde33d24c5d9aabc617c820dad7c8201208763a914bd01f43874d2df813b7a75abfa9afc4dbbc6c51a88527c2103451ba18893b9fb9b3c2958a37903a0f994b3c6b24f2ce882644a1246753c60ce52ae677503969408b175ac6868',
    },
    description: 'Received HTLC output',
    expected: true,
  },
  {
    args: {
      program: '76a9141ae1de0ffd68893bd5f6fc31b993e80555df4cd58763ac6721035ccefb1942ba7b276b9a6776cff0114e9049fddde33d24c5d9aabc617c820dad7c8201208763a914bd01f43874d2df813b7a75abfa9afc4dbbc6c51a88527c2103451ba18893b9fb9b3c2958a37903a0f994b3c6b24f2ce882644a1246753c60ce52ae677503969408b175ad6868',
    },
    description: 'Program with an unexpected opcode is not a received HTLC',
    expected: false,
  },
  {
    args: {
      program: '0100a9141ae1de0ffd68893bd5f6fc31b993e80555df4cd58763ac6721035ccefb1942ba7b276b9a6776cff0114e9049fddde33d24c5d9aabc617c820dad7c8201208763a914bd01f43874d2df813b7a75abfa9afc4dbbc6c51a88527c2103451ba18893b9fb9b3c2958a37903a0f994b3c6b24f2ce882644a1246753c60ce52ae677503969408b175ac6868',
    },
    description: 'Program with a push in an opcode slot is not a received HTLC',
    expected: false,
  },
  {
    args: {
      program: '76a913e1de0ffd68893bd5f6fc31b993e80555df4cd58763ac6721035ccefb1942ba7b276b9a6776cff0114e9049fddde33d24c5d9aabc617c820dad7c8201208763a914bd01f43874d2df813b7a75abfa9afc4dbbc6c51a88527c2103451ba18893b9fb9b3c2958a37903a0f994b3c6b24f2ce882644a1246753c60ce52ae677503969408b175ac6868',
    },
    description: 'Program with a short key hash is not a received HTLC',
    expected: false,
  },
];

tests.forEach(({args, description, expected}) => {
  return test(description, (t, end) => {
    deepStrictEqual(isV0ReceivedHtlcOutput(args), expected, 'Got result');

    return end();
  });
});
