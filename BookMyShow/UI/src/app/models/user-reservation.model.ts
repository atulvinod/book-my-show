export class UserReservationModel {

    public reservations: {
        id: number,
        venueId: number,
        userId: string,
        seatNumber: number,
        reservationCancelled: boolean
    }[]
    public showId: number;
    public venueId: number

    constructor(args: {}) {
        this.reservations = args["reservations"];
        this.showId = args["showId"];
        this.venueId = args["venueId"];
    }
}