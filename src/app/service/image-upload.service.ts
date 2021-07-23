import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";

const IMAGE_API = "http://localhost:8080/api/image/";

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private httpClient: HttpClient) { }

  public getProfileImage() : Observable<any> {
    return this.httpClient.get(IMAGE_API + "profile");
  }

  public uploadUserImage(file: File) : Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);
    return this.httpClient.post(IMAGE_API + 'upload', uploadData);
  }
}
