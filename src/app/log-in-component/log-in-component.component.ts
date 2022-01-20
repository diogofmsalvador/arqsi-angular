import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {logInService} from "../Services/logInService";
import {Router} from '@angular/router';
import {dtoUser} from "../dto/dtoUser";
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-log-in-component',
  templateUrl: './log-in-component.component.html',
  styleUrls: ['./log-in-component.component.css'],
  animations: [
    trigger('fadeInOutCard', [
      // ...
      state('fadeInCard', style({
        opacity: 0.8
      })),
      state('fadeOutCard', style({
        opacity: 0
      })),
      transition('fadeInCard => fadeOutCard', [
        animate('1s')
      ]),
      transition('fadeOutCard => fadeInCard', [
        animate('1s')
      ]),
    ]),
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
    trigger('setImage', [
      state('PictureInWithOpacity', style({
        left: "0%",
        top: "0%",
        transform: "translate(37%, 15%) scale(1)"
      })),
      state('PictureSet', style({
        left: "0%",
        top: "0%",
        transform: "translate(-10%, -15%) scale(0.75)"
      })),
      transition('PictureInWithOpacity => PictureSet', [
        animate('2s')
      ]),
      transition('PictureSet => PictureInWithOpacity', [
        animate('2s')
      ]),
    ]),
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(100%)'}),
        animate('500ms ease-in', style({transform: 'translateX(0%)', opacity: 0}))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class LogInComponentComponent implements OnInit {
  public formUser: any;
  hide = true;

  // Opening Pop Up
  isOpen = false;
  isOpenImage = false;
  isImageOpen = false;
  isComponentOpen = false;
  setImage = false;
  showText = false;

  // Register Pop Up
  isRegisterClicked = false;

  constructor(private formBuilder: FormBuilder, private logInService: logInService, private router: Router) { }

  ngOnInit(): void {
    this.formUser =  this.formBuilder.group({
      username : new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required, Validators.min(6), Validators.pattern('[A-Za-z0-9 ]+')])
    });
  }

  ngAfterViewInit() {
    setTimeout( () => {
      this.isOpen = !this.isOpen;
      this.isOpenImage = !this.isOpenImage;
      this.isImageOpen = !this.isImageOpen;
    }, 200);
    setTimeout( () => {
      this.isImageOpen = !this.isImageOpen;
    }, 2000);
    setTimeout( () => {
      this.showText = !this.showText;
    }, 3000);
    setTimeout(() => {
      this.isComponentOpen = !this.isComponentOpen;
    }, 3500);
  }

  initRegister() {
    setTimeout(() => {
      this.showText = !this.showText;
      this.isComponentOpen = !this.isComponentOpen;
      this.isOpenImage = !this.isOpenImage;
    }, 200);
    setTimeout(() => {
      this.isRegisterClicked = true;
    }, 1200);
  }

  changeToLogIn(val: boolean) {
    this.isRegisterClicked = false;
    setTimeout(() => {
      this.showText = !this.showText;
      this.isComponentOpen = !this.isComponentOpen;
      this.isOpenImage = !this.isOpenImage;
    }, 200);
  }

  closeRegister() {
    this.isRegisterClicked = false;
  }

  logInRequest(): void {
    const dtouser: dtoUser = {
      username: (document.getElementById('Username') as HTMLInputElement).value,
      password: (document.getElementById('Password') as HTMLInputElement).value,
    };
    this.logInService.logInRequest(dtouser)
      .subscribe((value) => {
          if (value.ok) {
            alert('Bem vindo '+value.body?.username);
            if(value.body?.username){
            localStorage.setItem('username', value.body?.username);
              this.router.navigate(['/feed']);
            }
          }
        },
        (error: HttpErrorResponse) => {
          alert(error.error);
        });
  }

  getUsers(): void {
    this.logInService.getALlUsersTest().subscribe(value =>{
    });
  }

  test() {
    this.router.navigate(['/update']);
  }
}
