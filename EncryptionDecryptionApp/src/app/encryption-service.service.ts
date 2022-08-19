import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionServiceService {

  key: string = "z!!!!!!!1sdfadsf56adf456asdfasdf";
  appProperties = {
    VALUES: {
      KEY: "MTIzNDU2Nzg5MEFCQ0RFRkdISUpLTE1O",
      IV: "MTIzNDU2Nzg="
    }
  }

  constructor() { }

  encryptionAES(encryptStr: any) {
    // Encrypt
    const ciphertext = CryptoJS.AES.encrypt(encryptStr, 'secret key 123');
    return ciphertext.toString();
  }

  decryptionAES(decryptStr: any) {
    // Decrypt
    const bytes = CryptoJS.AES.decrypt(decryptStr, 'secret key 123');
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
  }
}
