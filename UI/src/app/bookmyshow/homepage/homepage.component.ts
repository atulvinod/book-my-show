import { ShowModel } from './../../models/show.model';
import { ShowsService } from './../../services/shows.service';
import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-homepage',
    templateUrl: "./homepage.component.html"
})
export class HomepageComponent implements OnInit {

    showList: ShowModel[] = [];

    constructor(public showService: ShowsService) { }

    ngOnInit(): void {
        this.fetchShows();
    }

    fetchShows() {
        this.showService.getAllShows().subscribe(value => {
            this.showList = value;
        });
    }

}