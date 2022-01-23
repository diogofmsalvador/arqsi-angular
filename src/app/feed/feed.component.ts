import {Component, Input, OnInit} from '@angular/core';
import {shareMessage} from "../Services/shareMessage";
import {Router} from "@angular/router";
import {PostService} from "../Services/PostService";
import {logInService} from "../Services/logInService";
import { RelationService } from '../Services/RelationService';
import {RelationDto} from "../dto/RelationDto";
import {HttpResponse} from "@angular/common/http";
import {PostDto} from "../dto/PostDto";
import {MatDialog} from "@angular/material/dialog";
import {CreatePostPopUpComponent} from "./create-post-pop-up/create-post-pop-up.component";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  titleText: any = "Publicações";

  isBackOptionOn: boolean = false;
  username: string = "";
  PostsFriend: PostDto[] = [];
  userId: string | undefined;
  countForca = 0;
  constructor(private shareMessageService: shareMessage, private router: Router, private postService: PostService, private logInService: logInService,
              private relationService: RelationService, private dialog: MatDialog) { }

  ngOnInit(): void {
    // @ts-ignore
    this.username = localStorage.getItem('username');
    this.logInService.getUserByUsername(this.username).subscribe((result)=>{
      this.userId = result.body?.id_User;
      this.relationService.getRelationOfUser(result.body?.id_User).subscribe((result2: HttpResponse<RelationDto[]>)=>{
        let idUserPost;
        const usersId = [];
        if(result2.body!== null) {
          for (let i of result2.body) {
            this.countForca += Number(i.connection_Opinion_B_To_A);
              if(i.id_UserA === result.body?.id_User){
                 idUserPost= i.id_UserB;
              }else{
                idUserPost = i.id_UserA;
              }
            usersId.push(idUserPost);
          }
          usersId.push(this.userId);
          for(let id of usersId){
            this.postService.getPostOfUser(id).subscribe(result3=>{
              if(result3.body!== null){
                for(let post of result3.body){
                  this.PostsFriend.push(post);
                }

              }
            });
          }
        }

      });
    });
    this.shareMessageService.currentMessage.subscribe(message => {
      if(message != null){
        // @ts-ignore
        document.getElementById('middleTitle').setAttribute('class', 'middleSpacer');
        // @ts-ignore
        this.titleText = message.nome;
        this.isBackOptionOn = true;
      } else {
        // @ts-ignore
        document.getElementById('middleTitle').removeAttribute('class');
        this.titleText = "Publicações";
        this.isBackOptionOn = false;
      }
    });
  }

  changeTitle(event: any) {
    this.titleText = event;
  }

  goBackToPosts(){
    this.shareMessageService.resetMessage();
    this.titleText = "Publicações";
    this.isBackOptionOn = false;
  }


  editProfile() {
    this.router.navigate(['/update']);
  }

  addPost(): void {
    const dialogRef = this.dialog.open(CreatePostPopUpComponent, {
      data: {
        userId: this.userId
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
