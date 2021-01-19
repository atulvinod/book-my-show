import { BookMyShowModule } from './bookmyshow/bookmyshow.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { SharedModule } from './shared.module';
import { SocialLoginModule } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';
import {ModalModule} from 'ngx-bootstrap/modal';

const fbLoginOptions = {
  scope: 'email',
  return_scopes: true,
  enable_profile_selector: true,
  version: "v2.11"
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    UserModule,
    AdminModule,
    BookMyShowModule,
    SharedModule.forRoot(),
    SocialLoginModule,
    ModalModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },
  {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [{
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(
          "578676376086-grfj331sbobl9v0mvs6jlj7o0vvkadiu.apps.googleusercontent.com"
        )
      }
      ,
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(
          "232050841742979",fbLoginOptions
        )
      }
      ]
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
