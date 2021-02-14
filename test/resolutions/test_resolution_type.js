const {test} = require('tap');

const {resolutionType} = require('./../../resolutions');

const tests = [
  {
    args: {
      transaction: '02000000000101ddcd0a8bac799449d6032f1c09b4ecb2fa1f48c9b801084f1239a7a16e6cc3d20000000000e001000001197f0c00000000001600142837ab3877dabede38c8dc28045b338fd405849e03483045022100d36c08ee9f016c981e83aed10d199d2f8897456b06ce870265adb8fbfc6f36bd0220633acd45d93de8604ea84e030de8d98e8401e32aedf5c3382d7bad603b31fdf301004d6321024196926ad64c09cec89ee66725c5148fd2a52a5eae3a19a5668d70eef8b6a4c36702e001b2752103f87f9850d5529e877caef71d202131c1433c84f6ccb24120e1205ba3124f7cac68acd9ce0800',
      vin: 0,
    },
    description: 'CSV delayed output',
    expected: {type: 'csv_delayed'},
  },
  {
    args: {
      transaction: '02000000000101ac9b0c7789dc910e2d45d0b285a988a5694dcc9097983676431433915dbdc02300000000000000000001e05c0700000000002200200e7844380de5e31e7c40a8679c0273ea0af0295a4d58dc987f51656c0ac539d50500473044022033848e2f1c319111f48e414894562e02ef29a696ce6193d26696848ac6331b7202202d8e673f026a56fee32b93665babf2d4a6e70843da5a7b853ae8e19637d824ba01473044022019e1113150ea58d69a53930872387e5c722c23b8fb399497cc5ac4e276ba2f5902203256c0811db24cba16a09a6165d2cd77033f9dd67a1c2303028f79c089def8d301008576a91459f163aba7b55413a852fb1eada13d0d89e488918763ac672103566233faa157eae76dcade6a8594ce38729e157ff583a44a442f43fd3312cb6d7c820120876475527c21039d15f95af63bd0316e2c7a82c84d3139ef7900961c0e9a3a90462ebce4c0d37252ae67a9145dc7a3df22079ba503b2e9c73ed068f05895c10e88ac6868a7c80800',
      vin: 0,
    },
    description: 'Offered HTLC timeout',
    expected: {type: 'offered_htlc_timeout'},
  },
  {
    args: {
      transaction: '020000000001019e901f24fe92b547d457e543397ff6b058414fda423147de7f5b80485fe0f77801000000000000000001e2462e00000000001600141a4051f3f29c406deb56dd0531459f3691b9d7d402473044022048f8e11c4ed55ac956613fdfb5baf3ceaea4a953d4fdaba7fa83158c52e7831c02204605ac2aa34753e1be2ff63a5806b106fb40f015c8ef688cb971dbd3f2e3ca74012102deb79556e61246f30343d68621ec0ee654ef4ba6150a21d59aff25a6a6d9587600d00800',
      vin: 0,
    },
    description: 'Pay to witness public key hash',
    expected: {type: 'p2wpkh'},
  },
  {
    args: {
      transaction: '020000000001014177feadb67204ea202130aa8d5f1f4e08b622df7d03ddfedeeebedbc4a6b04700000000000600000001b41f6300000000001600148ea753221568a01db63756d79fc691797b07f6650347304402206a56355dbb752fd09730d2382492b5cc6d44101fb42bfff0e6c59dc72ef0125c02207bec1d78f87c3103146f6a3187542f51df06e6c95c05f44b03ac69a89bad110001004b632102891c274b2f7c6d622cb3136a4324ab6a046218885fb37d29eac0c2a8d26ebe8a6756b27521034ca958744047a30dfce11dff5898f2db91a4f64876e43dd7f4c5d277361c1dd968ac25f11700',
      vin: 0,
    },
    description: 'Short CSV delay',
    expected: {type: 'csv_delayed'},
  },
];

tests.forEach(({args, description, expected}) => {
  return test(description, ({end, equal}) => {
    const {type} = resolutionType(args);

    equal(type, expected.type, 'Type is resolved');

    return end();
  });
});
