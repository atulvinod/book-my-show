
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { AppStateService } from './../services/appstate.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

  showLoginAndRegister:Boolean
  
  constructor(public appstate:AppStateService,public router:ActivatedRoute) { 
    this.showLoginAndRegister = true;
  }

  ngOnInit(): void {
    this.appstate.getLoginStateObservable().subscribe(value=>{
        this.showLoginAndRegister=!value;
    })
  }
  
  logout(){
    this.appstate.logout();
  }

}
