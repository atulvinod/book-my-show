import { VenueModel } from 'src/app/models/venue.model';
import { ShowModel } from 'src/app/models/show.model';
import { ActivatedRoute } from '@angular/router';
import { ShowsService } from './../../services/shows.service';
import { Component, OnInit } from "@angular/core";
import { forkJoin } from 'rxjs';

@Component({
    selector: "app-admin-show-details",
    templateUrl: "./admin-details.component.html"
})
export class AdminShowDetailsComponent implements OnInit {

    showDetails: ShowModel;
    venueDetails: VenueModel[];

    constructor(public showService: ShowsService, public activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.getDetails()
    }

    getDetails() {
        let id = this.activatedRoute.snapshot.params["id"];
        forkJoin([this.showService.getShow(id), this.showService.getVenuesForShow(id)]).subscribe(result => {
            this.showDetails = result[0];
            this.venueDetails = result[1];
        })
    }
}