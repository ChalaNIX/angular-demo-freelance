import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Job} from "../../models/Job";
import {JobService} from "../../service/job.service";
import {CommentService} from "../../service/comment.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  id!: string;
  job!: Job;
  isDataLoaded = false;
  commentForm!: FormGroup;

  constructor(private _activatedRoute: ActivatedRoute,
              private jobService: JobService,
              private commentService: CommentService,
              private formBuilder : FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      // @ts-ignore
      this.id = params.get('id');
    });
    this.jobService.getJobById(this.id)
      .subscribe(data => {
        console.log("Job by id: " + data);
        this.job = data;
      });
    this.commentService.getAllCommentsForJob(this.id)
      .subscribe(data => {
        console.log("comments: " + data);
        this.job.comments = data;
        this.job.comments.forEach(comment => {
          comment.commentDate = this.timeSince(comment.commentDate) + ' ago';
        })
      })
    this.commentForm = this.createCommentForm();
    this.isDataLoaded = true;
  }

  createCommentForm() : FormGroup {
    return this.formBuilder.group({
      message: ['', Validators.compose([Validators.required])]
    })
  }

  submit() : void {
    this.commentService.createComment(this.id, this.commentForm.value.message)
      .subscribe(data => {
        console.log(data);
        window.location.reload();
    })
  }

  private timeSince(date : string) : string {
    // @ts-ignore
    var seconds = Math.floor((new Date() - new Date(date)) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }
}
