import { USER_ROLES } from "../interfaces/interfaces";



export class User {
  private readonly id: string;
  private fullName: string;
  private nickname: string;
  private email: string;
  private password: string;
  private createdAt: string;
  private avatar: string;
  private role: USER_ROLES;
  //private nicknamePassword : string;


  constructor(
    id: string,
    fullName: string,
    nickname: string,
    password: string,
    email: string,
    createdAt: string,
    avatar: string,
    role: USER_ROLES,
  //  namePassword:string
  ) {
    this.id = id;
    this.fullName = fullName;
    this.nickname = "@" + nickname.toLowerCase();
    this.password = password;
    this.email = email;
    this.createdAt = createdAt;
    this.avatar = avatar;
    this.role = role;
   // this.nicknamePassword = nickname + password
  }

  // metodos get e setter

  public getId(): string {
    return this.id;
  }



  public getFullName(): string {
    return this.fullName;
  }


  public getNickname(): string {
    return this.nickname;
  }

  public setNickname(newNickname: string) {
    this.nickname = newNickname;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(newEmail: string) {
    this.email = newEmail;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(newPassword: string): void {
    this.password = newPassword;
  }

  public getAvatar(): string {
    return this.avatar;
  }

  public setAvatar(value: string): void {
    this.avatar = value;
  }

  public getRole(): USER_ROLES {
    return this.role;
  }

  public setRole(value: USER_ROLES): void {
    this.role = value;
  }
  public getCreatedAt(): string {
    return this.createdAt;
  }
 /* public getNicknamePassword(): string {
    return this.nicknamePassword;
  }

  public setNicknamePassword(value: string): void {
    this.nicknamePassword = value;
  }

  public validateUser (inputPassword: string, inputNickname:string){
        if(inputPassword === this.getPassword() && inputNickname === this.getNickname() && this.getNickname()  + this.getPassword()  === this.getNicknamePassword()){
          this.setNicknamePassword("green")
          return this.getNicknamePassword()
        }else{
            return this.getNicknamePassword()
        }
  }*/
}