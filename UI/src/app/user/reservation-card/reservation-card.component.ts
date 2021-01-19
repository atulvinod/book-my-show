import { ShowsService } from './../../services/shows.service';
import { VenueModel } from './../../models/venue.model';
import { ShowModel } from './../../models/show.model';
import { ReservationService } from './../../services/reservation.service';
import { UserReservationModel } from './../../models/user-reservation.model';
import { Component, Input, OnInit } from "@angular/core";
import {forkJoin} from 'rxjs';

@Component({
    selector: "app-user-reservation",
    templateUrl: "./reservation-card.component.html"
})
export class ReservationCard implements OnInit {
    
    @Input() userReservation: UserReservationModel;
    showDetails:ShowModel;
    venueDetails:VenueModel;

    constructor(public reservationService: ReservationService,public showsService:ShowsService) {}

    ngOnInit() {
        this.fetchShowAndVenue();
    }
    
    cancelReservation(reservationId) {
        this.reservationService.cancelReservation(reservationId).subscribe(value => {
            this.userReservation.reservations.map((e) => {
                if (e.id == reservationId) {
                    e.reservationCancelled = true;
                }
                return e;
            })
        });
    }

    fetchShowAndVenue(){
        forkJoin([this.showsService.getShow(this.userReservation.showId),this.showsService.getVenue(this.userReservation.venueId)]).subscribe(values=>{
            this.showDetails = values[0];
            this.venueDetails = values[1]
        })
    }
}