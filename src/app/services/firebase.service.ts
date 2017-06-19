import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseService {

  constructor(private db: AngularFireDatabase) {}

  getPublicChat() {
    return this.db.list('/public_chat', {
      query: {
        orderByKey: true,
        orderByValue: true
      }
    });
  }

}
