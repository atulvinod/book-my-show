import { ShowModel } from './../../models/show.model';
import { ShowsService } from './../../services/shows.service';
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: "app-admin-dashboard",
    templateUrl: "./admin-dashboard.component.html"
})
export class AdminDashboardComponent implements OnInit {

    allShows: ShowModel[] = []

    constructor(public showService: ShowsService, public router: Router) { }

    ngOnInit() {
        this.getShows();
    }

    getShows() {
        this.showService.getAllShows().subscribe(value => {
            this.allShows = value;
        });
    }

    showDetails(showId) {
        this.router.navigate([`admin/details/${showId}`]);
    }
}