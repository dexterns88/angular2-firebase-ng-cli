import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'app';
  currentUser: any = false;

  constructor(private router: Router, private auth: AuthComponent) {
    console.log( 'app: component constructor' );
    this.userInfo();
  }

  userInfo() {
    // check user and populate user info block
    this.auth.checkUser();

    // this.currentUser = JSON.parse( localStorage.getItem('currentUser') );
  }
}
