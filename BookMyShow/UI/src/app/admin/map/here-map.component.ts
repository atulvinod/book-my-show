import { LocationService } from './../../services/location.service';
import { Component, ElementRef, Input, SimpleChanges, ViewChild } from "@angular/core";
declare var H: any;

@Component({
    selector: "app-map",
    templateUrl: "./here-map.component.html"
})
export class MapComponent {
    private platform: any;

    @Input() selectedLat;
    @Input() selectedLng;

    @ViewChild("map")
    public mapElement: ElementRef;

    map: any;
    locationMarker: any

    constructor(public locationService: LocationService) {
        this.platform = new H.service.Platform({
            "apikey": this.locationService.apiKey
        });
    }

    ngAfterViewInit() {
        console.log(this.selectedLat, this.selectedLng);

        let defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.vector.normal.map,
            {
                zoom: 10,
                center: { lat: this.selectedLat, lng: this.selectedLng }
            }
        );
        this.locationMarker = new H.map.DomMarker({ lat: this.selectedLat, lng: this.selectedLng });
        this.map.addObject(this.locationMarker);

    }

    ngOnChanges(changes: SimpleChanges) {
        (this.mapElement.nativeElement as HTMLElement).innerHTML = "";
        
        let defaultLayers = this.platform.createDefaultLayers();
        this.map = new H.Map(
            this.mapElement.nativeElement,
            defaultLayers.vector.normal.map,
            {
                zoom: 10,
                center: { lat: this.selectedLat, lng: this.selectedLng }
            }
        );

        if (this.map != undefined) {
            this.map.setCenter({ lat: this.selectedLat, lng: this.selectedLng })
            this.map.setZoom(14);
            this.locationMarker = new H.map.DomMarker({ lat: this.selectedLat, lng: this.selectedLng });
            this.map.addObject(this.locationMarker);
            // this.locationMarker.setGeometry({ lat: this.selectedLat, lng: this.selectedLng })
        }
    }
}