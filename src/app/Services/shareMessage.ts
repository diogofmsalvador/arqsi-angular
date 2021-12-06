import {BehaviorSubject} from 'rxjs';

// tslint:disable-next-line:class-name
export class shareMessage {
  public editDataDetails = null;
  private messageSource = new  BehaviorSubject(this.editDataDetails);
  currentMessage = this.messageSource.asObservable();
  constructor(){}

  changeMessage(message: any): void {
    // @ts-ignore
    this.messageSource.next(message);
  }

  resetMessage(): void {
    this.messageSource.next(null);
  }
}
