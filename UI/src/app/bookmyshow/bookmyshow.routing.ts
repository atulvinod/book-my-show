import { SeatSelectorComponent } from './seat-selector/seat-selector.component';
import { ShowDetailsComponent } from './showdetails/showdetails.component';
import { BookMyShowAuthGuard } from './bookmyshow.authguard';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BookMyShowComponent } from './bookmyshow.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from './homepage/homepage.component';
import { pathToFileURL } from 'url';

const routes: Routes = [
    {
        path: "",
        component: BookMyShowComponent,
        children: [
            {
                path: "",
                component: HomepageComponent
            },
            {
                path: "login",
                component: LoginComponent
            },
            {
                path: "register",
                component: RegisterComponent,
            },
            {
                path: "details/:id",
                component: ShowDetailsComponent
            }, 
            {
                path:"selectseat",
                component:SeatSelectorComponent,
                canActivate :[BookMyShowAuthGuard]
            }

        ]
    },
    {
        path: "*",
        redirectTo: ""
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainRouting { }