import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class LocationService {

    apiKey: string = "ZKIJsD9bAD5BKXEW5S5Gj3LpiRMG621COaioPh9icwM"
    lat:number = 0;
    lng:number = 0;
    constructor(private http: HttpClient) {
        this.getPosition().then(value=>{
            this.lat = value["lat"]
            this.lng = value["lng"];
            console.log(value);
        })
    }

    fetchSuggestions(query: string) {
  
        return this.http.get(`https://places.ls.hereapi.com/places/v1/discover/search
        ?apiKey=${this.apiKey}&at=${this.lat.toFixed(3)},${this.lng.toFixed(3)}&q=${query}`)
    }

    fetchAddressViaGeocode(lat, lng) {

    }

    getPosition(): Promise<any> {
        return new Promise((resolve, reject) => {

            navigator.geolocation.getCurrentPosition(resp => {

                resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
            },
                err => {
                    reject(err);
                });
        });

    }
}