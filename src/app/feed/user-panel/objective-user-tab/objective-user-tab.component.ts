import { Component, OnInit } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {IntroductionMessageDialogComponent} from "../../introduction-message-dialog/introduction-message-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {IntroductionService} from "../../../Services/IntroductionService";
import {logInService} from "../../../log-in-component/Service/logInService";
import {MissionService} from "../../../Services/MissionService";
import {dtoUser} from "../../../log-in-component/dto/dtoUser";
import {retry, switchMap} from "rxjs";

@Component({
  selector: 'app-objective-user-tab',
  templateUrl: './objective-user-tab.component.html',
  styleUrls: ['./objective-user-tab.component.css']
})
export class ObjectiveUserTabComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  isDoneProcessing: boolean = false;
  isUserSelected: boolean = false;
  panelOpenState: boolean = false;
  selectedValue: string | undefined;

  loggedInUserId: string = "";
  userData: any;
  suggestedUsers: string[] = [];
  suggestedUsersFilled: dtoUser[] = [];

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar, private _mission: MissionService, private _user: logInService, private _introduction: IntroductionService) { }

  ngOnInit(): void {
  }

  processingMethod() {

    this.suggestedUsers = [];
    this.suggestedUsersFilled = [];
    // @ts-ignore
    this._user.getUserByUsername(localStorage.getItem('username')).subscribe(response => {
      this.userData =  response.body;
      // @ts-ignore
      this.loggedInUserId = response.body?.id_User;
      this._mission.getSuggestedUsers("2", this.userData?.id_User).subscribe(response => {
        // @ts-ignore
        this.suggestedUsers = response.body?._users;
        this._introduction.GetPendingOrAwaitingIntroductionRequests(this.loggedInUserId, true).subscribe(
            result => {

              // @ts-ignore
              for (let i = 0; i< result.body?.length; i++) {
                // @ts-ignore
                for (let j = 0; j < this.suggestedUsers.length; j++) {
                  // @ts-ignore
                  if(this.suggestedUsers[j] == result.body[i].introduction_Request_From_User.value){
                    this.suggestedUsers.splice(j, 1);
                  } else { // @ts-ignore
                    if (this.suggestedUsers[j] == result.body[i].introduction_Request_To_User.value) {
                      this.suggestedUsers.splice(j, 1);
                    }
                  }

                }
              }

              // @ts-ignore
              for(let i = 0; i < this.suggestedUsers.length; i++){
                // @ts-ignore
                this._user.getUserById(this.suggestedUsers[i]).subscribe(
                  (response) => {
                    if (response.body) {
                      this.suggestedUsersFilled.push(response.body);
                    }
                  }
                );
              }
              setTimeout(() => {
                this.isDoneProcessing = !this.isDoneProcessing;
              }, 1000);

            });
      })
    });


      //this._mission.getSuggestedUsers("2", localStorage.getItem('username')).subscribe();
      //Request users

  }

  setUserSelected() {
    this.isUserSelected = true;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(IntroductionMessageDialogComponent, {
      width: '400px'
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null || result != undefined){
        // @ts-ignore
        this._user.getUserByUsername(this.selectedValue).subscribe(response => {
          // @ts-ignore
          this._introduction.addIntroductionBeginner(result, this.loggedInUserId, response.body?.id_User).subscribe(result => {
            this.openSnackBar();
            setTimeout(()=>{
              window.location.reload();
            },500);
          });
        });
      }
    });
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
