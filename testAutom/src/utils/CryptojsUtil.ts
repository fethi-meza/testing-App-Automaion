const CryptoJSUtil = require("crypto-js");

// Encryption function
export function encrypt(text: string) {
  // Get the SALT from the system environment variable
  const SALT = process.env.SALT || "omg";
  const cipherText = CryptoJSUtil.AES.encrypt(text, SALT).toString();
  return cipherText;
}

// Decryption function
export function decrypt(cipherText: string) {
 
  const SALT = process.env.SALT || "defaultSALT";
  const bytes = CryptoJSUtil.AES.decrypt(cipherText, SALT);
  const originalText = bytes.toString(CryptoJSUtil.enc.Utf8);
  return originalText;
}