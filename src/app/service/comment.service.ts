import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

const COMMENT_API = environment.api + "/comment/"

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  createComment(jobId: string, message: string) : Observable<any> {
    return this.httpClient.post(COMMENT_API + jobId + "/create", {
      message: message
    })
  }

  getAllCommentsForJob(jobId: string) : Observable<any> {
    return this.httpClient.get(COMMENT_API + jobId + "/all");
  }
}
