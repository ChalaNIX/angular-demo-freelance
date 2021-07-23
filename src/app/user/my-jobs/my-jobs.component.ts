import { Component, OnInit } from '@angular/core';
import {Job} from "../../models/Job";
import {JobService} from "../../service/job.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.css']
})
export class MyJobsComponent implements OnInit {

  jobs!: Job[];
  isUserJobsDataLoaded = false;

  constructor(private jobService: JobService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.jobService.getJobsForCurrentUser()
      .subscribe(data => {
        this.jobs = data;
        this.isUserJobsDataLoaded = true;
      })
  }

  deleteJob(job: Job, jobIndex: number) {
    const result = confirm('Do you really want to delete this Job?');
    if (result) {
      this.jobService.deleteJob(job.id)
        .subscribe(() => {
          this.jobs.splice(jobIndex, 1);
          this.notificationService.showSnackBar('Job deleted');
        });
    }
  }

}
