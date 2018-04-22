const test = require('tape');
const {encrypt, decrypt, encryptIv, decryptIv} = require('../index');



test('not using iv', t => {
    const value = 'some value';
    t.assert(encrypt);
    t.notDeepEqual(encrypt(value), value);
    t.deepEqual(decrypt(encrypt(value)), value)
    t.end()
})

test('using iv', t => {
    const value = 'some value';
    t.assert(encryptIv);
    t.notDeepEqual(encryptIv(value), value);
    t.deepEqual(decryptIv(encryptIv(value)), value);
    t.end();
})