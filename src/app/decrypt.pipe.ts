import { Pipe, PipeTransform } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {environment} from '../environments/environment';

@Pipe({
  name: 'decrypt'
})

export class DecryptPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    let key = CryptoJS.enc.Base64.parse( environment.fingerPrint.master );
    let iv  = CryptoJS.enc.Base64.parse( environment.fingerPrint.shadow );
    let decrypted;

    decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    value = decrypted.toString( CryptoJS.enc.Utf8 );
    return value;
  }
}
