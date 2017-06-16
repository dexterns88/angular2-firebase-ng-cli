import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  user: Observable<firebase.User>;
  currentUser: any = {};
  returnUrl: string;
  
  constructor(
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
  ) {

    // this.user = afAuth.authState;
    afAuth.authState.subscribe( auth => {

      if ( auth ) {
        let usProv = auth.providerData[0];

        this.user = afAuth.authState;
        this.currentUser['name'] = usProv.displayName;
        this.currentUser['email'] = usProv.email;
        this.currentUser['photo'] = usProv.photoURL;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
        if ( this.returnUrl ) {
          // redirect to return Url
          this.router.navigate([this.returnUrl]);
        }
      }
    })
  }

  login() {
    this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('currentUser');
  }

}
