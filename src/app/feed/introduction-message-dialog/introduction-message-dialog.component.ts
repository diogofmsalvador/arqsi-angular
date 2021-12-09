import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-introduction-message-dialog',
  templateUrl: './introduction-message-dialog.component.html',
  styleUrls: ['./introduction-message-dialog.component.css']
})
export class IntroductionMessageDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<IntroductionMessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
