import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()

export class AuthGuard implements CanActivate {
  currentUser: any;

  constructor(private router: Router, private auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.currentUser = JSON.parse( localStorage.getItem('currentUser') );

    // Check on gard if local storage session exist but user is logged out
    if ( this.currentUser ) {
      this.auth.checkUser().subscribe(auth => {
        if ( !auth ) {
          localStorage.removeItem('currentUser');
          this.currentUser = false;
        }
      });
    }

    if ( this.currentUser ) {
      return true;
    }
    this.router.navigate(['/login'], {queryParams : {returnUrl: state.url}});
    return false;
  }
}
