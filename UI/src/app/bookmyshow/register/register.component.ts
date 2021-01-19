import { AppStateService } from './../../services/appstate.service';
import { NavbarComponent } from './../../navbar/navbar.component';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup;
    showError: Boolean = false;
    errorMessage: string;

    constructor(public authService: AuthService, public router: Router, public appStateService: AppStateService) {
        this.registerForm = new FormGroup({
            username: new FormControl(null, [Validators.required]),
            email: new FormControl(null, [Validators.email, Validators.required]),
            password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
            confirmPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
        })
    }

    ngOnInit() {
        this.registerForm.get("password").valueChanges.subscribe(value => {
            if (!(value.length >= 6)) {
                this.showError = true;
                this.errorMessage = "Password is too short";
                return;
            } else {
                this.showError = false;
            }
        });
        this.registerForm.get("confirmPassword").valueChanges.subscribe(value => {
            if (value != this.registerForm.get("password").value) {
                this.showError = true;
                this.errorMessage = "Password and confirm password doesnt match";
            } else {
                this.showError = false;
            }
        })
    }

    submitHandler() {
        let { username, email, password, confirmPassword } = this.registerForm.value;

        if (password != confirmPassword) {
            this.showError = true;
            this.errorMessage = "Password and Confirm password dont match"
            return;
        }

        this.authService.registerUser(username, email, password).subscribe(value => {
            this.appStateService.setLoginState(value, value.userRole);
            this.router.navigate(["/"]);
        },
            error => {
                if (error.error instanceof ErrorEvent) {
                    console.error('An error occurred:', error.error.message);
                    this.errorMessage = error.error.message;
                } else {
                    this.showError = true;
                    this.errorMessage = error.error.message;
                }
            });
    }
}