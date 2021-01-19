import { SocialLoginModel } from './../models/social-login.model';
import { Observable } from 'rxjs';
import { RegisterUserModel } from '../models/register-user.model';
import { AuthDetails } from './../models/authdetails.model';
import { HttpClient } from '@angular/common/http';
import { AppStateService } from './appstate.service';
import { Injectable } from "@angular/core";
import { LoginModel } from '../models/login.model';

@Injectable({
    providedIn: "root"
})
export class AuthService {

    constructor(public appstate: AppStateService, public http: HttpClient) { }

    attemptLogin(email: string, password: string): Observable<AuthDetails> {
        return this.http.post<AuthDetails>(this.appstate.getHttpRoot() + "/auth/login", new LoginModel({ email, password }))
    }

    registerUser(userName: string, email: string, password: string): Observable<AuthDetails> {
        return this.http.post<AuthDetails>(this.appstate.getHttpRoot() + "/auth/register", new RegisterUserModel({ userName, email, password }));
    }

    validateGoogleAuth(socialLogin: SocialLoginModel) {
        return this.http.post<AuthDetails>(this.appstate.getHttpRoot() + '/auth/google',socialLogin);
    }
}