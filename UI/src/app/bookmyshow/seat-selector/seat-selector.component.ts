import { NewReservationModel } from '../../models/new-reservation.model';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { Router } from '@angular/router';
import { AppStateService } from '../../services/appstate.service';
import { Component, OnInit } from "@angular/core";
import { ShowModel } from 'src/app/models/show.model';
import { VenueModel } from 'src/app/models/venue.model';

@Component({
    selector: "app-checkout",
    templateUrl: "./seat-selector.component.html"
})
export class SeatSelectorComponent implements OnInit {

    showDetails: ShowModel;
    venueDetails: VenueModel;
    reservedSeats: number[] = [];
    totalSeats: number[];
    availableSeatArray: number[];
    selectedSeats: number[] = [];
    seatRequirementForm: FormGroup;
    requiredSeats: number;
    selectedSeatCount: number = 0;
    showTicket = false
    showPrice: number = 0;

    constructor(public appState: AppStateService, public router: Router, public reservationService: ReservationService) {

        this.seatRequirementForm = new FormGroup({
            seatRequired: new FormControl()
        })
    }

    ngOnInit() {
        if (this.appState.getLoginState() == false) {
            this.router.navigate(['/login']);
        }

        if (this.appState.getSelectedShow() == null) {
            this.router.navigate(['/']);
        }


        this.showDetails = this.appState.getSelectedShow();
        this.venueDetails = this.appState.getSelectedVenue();
        this.showPrice = Number(this.venueDetails.showPrice);
        this.totalSeats = Array(Number(this.venueDetails.totalSeatCount));
        this.availableSeatArray = Array(Number(this.venueDetails.availableSeatCount));

        this.seatRequirementForm.get("seatRequired").valueChanges.subscribe(value => {
            this.requiredSeats = value;
            this.selectedSeatCount = 0;
            this.selectedSeats = [];
        })

        this.requiredSeats = 1;
        this.getReservedSeats()
    }

    getReservedSeats() {
        this.reservationService.getReservedSeats(this.venueDetails.id).subscribe(value => {
            this.reservedSeats = value.map(e => { return Number(e) });
            console.log(this.reservedSeats);
        });
    }

    checkSeatReserved(seat) {
        return this.reservedSeats.indexOf(seat) != -1
    }

    checkSeatMarked(seat) {
        return this.selectedSeats.indexOf(seat) != -1
    }

    toggleSeat(seatNumber) {
        //reserved case
        if (this.reservedSeats.indexOf(seatNumber) != -1) {
            return;
        }

        //seat is unmarked
        if (this.selectedSeats.indexOf(seatNumber) == -1) {
            //mark the seat 
            if (this.selectedSeatCount != this.requiredSeats) {
                this.selectedSeats.push(seatNumber);
                this.selectedSeatCount++;
            }
        } else {
            //is already marked by user, unmark the seat
            this.selectedSeats = this.selectedSeats.filter(e => e != seatNumber);
            this.selectedSeatCount--;
        }
    }

    checkout() {
        let userId = this.appState.getAuthDetails().userId;

        let reservationRequest = new NewReservationModel({
            userId, venueId: this.venueDetails.id.toString(),
            seatNumbers: this.selectedSeats
        });

        this.reservationService.createReservation(reservationRequest).subscribe(value => {
            this.showTicket = true;
        });
    }
}