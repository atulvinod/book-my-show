export class ShowModel {

    public id: number;
    public name: string;
    public duration: {
        hours: number,
        minutes: number,
        seconds: number,
    };
    public posterImgPath: string;
    public genre: string;
    public description: string;

    constructor(args: {}) {
        this.id = args["id"];
        this.name = args["name"];
        this.duration = args["duration"]
        this.posterImgPath = args["posterImgPath"];
        this.genre = args["genre"];
        this.description = args["description"];
    }
}
