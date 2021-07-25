import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {JobService} from "../../service/job.service";
import {Job} from "../../models/Job";
import {Router} from "@angular/router";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit {

  jobForm!: FormGroup;
  isJobCreated = false;
  createdJob!: Job;

  constructor(private jobService: JobService,
              private formBuilder: FormBuilder,
              private router: Router,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.jobForm = this.createForm();
  }

  createForm() : FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      price: ['', Validators.compose([Validators.min(0), Validators.required])]
    })
  }

  submit(): void {
    this.jobService.createJob({
      title: this.jobForm.value.title,
      description: this.jobForm.value.description,
      price: this.jobForm.value.price
    }).subscribe(data => {
      this.createdJob = data;

      if (this.createdJob.id != null) {
        this.isJobCreated = true;
        this.router.navigate(['/profile']);
      }
    }, error => {
      console.log(error);
      this.notificationService.showSnackBar(error);
    })
  }
}
