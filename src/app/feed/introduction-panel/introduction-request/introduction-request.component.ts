import {AfterContentInit, Component, Input, OnInit} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {EMPTY, switchMap} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {dtoUser} from "../../../log-in-component/dto/dtoUser";
import {IntroductionDto} from "../../../dto/IntroductionDto";
import {logInService} from "../../../log-in-component/Service/logInService";
import {IntroductionService} from "../../../Services/IntroductionService";
@Component({
  selector: 'app-introduction-request',
  templateUrl: './introduction-request.component.html',
  styleUrls: ['./introduction-request.component.css']
})
export class IntroductionRequestComponent implements OnInit, AfterContentInit {

  @Input() setColor: number = 0;
  @Input() stage: boolean = false;
  @Input() menssagem: string| undefined ='';
  @Input() isMyIntroduction: boolean = true;
  @Input() idUserObjective: string | undefined= '';
  @Input() idUser: string | undefined= '';
  @Input() idIntroduction: string | undefined= '';
  userName: string | null | undefined ='';
  userNameObjective: string | null | undefined = '';
  constructor( private logInService: logInService, private introductionService: IntroductionService) { }

  ngOnInit(): void {
    if(this.idUser){
   this.logInService.getUserById(this.idUser).pipe(
      switchMap((res1: HttpResponse<dtoUser>) =>{
        this.userName = res1.body?.username;
        if(this.idUserObjective!==undefined){
        return this.logInService.getUserById(this.idUserObjective);
        }
        return EMPTY;
      })
    ).subscribe((resposta: HttpResponse<dtoUser>) => {
      this.userNameObjective = resposta.body?.username;
    });
    }
  }

  ngAfterContentInit() {
    setTimeout(() => {
      if(this.setColor == 1){
        for(let i = 0; i < document.getElementsByClassName('introduction_card1').length; i++){
          document.getElementsByClassName('introduction_card1')[i].setAttribute('style', 'background: #e7f3e5;margin-bottom: 6px;margin-top: 6px');
        }
      } else if(this.setColor == 2) {
        for(let i = 0; i < document.getElementsByClassName('introduction_card2').length; i++) {
          document.getElementsByClassName('introduction_card2')[i].setAttribute('style', 'background: #ece1d6;margin-bottom: 6px;margin-top: 6px');
        }
      } else if(this.setColor == 3) {
        for(let i = 0; i < document.getElementsByClassName('introduction_card3').length; i++) {
          document.getElementsByClassName('introduction_card3')[i].setAttribute('style', 'background: #eee0e0;margin-bottom: 6px;margin-top: 6px');
        }
      }
    }, 200);
  }

  acceptIntroduction(): void {
      this.introductionService.AproveOrRejectIntroduction(this.idIntroduction, 3,this.idUserObjective).subscribe(result =>{
        alert('Introdução aceite com sucesso!');
        window.location.reload();
    });
  }

  rejectIntroduction() {
    this.introductionService.AproveOrRejectIntroduction(this.idIntroduction, 4,this.idUserObjective).subscribe(result =>{
      alert('Introdução rejeitada com sucesso!')
      window.location.reload();
    });

  }
}
