import { AdminCreateShowComponent } from './admin-create-show/admin-create-show.component';
import { AdminShowDetailsComponent } from './admin-show-details/admin-details.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CanActivate } from '@angular/router';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import { AdminComponent } from './admin.component';
import { AdminAuthGuard } from './admin.authguard';

let routes: Routes = [
    {
        path: "",
        component: AdminComponent,
        canActivate: [AdminAuthGuard],
        children: [
            {
                path: "",
                component: AdminDashboardComponent
            }, 
            {
                path: "details/:id",
                component: AdminShowDetailsComponent
            }, 
            {
                path: "create",
                component: AdminCreateShowComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingMoudle {}