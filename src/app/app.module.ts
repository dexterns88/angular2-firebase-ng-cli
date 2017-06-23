import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { AppRouting } from './app-routing';
import { AuthGuard } from './_guard/auth.guard';

import { AuthService } from './services/auth.service';

// Import Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Google maps
import { AgmCoreModule } from '@agm/core';
import { NguiUtilsModule } from '@ngui/utils';
import { NguiMapModule } from '@ngui/map';

// Import environment
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page-404/page-404.component';
import { AboutComponent } from './about/about.component';
import { DecryptPipe } from './decrypt.pipe';
import { AuthComponent } from './auth/auth.component';
import { MapsComponent } from './maps/maps.component';
import { Maps2Component } from './maps2/maps2.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Page404Component,
    AboutComponent,
    DecryptPipe,
    AuthComponent,
    MapsComponent,
    Maps2Component
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: environment.mapsApiKey
    }),
    NguiMapModule.forRoot({
      apiUrl: 'https://maps.google.com/maps/api/js?key=' + environment.mapsApiKey + '&libraries=visualization,places,drawing'
    }),
    NguiUtilsModule,
    AngularFireModule.initializeApp(environment.firebase, 'Firebase-application'),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [
    AuthGuard,
    AuthService,
    AuthComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }