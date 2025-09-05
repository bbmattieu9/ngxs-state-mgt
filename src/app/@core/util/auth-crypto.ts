import * as CryptoJS from 'crypto-js';
import { AuthCredentials } from '../../@auth/types/auth-types';

export default class Encryptor {
  static encryptCredential(credentials: AuthCredentials): AuthCredentials {
    const key = CryptoJS.enc.Utf8.parse('8080808080808080'); // 16 bytes = 128 bits
    const iv = CryptoJS.enc.Utf8.parse('8080808080808080'); // 16 bytes

    const encrypted: AuthCredentials = {
      ...credentials,
      password: credentials.password?.trim()
        ? CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(credentials.password),
            key,
            {
              iv,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7,
            }
          ).toString()
        : undefined,
    };

    return encrypted;
  }
}
