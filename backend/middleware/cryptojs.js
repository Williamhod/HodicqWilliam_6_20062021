const CryptoJS = require('crypto-js');

module.exports = (email) => {
    return CryptoJS.SHA256(email).toString(CryptoJS.enc.Hex);  
};