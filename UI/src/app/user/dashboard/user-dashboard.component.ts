import { ReservationService } from './../../services/reservation.service';
import { UserReservationModel } from '../../models/user-reservation.model';
import { AuthDetails } from './../../models/authdetails.model';
import { AppStateService } from './../../services/appstate.service';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-user-dashboard",
    templateUrl: "./user-dashboard.component.html"
})
export class UserDashboardComponent implements OnInit {

    authDetails: AuthDetails
    reservations: UserReservationModel[] = []

    constructor(public appState: AppStateService, public reservationService: ReservationService) { }

    ngOnInit() {
        this.authDetails = this.appState.getAuthDetails();
        this.getReservations();
    }

    getReservations() {
        this.reservationService.getUserReservations().subscribe(value => {
            this.reservations = value;
            console.log(this.reservations);

        });
    }
}