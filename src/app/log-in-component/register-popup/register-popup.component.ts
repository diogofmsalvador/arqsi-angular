import {AfterContentInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {logInService} from "../../Services/logInService";
import {dtoUser} from "../../dto/dtoUser";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {EmotionalStateString} from "../../dto/EmotionalStateString";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";
import {HttpResponse} from "@angular/common/http";
import {EMPTY, Observable, switchMap} from "rxjs";

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-register-popup',
  templateUrl: './register-popup.component.html',
  styleUrls: ['./register-popup.component.css'],
  animations: [
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
    ])
  ]
})

export class RegisterPopupComponent implements OnInit {
  @Input() isRegister: number = 0;
  isComponentOpen = true;
  showText = false;

  startDate = new Date(2012, 1, 1);

  selectable = true;
  removable = true;
  addOnBlur = true;
  buttonAction = 0;
  userdto : dtoUser | null = {username:'', password:''};
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [{name: 'futebol'}, {name: 'ginásios'}];
  formNewUser: FormGroup = new FormGroup({});
  emocional = EmotionalStateString;

  nome: string | null | undefined;

  @Output() onHide = new EventEmitter<boolean>();

  public modeselect = '😄 Feliz';
  isdisable = false;

  constructor(private logInService: logInService, private formBuilder: FormBuilder, private ref: ChangeDetectorRef,  private router: Router) {

  }

