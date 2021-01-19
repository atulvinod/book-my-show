import { AppStateService } from '../services/appstate.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class BookMyShowAuthGuard implements CanActivate {

    constructor(private appState: AppStateService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log(this.appState.getAuthDetails());
        if (this.appState.getLoginState()) {
            return true;
        } else {
            return this.router.navigate(["login"]);
        }
    }
}