import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const COMMENT_API = "http://localhost:8080/api/comment/"

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  createComment(jobId: number, message: string) : Observable<any> {
    return this.httpClient.post(COMMENT_API + jobId + "/create", {
      message: message
    })
  }

  getAllCommentsForJob(jobId: string) : Observable<any> {
    return this.httpClient.get(COMMENT_API + jobId + "/all");
  }

  deleteComment(commentId: number) : Observable<any> {
    return this.httpClient.post(COMMENT_API + commentId + "/delete", null);
  }
}
