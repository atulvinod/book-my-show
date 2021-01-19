import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { VenueModel } from 'src/app/models/venue.model';
import { ShowModel } from 'src/app/models/show.model';
import { ShowsService } from './../../services/shows.service';
import { FormGroup, FormArray, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { ChangeDetectorRef, Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewChildren } from "@angular/core";
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: "app-admin-create",
    templateUrl: "./admin-create-show.component.html",
})
export class AdminCreateShowComponent implements OnInit {

    newShowForm: FormGroup;
  
    constructor(public showService: ShowsService, public router: Router) {

        this.newShowForm = new FormGroup({
            name: new FormControl("", [Validators.required]),
            description: new FormControl("", [Validators.required]),
            posterImgPath: new FormControl("", [Validators.required]),
            duration: new FormControl("", [Validators.required]),
            genre: new FormControl("", [Validators.required]),
            showVenues: new FormArray([])
        })
    }

    ngOnInit() {}

    get showVenues() {
        return this.newShowForm.get("showVenues") as FormArray;
    }

    createNewLocationForm() {
        this.showVenues.push(new FormGroup({
            address: new FormControl("", [Validators.required]),
            showPrice: new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$")]),
            showDateTime: new FormControl("", [Validators.required, this.dateValidator()]),
            totalSeatCount: new FormControl("", [Validators.required, Validators.pattern("^[0-9]*$")])
        }))
    }

    submitHandler() {
        let { name, description, duration, genre, posterImgPath, showVenues } = this.newShowForm.value;
        duration += ":00";

        let show = new ShowModel({ name, description, duration, posterImgPath, genre });
        console.log(show);

        this.showService.createShow(show).subscribe(showId => {

            let venueRequests = (showVenues as VenueModel[]).map(venue => {
                venue.showId = showId.toString();
                return this.showService.createVenue(venue);
            })

            forkJoin(venueRequests).subscribe(result => {
                console.log(result);
                this.router.navigate(['/admin']);
            }, error => console.error(error));
        })
    }

    dateValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            console.log(control.value);
            let controlDate = new Date(control.value);
            console.log(controlDate, new Date());

            if (controlDate < new Date()) {
                return { invalidDate: true };
            } else {
                return null;
            }
        }
    }
}