import { UserComponent } from './user.component';
import { UserDashboardComponent } from './dashboard/user-dashboard.component';
import { BookMyShowAuthGuard } from '../bookmyshow/bookmyshow.authguard';
import { UserRoutingModule } from './user.routing';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { ReservationCard } from './reservation-card/reservation-card.component';
import { SharedModule } from '../shared.module';

@NgModule({
    declarations: [UserDashboardComponent, UserComponent,ReservationCard],
    exports: [UserDashboardComponent, UserComponent,ReservationCard],
    imports: [
        CommonModule,
        UserRoutingModule,
        SharedModule
    ],
    providers: [BookMyShowAuthGuard],
})
export class UserModule {

}