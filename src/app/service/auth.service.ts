import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

const AUTH_API = "http://localhost:8080/api/auth/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public register(user: {username: string, password: string, confirmPassword: string}): any {
    return this.httpClient.post(AUTH_API + "signup", {
      username: user.username,
      password: user.password,
      confirmPassword: user.confirmPassword
    })
  }

  public login(user: any) : any {
    return this.httpClient.post(AUTH_API + "signin", {
      username: user.username,
      password: user.password
    })
  }
}
