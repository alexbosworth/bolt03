const {deepStrictEqual} = require('node:assert').strict;
const test = require('node:test');

const {isAnchorOutput} = require('./../../types');

const tests = [
  {
    args: {program: ''},
    description: 'Empty program is not an anchor output',
    expected: false,
  },
  {
    args: {
      program: '210275600fb92663ce98cfeeefe5bf3c03964848a07702bc42db4c608e0fbf990508ac736460b268',
    },
    description: 'Anchor program',
    expected: true,
  },
  {
    args: {
      program: '210275600fb92663ce98cfeeefe5bf3c03964848a07702bc42db4c608e0fbf99050876736460b268',
    },
    description: 'Near-anchor program with wrong opcode is not an anchor',
    expected: false,
  },
  {
    args: {
      program: '210275600fb92663ce98cfeeefe5bf3c03964848a07702bc42db4c608e0fbf990508ac73645fb268',
    },
    description: 'Program with a small value opcode in the wrong place is no anchor',
    expected: false,
  },
  {
    args: {
      program: '200275600fb92663ce98cfeeefe5bf3c03964848a07702bc42db4c608e0fbf9905ac736460b268',
    },
    description: 'Program with a short public key is not an anchor',
    expected: false,
  },
];

tests.forEach(({args, description, expected}) => {
  return test(description, (t, end) => {
    deepStrictEqual(isAnchorOutput(args), expected, 'Anchor as expected');

    return end();
  });
});
