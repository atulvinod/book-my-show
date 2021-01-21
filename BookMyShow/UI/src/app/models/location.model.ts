import { ThrowStmt } from "@angular/compiler";

export class LocationModel {
    title: string;
    category: string;
    lat: string;
    lng: string;
    
    constructor(args: {}) {
        this.title = args["title"];
        this.category = args["category"]
        this.lat = args["lat"];
        this.lng = args["lng"];
    }
}