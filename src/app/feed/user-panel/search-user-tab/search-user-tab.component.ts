import { Component, OnInit } from '@angular/core';
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {BottomSheetComponent} from "./bottom-sheet/bottom-sheet.component";
import {logInService} from "../../../log-in-component/Service/logInService";
import {SimpleUserDto} from "../../../dto/SimpleUserDto";

@Component({
  selector: 'app-search-user-tab',
  templateUrl: './search-user-tab.component.html',
  styleUrls: ['./search-user-tab.component.css']
})
export class SearchUserTabComponent implements OnInit {

  panelOpenState: boolean = false;

  array_users: Array<any> = [];

  final_array: Array<any> = [];

  constructor(private _bottomSheet: MatBottomSheet, private _user: logInService) { }

  ngOnInit(): void {
  }

  openBottomSheet(): void {
    //(<HTMLInputElement>document.getElementById('nome_utilizador')).value;
    this.array_users = [];
    this.final_array = [];
    this._user.getALlUsersTest().subscribe(result => {
      for(let i = 0; i < result.body.length; i++){
        const dto: SimpleUserDto = {
          username: result.body[i].username,
          name: result.body[i].nome
        };
        this.array_users.push(dto);
      }
      this.final_array = this.array_users.filter(s => s.name.includes((<HTMLInputElement>document.getElementById('nome_utilizador')).value))


      this._bottomSheet.open(BottomSheetComponent, {
        data: this.final_array
      });
    })

  }

}
