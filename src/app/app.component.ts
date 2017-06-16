import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'app';
  currentUser: any = false;

  constructor(private router: Router) {
    this.userInfo();
  }

  userInfo() {
    this.currentUser = JSON.parse( localStorage.getItem('currentUser') );
  }
}
