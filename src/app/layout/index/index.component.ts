import { Component, OnInit } from '@angular/core';
import {Job} from "../../models/Job";
import {User} from "../../models/User";
import {JobService} from "../../service/job.service";
import {UserService} from "../../service/user.service";
import {NotificationService} from "../../service/notification.service";
import {CommentService} from "../../service/comment.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  isJobLoaded = false;
  jobs!: Job[];
  isUserDataLoaded = false;
  user!: User;

  constructor(private jobService: JobService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    this.jobService.getAllJobs()
      .subscribe(data => {
        this.jobs = data;
        this.isJobLoaded = true;
      });

    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isUserDataLoaded = true;
      })
  }
}
