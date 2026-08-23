const {deepStrictEqual} = require('node:assert').strict;
const test = require('node:test');

const {isV1ToRemoteOutput} = require('./../../types');

const tests = [
  {
    args: {program: ''},
    description: 'Empty program is not a to remote output',
    expected: false,
  },
  {
    args: {
      program: '210275600fb92663ce98cfeeefe5bf3c03964848a07702bc42db4c608e0fbf990508ad51b2',
    },
    description: 'To remote program',
    expected: true,
  },
  {
    args: {
      program: '210275600fb92663ce98cfeeefe5bf3c03964848a07702bc42db4c608e0fbf990508ac51b2',
    },
    description: 'Near-to_remote program with wrong opcode is not to remote',
    expected: false,
  },
  {
    args: {
      program: '210275600fb92663ce98cfeeefe5bf3c03964848a07702bc42db4c608e0fbf990508ad5fb2',
    },
    description: 'Program with a small value opcode in the wrong place is not remote',
    expected: false,
  },
  {
    args: {
      program: '200275600fb92663ce98cfeeefe5bf3c03964848a07702bc42db4c608e0fbf9905ad51b2',
    },
    description: 'Program with a short public key is not to remote',
    expected: false,
  },
];

tests.forEach(({args, description, expected}) => {
  return test(description, (t, end) => {
    deepStrictEqual(isV1ToRemoteOutput(args), expected, 'Remote as expected');

    return end();
  });
});
