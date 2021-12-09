import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from "@angular/material/bottom-sheet";
import {shareMessage} from "../../../../Services/shareMessage";
import {SimpleUserDto} from "../../../../dto/SimpleUserDto";
import {logInService} from "../../../../log-in-component/Service/logInService";
import {EmotionalStateString} from "../../../../dto/EmotionalStateString";

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent implements OnInit {

  @Output() changeMiddleTab = new EventEmitter<string>();

  allUserData: Array<SimpleUserDto> = [];

  constructor(private shareMessageService: shareMessage, private _user: logInService, private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>, @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data)
    this.allUserData = this.data;
  }

  changeMiddleTabMethod(username: string) {
    // this method emits the value of newItemEvent
    this._user.getUserByUsername(username).subscribe(
      result => {
        const dto = {
          user_id: result.body?.id_User,
          username : result.body?.username,
          emotional_State: result.body?.emotional_State,
          nome:result.body?.nome,
          email:result.body?.email,
          data_Nasc_User:result.body?.data_Nasc_User,
          phone_Number: result.body?.phone_Number,
          imageUrl:result.body?.imageUrl,
          tags_Of_User: result.body?.tags_Of_User
        }
        this.shareMessageService.changeMessage(dto);
        this._bottomSheetRef.dismiss();
      }
    )
  }

}
