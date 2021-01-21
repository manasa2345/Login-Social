import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SocialAuthService, SocialAuthServiceConfig } from 'angularx-social-login';
import { SocialLoginModule, GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

// import { from } from 'rxjs';
// import 'rxjs/add/operator/catch';
// import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

import { LoginComponent } from './login/login.component';

import { LinkedInService } from './services/linked-in.service';

import { IconModule, IconSetModule, IconSetService } from '@coreui/icons-angular';

// import { TwitterService } from 'ngx-twitter-api';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    FormsModule,
    HttpClientModule,
    IconModule,
    IconSetModule.forRoot()
  ],
  providers: [LinkedInService, IconSetService,
    // TwitterService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '513990135354-6dv9ok5pfju027kk0e91k6ljmsdm38se.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider(
              '597802657697007'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
