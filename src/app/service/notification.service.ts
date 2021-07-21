import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackBar(text: string) : void {
    this.snackBar.open(text,"", {
      duration: 2000
    })
  }
}
