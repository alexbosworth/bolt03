const {test} = require('@alexbosworth/tap');

const {isRemedyWitness} = require('./../../breaches');

const tests = [
  {
    args: {
      witness: [
        Buffer.from('30440220057aa1cc55cbefe3a1328076786a69fb57434aaa8814ad08046c8945d0e1ba0f02200a4e63a61ebff05ab103596a542ac5a5e838c99e30df64b2576be5fd88601fc901', 'hex'),
        Buffer.from('01', 'hex'),
        Buffer.from('6321022b50555786b74f857731ed08dc0231d2ac0a6e11f017b5f02da1d4a8dca3a4736702a005b2752103190a83ada11aa171925a9bf217c8cadae187df42195b48ce0129270bba5997c068ac', 'hex'),
      ],
    },
    description: 'Breach remedy found',
    expected: true,
  },
  {
    args: {
      witness: [
        Buffer.from('30440220057aa1cc55cbefe3a1328076786a69fb57434aaa8814ad08046c8945d0e1ba0f02200a4e63a61ebff05ab103596a542ac5a5e838c99e30df64b2576be5fd88601fc901', 'hex'),
        Buffer.from('00', 'hex'),
        Buffer.from('6321022b50555786b74f857731ed08dc0231d2ac0a6e11f017b5f02da1d4a8dca3a4736702a005b2752103190a83ada11aa171925a9bf217c8cadae187df42195b48ce0129270bba5997c068ac', 'hex'),
      ],
    },
    description: 'Breach remedy not found',
    expected: false,
  },
];

tests.forEach(({args, description, expected}) => {
  return test(description, ({end, equal}) => {
    const isRemedy = isRemedyWitness(args);

    equal(isRemedy.is_remedy, expected, 'Remedy is detected');

    return end();
  });
});
