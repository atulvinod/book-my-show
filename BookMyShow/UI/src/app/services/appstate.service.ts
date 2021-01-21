import { ShowModel } from 'src/app/models/show.model';
import { VenueModel } from './../models/venue.model';
import { AuthDetails } from './../models/authdetails.model';
import { Injectable } from "@angular/core";
import { isDevMode } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { SocialAuthService } from 'angularx-social-login';

@Injectable({
    providedIn: 'root'
})
export class AppStateService {

    private loginState: BehaviorSubject<boolean>;
    private loginRole: string;
    private authDetails: BehaviorSubject<AuthDetails>;
    private selectedShow: BehaviorSubject<ShowModel>;
    private selectedVenue: BehaviorSubject<VenueModel>;

    constructor(public socialAuthService: SocialAuthService) {

        if (localStorage.getItem("accessToken") != null) {
            let logins = new AuthDetails({ userId: localStorage.getItem("userId"), accessToken: localStorage.getItem("accessToken"), userName: localStorage.getItem("userName"), userRole: sessionStorage.getItem("userRole") });
            this.loginState = new BehaviorSubject<boolean>(true);
            this.authDetails = new BehaviorSubject<AuthDetails>(logins);
        } else {
            this.loginState = new BehaviorSubject<boolean>(false);
            this.authDetails = new BehaviorSubject<AuthDetails>(null);
        }

        this.selectedShow = new BehaviorSubject<ShowModel>(null);
        this.selectedVenue = new BehaviorSubject<VenueModel>(null);
    }

    getHttpRoot() {
        if (isDevMode()) {
            return "https://localhost:5001"
        } else {
            return "";
        }
    }

    getLoginState() {
        return this.loginState.getValue();
    }

    getLoginStateObservable() {
        return this.loginState;
    }

    getGetLoginRole() {
        return this.loginRole;
    }

    setLoginState(loginData: AuthDetails, role: string) {
        this.loginRole = role;
        this.loginState.next(true);
        this.authDetails.next(loginData);
        localStorage.setItem("userName", loginData.userName);
        localStorage.setItem("accessToken", loginData.accessToken);
        localStorage.setItem("userId", loginData.userId);
        sessionStorage.setItem("userRole", loginData.userRole);
    }

    getAuthDetails() {
        return this.authDetails.getValue();
    }

    getAuthToken() {
        return this.authDetails.getValue().accessToken;
    }

    logout() {
        this.loginRole = null;
        this.loginState.next(false);
        this.authDetails.next(null);
        localStorage.clear();
        this.socialAuthService.signOut();
    }

    setShowAndVenue(show: ShowModel, venue: VenueModel) {
        this.selectedShow.next(show);
        this.selectedVenue.next(venue);
    }

    getSelectedShow() {
        return this.selectedShow.value;
    }
    getSelectedVenue() {
        return this.selectedVenue.value;
    }
}