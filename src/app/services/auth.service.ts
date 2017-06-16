import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  checkUser() {
    return this.afAuth.authState;
  }

}
