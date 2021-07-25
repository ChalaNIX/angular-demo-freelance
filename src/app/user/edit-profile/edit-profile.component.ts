import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public profileEditForm!: FormGroup;

  constructor(private userService: UserService,
              private dialogRef: MatDialogRef<EditProfileComponent>,
              private formBuilder: FormBuilder,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) public data : any) { }

  ngOnInit(): void {
    this.profileEditForm = this.createEditForm();
  }

  private createEditForm() : FormGroup {
    return this.formBuilder.group({
      name: [this.data.user.name, Validators.compose([Validators.required])],
      lastname: [this.data.user.lastname, Validators.compose([Validators.required])]
    })
  }

  submit() : void {
    this.userService.updateUser(this.updateUser())
      .subscribe(() => {
        this.notificationService.showSnackBar("Profile updated");
      });
    this.dialogRef.close();
  }

  private updateUser() : User {
    this.data.user.name = this.profileEditForm.value.name;
    this.data.user.lastname = this.profileEditForm.value.lastname;

    return this.data.user;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
