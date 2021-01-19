export class VenueModel {

    id: string;
    showDateTime: string;
    address: string;
    totalSeatCount: string | number;
    availableSeatCount: string | number;
    showId: string;
    showPrice: string;

    constructor(args: {}) {
        this.showDateTime = args["showDateTime"]
        this.id = args["id"]
        this.address = args["address"]
        this.totalSeatCount = args["totalSeatCount"]
        this.availableSeatCount = args["availableSeatCount"]
        this.showId = args["showId"]
        this.showPrice = args["showPrice"]
    }
}