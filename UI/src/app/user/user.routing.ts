import { BookMyShowAuthGuard } from '../bookmyshow/bookmyshow.authguard';
import { UserComponent } from './user.component';
import { UserDashboardComponent } from './dashboard/user-dashboard.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [{
    path: "",
    component: UserComponent,
    canActivate: [BookMyShowAuthGuard],
    children: [
        {
            path: "",
            component: UserDashboardComponent
        }
    ]
}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {

}