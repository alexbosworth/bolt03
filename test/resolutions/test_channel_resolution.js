const {deepStrictEqual} = require('node:assert').strict;
const test = require('node:test');

const {channelResolution} = require('./../../resolutions');

const tests = [
  {
    args: {
      witness: [
        '304402200e5df020ace482983f2fa4f0f4e9fc41e1d357cb2501cec645d3457c99f9045002200abfea94d2cb0c0f7343c39614d2402856c3e361ce9cccfba2fadcffb0a9c6dd01',
        '03980c6ec676af55579c3e3317feab4da8089df8f66c694bc263068a1a4ad980c7',
      ],
    },
    description: 'Plain to_remote witness is a p2wpkh',
    expected: 'p2wpkh',
  },
  {
    args: {
      witness: [
        '',
        '304402202a8f24bcc7129d2a02adb0f6b5690d2f9a4780ed5e3191dec0ce2602beca414e0220779ab8c55225c903981942207feb4f8b7217de96c7fe0869c22cc12e78e3073801',
        '3045022100a11e1fdc14a5c6503f46d5b6fe257a1e4cbb1914f4cb6c4be6093196b921702802203f0435cb1aa6b36e4d4b55439f046bdb97a76eacb2439108bdd8bc1c4bec184e01',
        '',
        '76a9141179e6b594478e678761892e3d9309d45efb3f518763ac6721039409f0ce6813a287f337134842d67085f1bedcf5de2d2c347ec09276558bc3d97c820120876475527c2102c6a15d4ed964a53c85580478cf16f28c606790db4b5c667b1b04f72e7ac12b2552ae67a914d59aeff3458a38c28427616b919e1e611b720a5888ac6868',
      ],
    },
    description: 'Offered htlc timeout path',
    expected: 'offered_htlc_timeout',
  },
  {
    args: {
      witness: [
        '3045022100f8a767b28e32f8d8b27064aa9d68eeae6ca1e14db8a5ee4ea53d3a8d3d853329022074e512d4a4dad01f3dd17cb6d05a86117ad02114a97f6bbe46e1e36f02d7a51001',
        '',
        '63210275600fb92663ce98cfeeefe5bf3c03964848a07702bc42db4c608e0fbf99050867025802b27521035a12f81dfd50677a2256300f03b6c3c2ab133c8a9e423dfd5fad41edbf5a7dcc68ac',
      ],
    },
    description: 'To local csv delay',
    expected: 'csv_delayed',
  },
  {
    args: {
      witness: [
        '',
        '3045022100fd4a8dcf3f3ec77740347a578800f16f66594c8cfa12e278e24daad523f7f7f80220422f4bf7cedc5d3de64a5d9b638ebe7bdd3708376d1c9d4c47bb7a3c272a27f201',
        '30440220293ce80c05257803d4929ea1c545618694a715e120d5c090d2c90a0a9055ce9e02201e31cd027185c41ca8ace411b18dcae24f684f5e326277955a5a4771ec8f846901',
        '1210c461870a807158a9b5c2309bf2a202ac25bdef3ff1d508fb95e244d17572',
        '76a9149b25662a3a31b43a8379d38a8daa779650d4dbe28763ac672102a99d5ea772304fbcd3b44375c7bd5b6d02b1a955db98dabcf681a50d43fcd8837c8201208763a9140ac0f90a287b8fd0585f1b6c666a02204810c76788527c2102093597eb9fab7e626a30a446593874f561c36a3dd702a1b03b8212a4b13c7f7d52ae677503a4ad08b175ac6868',
      ],
    },
    description: 'Received HTLC settled on-chain',
    expected: 'received_htlc_settled',
  },
  {
    args: {
      witness: [
        '3045022100cdaac3af3e61b652ed2178fc8ceee54794eb900dde4d77dffa424e13cbd98779022037d2fb78e71ea14564553db371ebfd62e0910d805cbeae3734e841a2ab57257501',
        'e080aa113efc2272241cc27c77ebb1ffa643f15d500fea6699507e973e01322c',
        '76a9146cc6ab1f4438290bc7841bab7bc909e24039d23f8763ac672102178dfa6581cc59dc5e7393531818d9aeb17a1c76c4573e973dd3ff3fc0550a497c820120876475527c2103fd0f080ede7bc533711b8b2e567ee3d2dc4db92056b8b940866046ee6746ecd652ae67a91478c4b99102eea1bfc56f6befe7b9b8e482136db888ac6868',
      ],
    },
    description: 'Offered HTLC settled on-chain',
    expected: 'offered_htlc_settled',
  },
  {
    args: {
      witness: [
        '3044022013264c793ac48e17b3f73620523d9ff6b3e60107bc4e6ffa5ec066aebffd7d0002205449c668a94d9e8643968db5f1a3e8f5c69b7da8915d2e69b3cb210fdd4ae64101',
        '023a57073e7a3abe25299b054cb03167bda4d29ed48f6a3da71f6448e73b3fc488',
        '76a9141ae1de0ffd68893bd5f6fc31b993e80555df4cd58763ac6721035ccefb1942ba7b276b9a6776cff0114e9049fddde33d24c5d9aabc617c820dad7c8201208763a914bd01f43874d2df813b7a75abfa9afc4dbbc6c51a88527c2103451ba18893b9fb9b3c2958a37903a0f994b3c6b24f2ce882644a1246753c60ce52ae677503969408b175ac6868',
      ],
    },
    description: 'Received HTLC breach scenario',
    expected: 'received_htlc_breach',
  },
  {
    args: {
      witness: [
        '3045022100d8f7df97a157f7cce0b3a2098a38736588c86c136be7366c8590452de7547e79022066ab5cc3c29b29e1e87a9c9c3b848e48439e5da77e49e98185c88de425189d5301',
        '',
        '76a914d9be6278f18894f5918fc791c25406fdb23cf8678763ac6721020da55099e5010d504fcd0e8a3c9f6774313221526d3c6dac9d3ffe76cf86bfeb7c8201208763a91490aef52f74eed87fc8eaaf563a66f9afcce6201388527c210395fec22d16a8896435b04b2b09d14b2f6721e1ba1e10e10c64c68030a39870fc52ae6775033f9308b175ac6868',
      ],
    },
    description: 'Received HTLC timeout',
    expected: 'received_htlc_timeout',
  },
];

tests.forEach(({args, description, expected}) => {
  return test(description, (t, end) => {
    const {type} = channelResolution(args);

    deepStrictEqual(type, expected, 'Type is as expected');

    return end();
  });
});
