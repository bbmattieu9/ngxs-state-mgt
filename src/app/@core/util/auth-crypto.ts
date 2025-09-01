
import * as CryptoJS from 'crypto-js';
import { AuthCredentials } from '../../@auth/types/auth-types';

export default class Encryptor {
  static encryptCredential(credentials: AuthCredentials): AuthCredentials {
    const key = CryptoJS.enc.Utf8.parse('80808080808080808080808080808080');
    const iv = CryptoJS.enc.Utf8.parse('8080808080808080');

    const encrypted: AuthCredentials = {
      ...credentials,
      password: credentials.password?.trim()
        ? CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(credentials.password),
            key,
            {
              keySize: 128 / 8,
              iv,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7,
            }
          ).toString()
        : undefined,

      piN_OTP: credentials.piN_OTP?.trim()
        ? CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(credentials.piN_OTP),
            key,
            {
              keySize: 128 / 8,
              iv,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7,
            }
          ).toString()
        : undefined,
    };

    return encrypted;
  }

  static encryptPinOTP(loginCredential: AuthCredentials) {
    const key = '8080808080808080';
    const iv = '8080808080808080';

    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const ivHex = CryptoJS.enc.Utf8.parse(iv);

    if (loginCredential.piN_OTP && loginCredential.piN_OTP.trim() != '')
      loginCredential.piN_OTP = CryptoJS.AES.encrypt(
        CryptoJS.enc.Utf8.parse(loginCredential.piN_OTP.toString()),
        keyHex,
        {
          iv: ivHex,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7,
        }
      ).toString();

    return loginCredential;
  }
}
