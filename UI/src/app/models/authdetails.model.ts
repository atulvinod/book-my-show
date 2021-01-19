export class AuthDetails {

    public accessToken: string;
    public userId: string;
    public userName: string;
    public userRole: string;

    constructor(args: {}) {
        this.accessToken = args["accessToken"];
        this.userId = args["userId"];
        this.userName = args["userName"];
        this.userRole = args["userRole"]
    }
}