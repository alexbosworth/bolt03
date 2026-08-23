const {deepStrictEqual} = require('node:assert').strict;
const test = require('node:test');

const {isToLocalOutput} = require('./../../types');

const tests = [
  {
    args: {program: ''},
    description: 'Empty program is not local output',
    expected: false,
  },
  {
    args: {
      program: '63210275600fb92663ce98cfeeefe5bf3c03964848a07702bc42db4c608e0fbf99050867025802b27521035a12f81dfd50677a2256300f03b6c3c2ab133c8a9e423dfd5fad41edbf5a7dcc68ac',
    },
    description: 'To local program',
    expected: true,
  },
  {
    args: {
      program: '63210275600fb92663ce98cfeeefe5bf3c03964848a07702bc42db4c608e0fbf9905086755b27521035a12f81dfd50677a2256300f03b6c3c2ab133c8a9e423dfd5fad41edbf5a7dcc68ac',
    },
    description: 'To local program with small csv delay encoded as an opcode',
    expected: true,
  },
  {
    args: {
      program: '63210275600fb92663ce98cfeeefe5bf3c03964848a07702bc42db4c608e0fbf99050867025802b27521035a12f81dfd50677a2256300f03b6c3c2ab133c8a9e423dfd5fad41edbf5a7dcc68ad',
    },
    description: 'Program with an unexpected opcode is not to local',
    expected: false,
  },
  {
    args: {
      program: '63210275600fb92663ce98cfeeefe5bf3c03964848a07702bc42db4c608e0fbf99050867025802b25521035a12f81dfd50677a2256300f03b6c3c2ab133c8a9e423dfd5fad41edbf5a7dcc68ac',
    },
    description: 'Program with a small value opcode in the wrong place is not to local',
    expected: false,
  },
  {
    args: {
      program: '63200275600fb92663ce98cfeeefe5bf3c03964848a07702bc42db4c608e0fbf990567025802b27521035a12f81dfd50677a2256300f03b6c3c2ab133c8a9e423dfd5fad41edbf5a7dcc68ac',
    },
    description: 'Program with a short public key is not to local',
    expected: false,
  },
];

tests.forEach(({args, description, expected}) => {
  return test(description, (t, end) => {
    deepStrictEqual(isToLocalOutput(args), expected, 'To local as expected');

    return end();
  });
});
