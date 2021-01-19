export class SocialLoginModel {

    authToken: string;
    name: string;
    email: string;
    idToken:string;

    constructor(args: {}) {
        this.authToken = args["authToken"];
        this.email = args["email"]
        this.name = args["name"];
        this.idToken = args["idToken"];
    }
}