import { Component, OnInit } from '@angular/core';
import {BottomSheetComponent} from "../search-user-tab/bottom-sheet/bottom-sheet.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {SimpleUserDto} from "../../../dto/SimpleUserDto";
import {logInService} from "../../../Services/logInService";
import {RelationService} from "../../../Services/RelationService";

@Component({
  selector: 'app-search-friends-tab',
  templateUrl: './search-friends-tab.component.html',
  styleUrls: ['./search-friends-tab.component.css']
})
export class SearchFriendsTabComponent implements OnInit {

  panelOpenState: boolean = false;

  array_users: Array<any> = [];

  final_users_array: Array<SimpleUserDto> = [];

  array_userIds: Array<string> = [];

  userToBeAdded: any;

  constructor(private _bottomSheet: MatBottomSheet, private _user: logInService, private _relation: RelationService) { }

  ngOnInit(): void {
  }

  openBottomSheet(): void {

    this.array_users = [];
    this.array_userIds = [];
    this.userToBeAdded = null;
    this.final_users_array = [];
    this.panelOpenState = false;
      this._user.getUserByUsername(localStorage.getItem('username')).subscribe(
        resultUserId => {
          // @ts-ignore
          this._relation.getRelationOfUser(resultUserId.body?.id_User).subscribe(
            resultRelation => {
              this.userToBeAdded = null;
              // @ts-ignore
              for (let i = 0; i < resultRelation.body.length; i++) {
                // @ts-ignore
                if(resultUserId.body?.id_User == resultRelation.body[i].id_UserA){
                  // @ts-ignore
                  this.userToBeAdded = resultRelation.body[i].id_UserB;
                  this.array_userIds.push(this.userToBeAdded);
                } else { // @ts-ignore
                  if (resultUserId.body?.id_User == resultRelation.body[i].id_UserB) {
                    // @ts-ignore
                    this.userToBeAdded = resultRelation.body[i].id_UserA;
                    this.array_userIds.push(this.userToBeAdded);
                  }
                }
              }

              this._user.getALlUsersTest().subscribe(resultAllUsers => {
                for(let i = 0; i < resultAllUsers.body.length; i++){
                  this.array_users.push(resultAllUsers.body[i]);
                }

                for(let i = 0; i < this.array_users.length; i++) {
                  for(let j = 0; j < this.array_userIds.length; j++){

                    if(this.array_users[i].id_User == this.array_userIds[j]){
                      const dto: SimpleUserDto = {
                        // @ts-ignore
                        username: this.array_users[i].username,
                        // @ts-ignore
                        name: this.array_users[i].nome
                      };
                      this.final_users_array.push(dto);
                    } else if(this.array_users[i].id_User == undefined){
                    }
                  }
                }

                this._bottomSheet.open(BottomSheetComponent, {
                  data: this.final_users_array,
                });
              })

            }
          )
        }
      );
  }

}
