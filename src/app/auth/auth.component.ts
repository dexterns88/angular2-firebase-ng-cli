import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router, ActivatedRoute, Params } from '@angular/router';
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
  private urlLogout: string;
  private sub: any;
  private id: any;
  public loader = false;
  
  constructor(
    public afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router,
    private as: AuthService,
    private app: AppComponent
  ) {}

  ngOnInit () {

    this.as.checkUser().subscribe( auth => {
      if ( auth ) {
        const usProv = auth.providerData[0];

        this.user = this.afAuth.authState;
        this.currentUser['name'] = usProv.displayName;
        this.currentUser['email'] = usProv.email;
        this.currentUser['photo'] = usProv.photoURL;
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        // Set current user info block on app component
        this.app.currentUser = this.currentUser;
        // catch query param
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
        this.urlLogout = this.route.snapshot.queryParams['logout'];

        if ( this.urlLogout  ) {
          this.logout();
          this.router.navigate(['/login']);
        } else {
          if ( this.returnUrl ) {
            // redirect to return Url
            this.router.navigate([this.returnUrl]);
          } else {
            this.router.navigate(['/'])
          }
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
    this.loader = true;
    this.afAuth.auth.signInWithPopup( new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('currentUser');
    this.app.currentUser = false;
  }

}
