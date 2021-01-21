import { VenueModel } from 'src/app/models/venue.model';
import { Observable, } from 'rxjs';
import { ShowModel } from './../models/show.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { AppStateService } from './appstate.service';

@Injectable({
    providedIn: "root"
})
export class ShowsService {

    constructor(public http: HttpClient, public appState: AppStateService) { }

    getAllShows(): Observable<ShowModel[]> {
        return this.http.get<ShowModel[]>(this.appState.getHttpRoot() + "/shows/getAllShows")
    }

    getShow(showId: number) {
        return this.http.get<ShowModel>(this.appState.getHttpRoot() + `/shows/getshow?showId=${showId}`)
    }

    getVenue(venueId: number) {
        return this.http.get<VenueModel>(this.appState.getHttpRoot() + `/shows/getvenue?venueId=${venueId}`);
    }

    createShow(show: ShowModel) {
        return this.http.post<number>(this.appState.getHttpRoot() + '/shows/createshow', show);
    }

    createVenue(venue: VenueModel) {
        return this.http.post<number>(this.appState.getHttpRoot() + '/shows/createvenue', venue);
    }

    getVenuesForShow(showId: number) {
        return this.http.get<VenueModel[]>(this.appState.getHttpRoot() + `/shows/venuesforshow?showId=${showId}`);
    }
}