import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private notificationService: NotificationService,
              private router: Router,
              private formBuilder: FormBuilder) {
    if (this.tokenStorageService.getUser()) {
      this.router.navigate(['/main']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  private createLoginForm() : FormGroup {
    return this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit() : void {
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe((data: any) => {
      console.log(data);

      this.tokenStorageService.saveToken(data.token);
      this.tokenStorageService.saveUser(data);

      this.notificationService.showSnackBar("Welcome" + data.name + "!");
      this.router.navigate(['/main'])
      window.location.reload();
    }, (error: any) => {
      console.log(error);
      this.notificationService.showSnackBar(error);
    })
  }
}
