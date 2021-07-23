import { Component, OnInit } from '@angular/core';
import {User} from "../../models/User";
import {TokenStorageService} from "../../service/token-storage.service";
import {JobService} from "../../service/job.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {UserService} from "../../service/user.service";
import {ImageUploadService} from "../../service/image-upload.service";
import {EditProfileComponent} from "../edit-profile/edit-profile.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isDataLoaded = false;
  user!: User;
  selectedFile!: File;
  userProfileImage!: File;
  previewImageUrl: any;

  constructor(private tokenStorageService: TokenStorageService,
              private jobService: JobService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private userService: UserService,
              private imageService: ImageUploadService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(data => {
        this.user = data;
        this.isDataLoaded = true;
      });
    this.imageService.getProfileImage()
      .subscribe(data => {
        try {
          this.userProfileImage = data.image;
        } catch (e) {}

      })
  }

  onFileSelected(event: Event): void {

    // @ts-ignore
    this.selectedFile = <HTMLInputElement>event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.previewImageUrl = reader.result;
    }
  }

  onUpload(): void {
    if (this.selectedFile != null) {
      this.imageService.uploadUserImage(this.selectedFile)
        .subscribe(() => {
          this.notificationService.showSnackBar('Profile image changed');
        })
    }
  }

  openEditDialog(): void {
    const editUserDialogConfig = new MatDialogConfig();
    editUserDialogConfig.width = "300px";
    editUserDialogConfig.data = {
      user: this.user
    }
    this.dialog.open(EditProfileComponent, editUserDialogConfig);
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg;base64,' + img;
  }

}