  ngOnInit(): void {
    if (this.isRegister === 1) {
      this.buttonAction = 1;
    } else {
      this.tags = [];
      this.buttonAction = 0;
      this.isdisable = true;

      if (document.getElementById('disableOnUpdate') !== null) {
        // @ts-ignore
        document.getElementById('disableOnUpdate').style.pointerEvents = 'none';
        // @ts-ignore
        document.getElementById('disableOnUpdate').style.opacity = '0.7';
      }
      if (localStorage.getItem('username')) {
        // @ts-ignore
        this.logInService.getUserByUsername(localStorage.getItem('username')).subscribe(user => {
          this.userdto = user.body;
          // @ts-ignore
          (document.getElementById('Nome_de_utilizador') as HTMLInputElement).value = user.body?.username;
          // @ts-ignore
          (document.getElementById('Palavra_Passe') as HTMLInputElement).value = user.body?.password;
          // @ts-ignore
          (document.getElementById('check_Palavra_Passe') as HTMLInputElement).value = user.body?.password;
          // @ts-ignore
          this.formNewUser.controls['emotionalState'].setValue(user.body?.emotional_State);
          // @ts-ignore
          (document.getElementById('Nome') as HTMLInputElement).value = user.body?.nome;
          // @ts-ignore
          (document.getElementById('Email') as HTMLInputElement).value = user.body?.email;
          // @ts-ignore
          (document.getElementById('dataNascimento') as HTMLInputElement).value = this.userdto?.data_Nasc_User?.toString().substring(0, (this.userdto?.data_Nasc_User.toString().indexOf('T')));
          // @ts-ignore
          (document.getElementById('Phone') as HTMLInputElement).value = user.body?.phone_Number;

          if(user.body?.tags_Of_User!==undefined &&user.body?.tags_Of_User!==null){
          for (let i = 0; i < user.body?.tags_Of_User.length; i++) {
            this.tags.push({name: user.body?.tags_Of_User[i]});
          }
          }
        });

      }
    }
    this.formNewUser =  new FormGroup( {
      username: new FormControl('', [Validators.required, Validators.min(4)]),
      EmailUser: new FormControl('', [Validators.required, Validators.email]),
      Nome: new FormControl(this.nome, [Validators.required, Validators.pattern('[A-Za-zçãõ ]+')]),
      pass: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9 ]+'), Validators.min(6)]),
      passVerify: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9 ]+'), Validators.min(6)]),
      date: new FormControl('', [Validators.required]),
      emotionalState: new FormControl('', [Validators.required]),
      telemovel: new FormControl('', [Validators.pattern('[0-9]{9}')])
    });
  }

  exitRegister(): void {
    setTimeout(() => {
      this.isComponentOpen = !this.isComponentOpen;
    }, 200);
    setTimeout(() => {
      this.onHide.emit(true);
    }, 1000);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.tags.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  handlerFunction(): void{
    if(this.buttonAction === 0){
      this.updateUser();
    }else{
      this.signInRequest();
    }
  }

  updateUser(): void{
    const tagsFinal = [];

    // @ts-ignore
    this.formNewUser.get('passVerify').markAsTouched();
    // @ts-ignore
    this.formNewUser.get('pass').markAsTouched();

    if ((document.getElementById('Palavra_Passe') as HTMLInputElement).value === (document.getElementById('check_Palavra_Passe') as HTMLInputElement).value) {
      // @ts-ignore
      this.userdto.username = null;
      if ((document.getElementById('Email') as HTMLInputElement).value === this.userdto?.email) {
        this.userdto.email = null;
      } else {
        // @ts-ignore
        this.formNewUser.get('EmailUser').markAsTouched();
        // @ts-ignore
        this.userdto.email = (document.getElementById('Email') as HTMLInputElement).value;
      }
      if ((document.getElementById('Nome') as HTMLInputElement).value === this.userdto?.nome) {
        this.userdto.nome = null;
      } else {
        // @ts-ignore
        this.formNewUser.get('Nome').markAsTouched();
        // @ts-ignore
        this.userdto.nome = (document.getElementById('Nome') as HTMLInputElement).value;
      }
      if ((document.getElementById('Phone') as HTMLInputElement)) {
        if ((document.getElementById('Phone') as HTMLInputElement).value === this.userdto?.phone_Number) {
          this.userdto.phone_Number = null;
        } else {
          // @ts-ignore
          this.formNewUser.get('telemovel').markAsTouched();
          // @ts-ignore
          this.userdto.phone_Number = (document.getElementById('Phone') as HTMLInputElement).value;
        }
      }
      if ((document.getElementById('Palavra_Passe') as HTMLInputElement).value === this.userdto?.password) {
        this.userdto.password = null;
      } else {
        // @ts-ignore
        this.userdto.password = (document.getElementById('Palavra_Passe') as HTMLInputElement).value;
      }
      // @ts-ignore
      if (this.formNewUser.get('emotionalState')?.value === this.userdto?.emotional_State) {
        // @ts-ignore
        this.userdto.emotional_State = null;
      } else {
        // @ts-ignore
        this.formNewUser.get('emotionalState').markAsTouched();
        // @ts-ignore
        this.userdto.emotional_State = this.formNewUser.get('emotionalState')?.value;
      }

      if ((document.getElementById('dataNascimento') as HTMLInputElement).value === this.userdto?.data_Nasc_User?.toString().substring(0, (this.userdto?.data_Nasc_User.toString().indexOf('T')))) {
        this.userdto.data_Nasc_User = null;
      } else {
        // @ts-ignore
        this.formNewUser.get('date').markAsTouched();
        // @ts-ignore
        this.userdto.data_Nasc_User = (document.getElementById('dataNascimento') as HTMLInputElement).value
      }

      for (let j = 0; j < this.tags.length; j++) {
        let check = true;
        // @ts-ignore
        for (let i = 0; i < this.userdto?.tags_Of_User?.length; i++) {
          // @ts-ignore
          if (this.userdto?.tags_Of_User[i] === this.tags[j].name) {
            check = false;
          }
        }
        if (check) {
          tagsFinal.push(this.tags[j].name);
        }
      }
      if (tagsFinal.length != 0) {
        // @ts-ignore
        this.userdto?.tags_Of_User = tagsFinal;
      } else {
        // @ts-ignore
        this.userdto?.tags_Of_User = [];
      }

      // console.log(this.userdto?.tags_Of_User);

      if (this.userdto !== null) {
          // @ts-ignore
        this.logInService.getUserByUsername(localStorage.getItem('username')).pipe(
          switchMap((res1: HttpResponse<dtoUser>) =>{
            // @ts-ignore
            this.userdto?.id_User = res1.body.id_User;


            return this.logInService.updateUser(this.userdto);
          })
        ).subscribe(() => {
          if(this.userdto?.tags_Of_User?.length != 0) {
            // @ts-ignore
            this.logInService.addTagsToUser(this.userdto?.tags_Of_User, this.userdto?.id_User).subscribe(
              () => {}
            );
          }
            alert("Dados atualizados com sucesso!");
            this.router.navigate(['feed']);
        });
      }
    } else {
      alert('Palavras passes não concidem!');
    }
  }

  signInRequest(): void {
    // @ts-ignore
    if (this.formNewUser.status === 'VALID' && this.tags.length !== 0) {
      if ((document.getElementById('Palavra_Passe') as HTMLInputElement).value === (document.getElementById('check_Palavra_Passe') as HTMLInputElement).value) {
        const dtouser: dtoUser = {
          username: (document.getElementById('Nome_de_utilizador') as HTMLInputElement).value,
          password: (document.getElementById('Palavra_Passe') as HTMLInputElement).value,
          // @ts-ignore
          emotionalState: this.formNewUser.get('emotionalState').value,
          nome: (document.getElementById('Nome') as HTMLInputElement).value,
          email: (document.getElementById('Email') as HTMLInputElement).value,
          dataNasc: new Date((document.getElementById('dataNascimento') as HTMLInputElement).value),
          phoneNumber: (document.getElementById('Phone') as HTMLInputElement).value,
          //  imageUrl : (document.getElementById('Password') as HTMLInputElement).value,
          tags: this.tags.map(u => u.name)
        };

        this.logInService.addUser(dtouser).subscribe(result => {
          localStorage.setItem('username',(document.getElementById('Nome_de_utilizador') as HTMLInputElement).value);
          alert('Registado com sucesso, bem vindo '+ (document.getElementById('Nome_de_utilizador') as HTMLInputElement).value);
          this.router.navigate(['/feed']);
        });
      } else {
        alert('Palavras passes não concidem!');
      }
    } else {
      alert('Certefique-se que preencheu bem todos os dados!')
    }
  }
}
