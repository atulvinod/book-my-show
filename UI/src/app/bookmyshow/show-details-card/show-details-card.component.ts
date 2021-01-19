import { Router } from '@angular/router';
import { Component, Input, OnInit } from "@angular/core";
import { ShowModel } from "src/app/models/show.model";

@Component({
    selector: "app-showcard",
    // template :"<h1>hellp</h1>"
    templateUrl: "./show-details-card.component.html"
})
export class ShowDetailsCardComponent implements OnInit {

    @Input() showData: ShowModel;

    constructor(public router: Router) { }

    ngOnInit() {

        if (this.showData.posterImgPath.trim() == "") {
            this.showData.posterImgPath = "https://cdn.shopify.com/shopifycloud/shopify/assets/no-image-2048-5e88c1b20e087fb7bbe9a3771824e743c244f437e4f8ba93bbf7b11b53f7824c.gif"
        }
        console.log(this.showData);
    }

    showDetails(showsId: number) {
        console.log(showsId);
        this.router.navigate([`/details/${showsId}`])
    }
}