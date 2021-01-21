import { LocationModel } from './../../models/location.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LocationService } from './../../services/location.service';
import { forkJoin } from 'rxjs';
import { VenueModel } from 'src/app/models/venue.model';
import { ShowModel } from 'src/app/models/show.model';
import { ShowsService } from './../../services/shows.service';
import { FormGroup, FormArray, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewChildren } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: "app-admin-create",
    templateUrl: "./admin-create-show.component.html",
})
export class AdminCreateShowComponent implements OnInit {

    newShowForm: FormGroup;
    locationSearch: FormGroup;
    suggestedLocations: LocationModel[] = []
    showLocationPicker = false;
    selectedLat = 37.7397;
    selectedLng = -121.4252;
    selectedAddress = "";
    currentLocationControlIndex = 0;

    constructor(public showService: ShowsService, public router: Router, public locationService: LocationService) {

        this.newShowForm = new FormGroup({
            name: new FormControl("", [Validators.required]),
            description: new FormControl("", [Validators.required]),
            posterImgPath: new FormControl("", [Validators.required]),
            duration: new FormControl("", [Validators.required]),
            genre: new FormControl("", [Validators.required]),
            showVenues: new FormArray([])
        })

        this.locationSearch = new FormGroup({
            search: new FormControl("", [Validators.required])
        })
    }

    ngOnInit() {
        this.locationSearch.get("search").valueChanges.pipe(debounceTime(900), distinctUntilChanged()).subscribe(value => {
            this.locationService.fetchSuggestions(value).subscribe(value => {
                this.suggestedLocations = [];

                (value["results"]["items"] as []).map((i) => {
                    let parsed: LocationModel = {
                        title: i["title"],
                        category: i["category"]["id"],
                        lat: i["position"][0],
                        lng: i["position"][1]
                    }
                    this.suggestedLocations.push(parsed);
                })
            })
        })
    }

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
                this.router.navigate(['/admin']);
            }, error => console.error(error));
        })
    }

    dateValidator(): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            let controlDate = new Date(control.value);
            if (controlDate < new Date()) {
                return { invalidDate: true };
            } else {
                return null;
            }
        }
    }

    selectLocation(location: LocationModel) {

        this.selectedLat = Number(location.lat);
        this.selectedLng = Number(location.lng);
        console.log(this.selectedLat, this.selectedLng);
        this.locationService.fetchAddressViaGeocode(this.selectedLat, this.selectedLng).subscribe((address: {}[]) => {
            if (address["items"].length > 0) {
                this.selectedAddress = address["items"][0]["address"]["label"]
                console.log("recieved address: ", this.selectedAddress);
            } else {
                this.selectedAddress = location.title
            }
        })
    }

    triggerShowLocationPicker(formElementIndex) {
        this.showLocationPicker = true;
        this.currentLocationControlIndex = formElementIndex;
    }

    patchAddressInControl() {
        this.showVenues.controls[this.currentLocationControlIndex].get("address").patchValue(this.selectedAddress);
        this.suggestedLocations = []
        this.showLocationPicker = false;
    }

    deleteLocationForm(formElementIndex){
        this.showVenues.removeAt(formElementIndex)
    }
}