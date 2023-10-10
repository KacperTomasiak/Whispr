import * as CryptoJS from "crypto-js";

const encrypt = (session: string, message: string): string => {
  return CryptoJS.AES.encrypt(message, session).toString();
};

const decrypt = (session: string, ciphertext: string): string => {
  return CryptoJS.AES.decrypt(ciphertext, session).toString(CryptoJS.enc.Utf8);
};

export { encrypt, decrypt };
