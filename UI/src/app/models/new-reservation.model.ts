export class NewReservationModel {

    public userId: string
    public venueId: string;
    public seatNumbers: number[];

    constructor(args: {}) {
        this.userId = args["userId"];
        this.venueId = args["venueId"];
        this.seatNumbers = args["seatNumbers"];
    }
}