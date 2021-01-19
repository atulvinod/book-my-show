import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { UserReservationModel } from '../models/user-reservation.model';
import { NewReservationModel } from '../models/new-reservation.model';
import { AppStateService } from './appstate.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class ReservationService {

    constructor(public http: HttpClient, public appState: AppStateService) { }

    getReservedSeats(venueId: string) {
        return this.http.get<number[]>(this.appState.getHttpRoot() + `/reservations/reservedseats?venueId=${venueId}`)
    }

    createReservation(reservation: NewReservationModel) {
        return this.http.post(this.appState.getHttpRoot() + "/reservations/reserve", reservation)
    }

    getUserReservations() {
        return this.http.post<UserReservationModel[]>(this.appState.getHttpRoot() + `/reservations`, { id: this.appState.getAuthDetails().userId })
    }

    cancelReservation(reservationsId) {
        return this.http.post(this.appState.getHttpRoot() + "/reservations/cancel", { id: reservationsId.toString() })

    }
}