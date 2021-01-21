import { SocialLoginModel } from './../../models/social-login.model';
import { AppStateService } from './../../services/appstate.service';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FacebookLoginProvider, SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";


@Component({
    selector: "app-login",
    templateUrl: "./login.component.html"
})
export class LoginComponent {

    loginForm: FormGroup;
    errorMessage: string;
    showError: boolean = false;

    constructor(public authService: AuthService, public router: Router, public appState: AppStateService, public socialAuthService: SocialAuthService) { }

    ngOnInit() {
        this.loginForm = new FormGroup({
            emailId: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, [Validators.required])
        })
    }

    submitHandler() {
        let { emailId, password } = this.loginForm.value;

        this.authService.attemptLogin(emailId, password).subscribe(value => {
            this.appState.setLoginState(value, value.userRole);
            this.router.navigate(["/"]);
        },
            error => {
                if (error.error instanceof ErrorEvent) {
                    console.error('An error occurred:', error.error.message);
                } else {
                    this.showError = true;
                    this.errorMessage = error.error.message;
                }
            });
    }

    loginWithGoogle() {
        this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

        this.socialAuthService.authState.subscribe((user: SocialLoginModel) => {
            console.log(user);
            this.authService.validateGoogleAuth(user).subscribe(authDetails => {
                console.log(authDetails);
                this.appState.setLoginState(authDetails, authDetails.userRole);
                this.router.navigate(['/']);
            })
        })
    }

    loginWithFacebook(){
        this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).catch(err=>{
            console.error(err);
        });
        this.socialAuthService.authState.subscribe((user: SocialLoginModel) => {
            console.log(user);
        })
    }
}

