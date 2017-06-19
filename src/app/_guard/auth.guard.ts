import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()

export class AuthGuard implements CanActivate {
  currentUser: any;

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.currentUser = JSON.parse( localStorage.getItem('currentUser') );
    
    console.log( this.currentUser );
    console.log( 'auth guard' );

    if ( this.currentUser ) {
      return true;
    }
    this.router.navigate(['/login'], {queryParams : {returnUrl: state.url}});
    return false;
  }
}
