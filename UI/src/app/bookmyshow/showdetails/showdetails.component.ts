import { forkJoin } from 'rxjs';
import { AppStateService } from './../../services/appstate.service';
import { VenueModel } from './../../models/venue.model';
import { ShowsService } from './../../services/shows.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from "@angular/core";
import { ShowModel } from "src/app/models/show.model";
import * as  moment from 'moment'


@Component({
    selector: "app-showdetails",
    templateUrl: "./showdetails.component.html"
})
export class ShowDetailsComponent implements OnInit {

    showDetails: ShowModel;
    venueDetails: VenueModel[] = []

    constructor(public router: Router, public activatedRoute: ActivatedRoute, public showsService: ShowsService, public appState: AppStateService) { }

    ngOnInit() {
        console.log(this.activatedRoute.snapshot.params["id"]);
        this.getData();
    }

    getData() {
        let id = this.activatedRoute.snapshot.params["id"];
        forkJoin([this.showsService.getShow(id), this.showsService.getVenuesForShow(id)]).subscribe(result => {
            this.showDetails = result[0];
            this.venueDetails = result[1].filter((element) => {
                let date = moment(element.showDateTime, "DD-MM-YYYY hh:mm:ss");
                //check if the show date is after the current date
                if (date.isAfter(moment())) {
                    return true;
                } else {
                    return false;
                }
            });
        })
    }

    chooseVenue(event) {
        console.log(event)
        this.appState.setShowAndVenue(this.showDetails, event);
        this.router.navigate(["selectseat"])
    }

}