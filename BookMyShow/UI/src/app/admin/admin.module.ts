import { AdminCreateShowComponent } from './admin-create-show/admin-create-show.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { AdminAuthGuard } from './admin.authguard';
import { AdminRoutingMoudle } from './admin.routing';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../shared.module';
import { AdminShowDetailsComponent } from './admin-show-details/admin-details.component';
import { MapComponent } from './map/here-map.component';

@NgModule({
    providers: [],
    declarations: [
        AdminDashboardComponent,
        AdminComponent,
        AdminShowDetailsComponent,
        AdminCreateShowComponent,
        MapComponent
    ],
    exports: [
        AdminDashboardComponent,
        AdminComponent,
        AdminShowDetailsComponent,
        AdminCreateShowComponent,
        MapComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingMoudle,
        SharedModule,
        ReactiveFormsModule
    ]
})
export class AdminModule {

}