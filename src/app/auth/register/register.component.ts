import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerForm!: FormGroup;

  constructor(private authService: AuthService,
              private tokenService: TokenStorageService,
              private notificationService: NotificationService,
              private router: Router,
              private formBuilder: FormBuilder) {
    if (this.tokenService.getUser()) {
      this.router.navigate(['/main']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      name: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])],
    });
  }

  submit(): void {
    console.log(this.registerForm.value.name);
    console.log(this.registerForm.value.lastname);
    this.authService.register({
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    }).subscribe((data: any) => {
      console.log(data);
      this.notificationService.showSnackBar("Registered successfully!");

      function delay(ms : number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
      }
      (async () => {
        await delay(3000);
        this.router.navigate(['/login'])

      })();
    }, (error: any) => {
      console.log(error);
      this.notificationService.showSnackBar(error);
    })
  }
}
