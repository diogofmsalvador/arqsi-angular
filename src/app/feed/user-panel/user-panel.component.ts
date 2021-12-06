import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css'],
  animations: [
    trigger('fadeInOut', [
      // ...
      state('fadeIn', style({
        opacity: 1
      })),
      state('fadeOut', style({
        opacity: 0
      })),
      transition('fadeIn => fadeOut', [
        animate('1s')
      ]),
      transition('fadeOut => fadeIn', [
        animate('1s')
      ]),
    ]),
  ],
  encapsulation: ViewEncapsulation.None,
})
export class UserPanelComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  isDoneProcessing: boolean = false;
  isUserSelected: boolean = false;
  panelOpenState: boolean = false;
  selectedValue: string | undefined;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {

  }

  processingMethod() {
    setTimeout(() => {
      //Request users
    }, 100);
    setTimeout(() => {
      this.isDoneProcessing = !this.isDoneProcessing;
    }, 1000);
  }

  setUserSelected() {
    this.isUserSelected = true;
  }

  openSnackBar() {
    this._snackBar.open('Introdução a utilizador solicitada com sucesso. 🤪', 'Fechar', {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.panelOpenState = false;
    // @ts-ignore
    this.selectedValue = null;
    this.isDoneProcessing = !this.isDoneProcessing;
  }

}
