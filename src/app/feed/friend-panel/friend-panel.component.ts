import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {IntroductionMessageDialogComponent} from "../introduction-message-dialog/introduction-message-dialog.component";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {shareMessage} from "../../Services/shareMessage";
import {RelationService} from "../../Services/RelationService";
import {RelationString} from "../../dto/RelationString";
import {logInService} from "../../Services/logInService";
import {RelationDto} from "../../dto/RelationDto";
import {MatSliderChange} from "@angular/material/slider";
import {IntroductionService} from "../../Services/IntroductionService";

@Component({
  selector: 'app-friend-panel',
  templateUrl: './friend-panel.component.html',
  styleUrls: ['./friend-panel.component.css']
})
export class FriendPanelComponent implements OnInit {

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;

  isFriend: boolean = false;

  user_id_message: any;
  nome_utilizador: string = "";
  username_message: string = "";
  email_message: string = "";
  telemovel_message: string = "";
  data_message: any;
  tags_message: any;
  emotional_state_message: any;
  relation_state_message: RelationString | undefined;
  relationString = RelationString;

  slider_value: number | null = 0;
  tickInterval = 1;
  dto: RelationDto | undefined;


  constructor(private _user: logInService, private shareMessageService: shareMessage, private _relation: RelationService, public dialog: MatDialog, private _snackBar: MatSnackBar, private _introduction: IntroductionService) { }

  ngOnInit(): void {

    this.shareMessageService.currentMessage.subscribe(message => {
      if(message != null){
        // @ts-ignore
        this.user_id_message = message.user_id;
        // @ts-ignore
        this.nome_utilizador = message.nome;
        // @ts-ignore
        this.username_message = message.username;
        // @ts-ignore
        this.email_message = message.email;
        // @ts-ignore
        this.emotional_state_message = message.emotional_State;
        // @ts-ignore
        this.telemovel_message = message.phone_Number;
        // @ts-ignore
        this.data_message = message.data_Nasc_User;
        // @ts-ignore
        this.tags_message = message.tags_Of_User;
      }

      this._relation.getRelationOfUser(this.user_id_message).subscribe(result => {
        this.isFriend = false;
        this._user.getUserByUsername(localStorage.getItem('username')).subscribe(resultUser => {
          for(let i in result.body){
            // @ts-ignore
            if (result.body[i].id_UserA == this.user_id_message && resultUser.body?.id_User == result.body[i].id_UserB) {
              this.isFriend = true;
              // @ts-ignore
              this.relation_state_message = result.body[i].relation_Type;

              // @ts-ignore
              this.slider_value = result.body[i].connection_Opinion_B_To_A;
            }

            // @ts-ignore
            if(result.body[i]?.id_UserB == this.user_id_message && resultUser.body?.id_User == result.body[i].id_UserA){
              this.isFriend = true;
              // @ts-ignore

              // @ts-ignore
              this.relation_state_message = result.body[i].relation_Type;
              // @ts-ignore
              this.slider_value = result.body[i].connection_Opinion_B_To_A;
                // @ts-ignore
            }
          }
        });
      });
    });
  }
  formatLabel(value: number) {
    if (value >= 10) {
      return Math.round(value );
    }

    return value;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(IntroductionMessageDialogComponent, {
      width: '400px'
     // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != null || result != undefined){
          // @ts-ignore
          this._user.getUserByUsername(localStorage.getItem('username')).subscribe(response2 => {
            // @ts-ignore
          this._introduction.addIntroductionBeginner(result, response2.body?.id_User , this.user_id_message).subscribe(result => {
            window.location.reload();
          });
          });

        this.openSnackBar();
      }
      //this.animal = result;
    });
  }

  openSnackBar() {
    this._snackBar.open('Introdução a utilizador solicitada com sucesso. 🤪', 'Fechar', {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  updateRelation() {
    this._user.getUserByUsername(localStorage.getItem('username')).subscribe(result => {
      const dto: RelationDto = {
        relation_Type: this.relation_state_message
      }
      // @ts-ignore
      this._relation.updateRelation(result.body?.id_User, this.user_id_message, dto).subscribe(resultNext => {
        alert('Relação editada com sucesso!')
      })
    })

  }

  updateConnectionOpinion() {
    this._user.getUserByUsername(localStorage.getItem('username')).subscribe(result => {
      // @ts-ignore
      this._relation.getRelationOfUser(result.body?.id_User).subscribe(resultGetRelation => {

        let dtoConnection: RelationDto = {};
        // @ts-ignore
        for(let i = 0; i < resultGetRelation.body.length; i++){
        //  console.log("=========================")
        //  console.log("test a --> " + result.body?.id_User)
       //   console.log("test b --> " + this.user_id_message)
          // @ts-ignore
     //     console.log("user b --> " + resultGetRelation.body[i].id_UserB);
          // @ts-ignore
       //   console.log("user a --> " + resultGetRelation.body[i].id_UserA);
       //   console.log("=========================")
          // @ts-ignore
          if(resultGetRelation.body[i].id_UserA == result.body?.id_User && resultGetRelation.body[i].id_UserB == this.user_id_message){
            dtoConnection = {
              // @ts-ignore
              connectionOpinion_Of_UserA: this.slider_value
            }
          }
          // @ts-ignore
          if(resultGetRelation.body[i].id_UserB == result.body?.id_User && resultGetRelation.body[i].id_UserA == this.user_id_message){
            dtoConnection = {
              // @ts-ignore
              connectionOpinion_Of_UserA: this.slider_value
            }
          }
        }
        // @ts-ignore
        this._relation.updateRelation(result.body?.id_User, this.user_id_message, dtoConnection).subscribe(resultNext => {
          alert('Opinião editada com sucesso!')
        })
      });
    })
  }

  onInputChange(event: any) {
    this.slider_value = event.value;
  }


  getSliderTickInterval(): number | 'auto' {
    if (this.slider_value) {
      return this.slider_value ? 'auto' : this.tickInterval;
    }
    return 7;
  }
}
