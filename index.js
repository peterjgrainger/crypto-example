const {createCipher, createCipheriv, createDecipher, createDecipheriv, randomBytes} = require('crypto');
 
const algorithm = 'aes-256-ctr';
const key = process.env.KEY || 'b2df428b9929d3ace7c598bbf4e496b2';
const inputEncoding = 'utf8';
const outputEncoding = 'hex';

/**
 * Encrypt function using only the key.
 * @param {string} value to encrypt
 */
module.exports.encrypt = value => {
    const cipher = createCipher(algorithm, key);
    let crypted = cipher.update(value, inputEncoding, outputEncoding);
    crypted += cipher.final(outputEncoding);
    return crypted;
}

/**
 * Decrypt function using only the key
 * @param {string} value to decrypt
 */
module.exports.decrypt = value => {
    const decipher = createDecipher(algorithm, key);
    let dec = decipher.update(value, outputEncoding, inputEncoding);
    dec += decipher.final(inputEncoding);
    return dec;
}

/**
 * Encrypt using an initialisation vector
 * @param {string} value to encrypt
 */
module.exports.encryptIv = value => {
    const iv = new Buffer(randomBytes(16));
    const cipher = createCipheriv(algorithm, key, iv);
    let crypted = cipher.update(value, inputEncoding, outputEncoding);
    crypted += cipher.final(outputEncoding);
    return `${iv.toString('hex')}:${crypted.toString()}`;
}

/**
 * Decrypt using an initialisation vector
 * @param {string} value value to decrypt
 */
module.exports.decryptIv  = value => {
    const textParts = value.split(':');

    //extract the IV from the first half of the value
    const IV = new Buffer(textParts.shift(), outputEncoding);

    //extract the encrypted text without the IV
    const encryptedText = new Buffer(textParts.join(':'), outputEncoding);

    //decipher the string
    const decipher = createDecipheriv(algorithm,key, IV);
    let decrypted = decipher.update(encryptedText,  outputEncoding, inputEncoding);
    decrypted += decipher.final(inputEncoding);
    return decrypted.toString();
}