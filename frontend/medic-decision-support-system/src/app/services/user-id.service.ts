import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserIdService {
  private userId: BehaviorSubject<string> = new BehaviorSubject('init2');
  userId$ = this.userId.asObservable();

  private testowyBh: BehaviorSubject<string> = new BehaviorSubject('init');
  testowyBh$ = this.testowyBh.asObservable();

  constructor() { }

  testowyNext(str: string){
    this.testowyBh.next(str);
    console.log('wysyłam nexta')
  }

  sendUserId(uid: string){
    this.userId.next(uid);
    console.log('wysyłam nexta userid');
  }

}
