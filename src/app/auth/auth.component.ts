import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  user: Observable<firebase.User>;
  currentUser: any = {};
  returnUrl: string;
  
  constructor(
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private as: AuthService,
    // private app: AppComponent
  ) {
    console.log('auth: component-constructor');
  }

  ngOnInit () {
    console.log( 'auth: component on inti' );

    this.as.checkUser().subscribe( auth => {
      if ( auth ) {
        const usProv = auth.providerData[0];

        this.user = this.afAuth.authState;
        this.currentUser['name'] = usProv.displayName;
        this.currentUser['email'] = usProv.email;
        this.currentUser['photo'] = usProv.photoURL;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

        // this.app.currentUser = this.currentUser;

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
        if ( this.returnUrl ) {
          // redirect to return Url
          this.router.navigate([this.returnUrl]);
        } else {
          this.router.navigate(['/login'])
        }
      }
    });
  }

  checkUser () {
    this.as.checkUser().subscribe( auth => {
      if ( auth ) {
        this.currentUser = JSON.parse( localStorage.getItem('currentUser') );
        return true;
      }
      localStorage.removeItem('currentUser');
      return false;
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('currentUser');
    // this.app.userInfo();
  }

}
