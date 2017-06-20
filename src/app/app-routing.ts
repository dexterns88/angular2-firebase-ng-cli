/**
 * Created by dexter on 6/15/17.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import component
// import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page-404/page-404.component';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './_guard/auth.guard';
import { MapsComponent } from './maps/maps.component';
import { Maps2Component } from './maps2/maps2.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: AuthComponent
  },
  {
    path: 'login/:id',
    component: AuthComponent
  },
  {
    path: 'maps',
    component: MapsComponent
  },
  {
    path: 'maps2',
    component: Maps2Component
  },
  // define page not found component
  {
    path: '**',
    component: Page404Component
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRouting {}
