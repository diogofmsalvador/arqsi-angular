import {Component, Input, OnInit} from '@angular/core';
import {IntroductionService} from "../../Services/IntroductionService";
import {switchMap} from "rxjs";
import {HttpResponse} from "@angular/common/http";
import {dtoUser} from "../../dto/dtoUser";
import {logInService} from "../../Services/logInService";
import {IntroductionDto} from "../../dto/IntroductionDto";
@Component({
  selector: 'app-introduction-panel',
  templateUrl: './introduction-panel.component.html',
  styleUrls: ['./introduction-panel.component.css']
})
export class IntroductionPanelComponent implements OnInit {

  @Input() yourIntroduction: boolean = false;
   MyIntroductions: IntroductionDto[] | null | undefined;
  IntroductionsPedidas : IntroductionDto[] | null | undefined;
  IntroductionsPedidasAccept : IntroductionDto[] =[];
  IntroductionsPedidasAwaiting : IntroductionDto[] = [];
  IntroductionsPedidasDenied : IntroductionDto[] =[];
  isOk = false;
  isMyIntroduction = true;
  constructor(private introductionService: IntroductionService, private logInService: logInService) { }

  ngOnInit(): void {
    if(this.yourIntroduction){
      this.logInService.getUserByUsername(localStorage.getItem('username')).pipe(
        switchMap((res1: HttpResponse<dtoUser>) =>{
          return this.introductionService.GetPendingOrAwaitingIntroductionRequests(res1.body?.id_User,true);
        })
      ).subscribe((resposta: HttpResponse<IntroductionDto[]>) => {
        this.MyIntroductions = resposta.body;
        if(this.MyIntroductions !==null){
        for(let i =0; i<this.MyIntroductions?.length;i++){
          if(this.MyIntroductions[i].status == 2){
            this.IntroductionsPedidasAwaiting.push(this.MyIntroductions[i]);
          }else if(this.MyIntroductions[i].status == 3){
            this.IntroductionsPedidasAccept.push(this.MyIntroductions[i]);
          }else if(this.MyIntroductions[i].status == 4){
            this.IntroductionsPedidasDenied.push(this.MyIntroductions[i]);
          }
        }
        }
        this.isMyIntroduction= true;
        this.isOk = true;
      });
    } else {
      this.logInService.getUserByUsername(localStorage.getItem('username')).pipe(
        switchMap((res1: HttpResponse<dtoUser>) =>{
          return this.introductionService.GetPendingOrAwaitingIntroductionRequests( res1.body?.id_User,false);
        })
      ).subscribe((resposta: HttpResponse<IntroductionDto[]>) => {
        this.IntroductionsPedidas = resposta.body;
        if(this.IntroductionsPedidas !==null) {
          for (let i = 0; i < this.IntroductionsPedidas?.length; i++) {
            if(this.IntroductionsPedidas[i].status == 2){
              this.IntroductionsPedidasAwaiting.push(this.IntroductionsPedidas[i]);
            }else if(this.IntroductionsPedidas[i].status == 3){
              this.IntroductionsPedidasAccept.push(this.IntroductionsPedidas[i]);
            }else if(this.IntroductionsPedidas[i].status == 4){
              this.IntroductionsPedidasDenied.push(this.IntroductionsPedidas[i]);
            }
          }
        }
        this.isMyIntroduction= false;
        this.isOk = true;
      });
    }
  }

}
