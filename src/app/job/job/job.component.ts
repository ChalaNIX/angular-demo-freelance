import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Job} from "../../models/Job";
import {JobService} from "../../service/job.service";
import {CommentService} from "../../service/comment.service";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  job!: Job;
  isDataLoaded = false;

  constructor(private _activatedRoute: ActivatedRoute,
              private jobService: JobService,
              private commentService: CommentService) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      let id = params.get("id");
      // @ts-ignore
      this.jobService.getJobById(id)
        .subscribe(data => {
          this.job = data;
          console.log(data);
        });

      // @ts-ignore
      this.commentService.getAllCommentsForJob(id)
        .subscribe(data => {
          this.job.comments = data;
          console.log(data);
        })
    });
    this.isDataLoaded = true;
  }


}
