import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import * as CryptoJS from 'crypto-js';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: FirebaseListObservable<any[]>;
  model: any = {};
  currentUser: any;

  constructor(db: AngularFireDatabase) {
    this.currentUser = JSON.parse( localStorage.getItem('currentUser') );

    // set name for chat widget
    this.model.name = this.currentUser.email;

    this.items = db.list('/public_chat', {
      query: {
        orderByKey: true,
        orderByValue: true
      }
    });

  }

  _enCrypt(message,key, iv) {
    let encrypted = CryptoJS.AES.encrypt( CryptoJS.enc.Utf8.parse(message), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  _deCrypt(message, key, iv) {
    let decrypted = CryptoJS.AES.decrypt(message, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  save() {
    let key = CryptoJS.enc.Base64.parse( environment.fingerPrint.master );
    let iv  = CryptoJS.enc.Base64.parse( environment.fingerPrint.shadow );
    let msgCrypt = this._enCrypt(this.model.message, key, iv);

    this.items.push({
      message: msgCrypt,
      name: this.model.name,
      date: Math.floor(Date.now() / 1000)
    });

    this.model.message = '';
  }

  ngOnInit() {}
}
