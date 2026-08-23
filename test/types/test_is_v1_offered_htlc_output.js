const {deepStrictEqual} = require('node:assert').strict;
const test = require('node:test');

const {isV1OfferedHtlcOutput} = require('./../../types');

const tests = [
  {
    args: {program: ''},
    description: 'Empty program is not a v1 offered HTLC output',
    expected: false,
  },
  {
    args: {
      program: '76a9146cc6ab1f4438290bc7841bab7bc909e24039d23f8763ac672102178dfa6581cc59dc5e7393531818d9aeb17a1c76c4573e973dd3ff3fc0550a497c820120876475527c2103fd0f080ede7bc533711b8b2e567ee3d2dc4db92056b8b940866046ee6746ecd652ae67a91478c4b99102eea1bfc56f6befe7b9b8e482136db888ac6851b27568',
    },
    description: 'V1 offered HTLC output',
    expected: true,
  },
  {
    args: {
      program: '76a9146cc6ab1f4438290bc7841bab7bc909e24039d23f8763ac672102178dfa6581cc59dc5e7393531818d9aeb17a1c76c4573e973dd3ff3fc0550a497c820120876475527c2103fd0f080ede7bc533711b8b2e567ee3d2dc4db92056b8b940866046ee6746ecd652ae67a91478c4b99102eea1bfc56f6befe7b9b8e482136db888ac6861b27568',
    },
    description: 'Program with an unexpected opcode is not a v1 offered HTLC',
    expected: false,
  },
  {
    args: {
      program: '76a9146cc6ab1f4438290bc7841bab7bc909e24039d23f8763ac672102178dfa6581cc59dc5e7393531818d9aeb17a1c76c4573e973dd3ff3fc0550a497c820120876475527c2103fd0f080ede7bc533711b8b2e567ee3d2dc4db92056b8b940866046ee6746ecd652ae67a91478c4b99102eea1bfc56f6befe7b9b8e482136db888ac680100b27568',
    },
    description: 'Program with a push in an opcode slot is not a v1 offered HTLC',
    expected: false,
  },
];

tests.forEach(({args, description, expected}) => {
  return test(description, (t, end) => {
    deepStrictEqual(isV1OfferedHtlcOutput(args), expected, 'Got result');

    return end();
  });
});
