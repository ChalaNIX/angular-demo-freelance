import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";

const USER_API = "http://localhost:8080/api/user/"

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUserById(id : number) : Observable<any> {
    return this.httpClient.get(USER_API + id)
  }

  getCurrentUser() : Observable<any> {
    return this.httpClient.get(USER_API);
  }

  updateUser(user: User) : Observable<any> {
    return this.httpClient.post(USER_API + "update", user);
  }
}
