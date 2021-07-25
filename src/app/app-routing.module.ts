import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {IndexComponent} from "./layout/index/index.component";
import {AuthGuardService} from "./helper/auth-guard.service";
import {JobComponent} from "./job/job/job.component";
import {ProfileComponent} from "./user/profile/profile.component";
import {MyJobsComponent} from "./user/my-jobs/my-jobs.component";
import {AddJobComponent} from "./user/add-job/add-job.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'main', component: IndexComponent, canActivate: [AuthGuardService]},
  {path: 'job/:id', component: JobComponent, canActivate: [AuthGuardService]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: MyJobsComponent, canActivate: [AuthGuardService]},
      {path: 'add-job', component: AddJobComponent, canActivate: [AuthGuardService]}
    ]},
  {path: '', redirectTo: "main", pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
