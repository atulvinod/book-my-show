import { AppStateService } from './appstate.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { nextTick } from 'process';

@Injectable({
    providedIn: "root"
})
export class AuthInterceptor implements HttpInterceptor {

    constructor(public appState: AppStateService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.appState.getLoginState() == true) {
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${this.appState.getAuthToken()}`)
            });
            return next.handle(authReq);
        } else {
            return next.handle(req);
        }
    }


}