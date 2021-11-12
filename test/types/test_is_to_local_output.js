const {test} = require('@alexbosworth/tap');

const {isToLocalOutput} = require('./../../types');

const tests = [
  {
    args: {program: ''},
    description: 'Empty program is not local output',
    expected: false,
  },
  {
    args: {program: '63210275600fb92663ce98cfeeefe5bf3c03964848a07702bc42db4c608e0fbf99050867025802b27521035a12f81dfd50677a2256300f03b6c3c2ab133c8a9e423dfd5fad41edbf5a7dcc68ac'},
    description: 'To local program',
    expected: true,
  },
];

tests.forEach(({args, description, expected}) => {
  return test(description, ({end, equal}) => {
    equal(isToLocalOutput(args), expected, 'To local is as expected');

    return end();
  });
});
