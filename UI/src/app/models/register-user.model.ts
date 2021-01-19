export class RegisterUserModel {
  
  public userName: string;
  public password: string;
  public email: string;

  constructor(args: {}) {
    this.userName = args["userName"];
    this.password = args["password"];
    this.email = args["email"];
  }
}