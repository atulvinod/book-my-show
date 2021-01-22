import { AppStateService } from '../services/appstate.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { isNgTemplate } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class AdminAuthGuard implements CanActivate {

    constructor(public appState: AppStateService, public router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        if (this.appState.getLoginState() == true && this.appState.getAuthDetails().userRole == "Admin") {
            return true;
        } else {
            return this.router.navigate(["/login"]);
        }
    }

}