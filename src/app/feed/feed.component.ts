import {Component, Input, OnInit} from '@angular/core';
import {shareMessage} from "../Services/shareMessage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  titleText: any = "Publicações";

  isBackOptionOn: boolean = false;
  username: string = "";

  constructor(private shareMessageService: shareMessage, private router: Router) { }

  ngOnInit(): void {
    // @ts-ignore
    this.username = localStorage.getItem('username');
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
}
