import { filter, map } from 'rxjs/operators';
import { User } from './../interfaces/User';
import { GlobalConstants } from './../common/global-constants';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiURL = GlobalConstants.apiURL + '/api';
  private baseUrl = GlobalConstants.apiURL;
  private httpOptions = GlobalConstants.httpOptions;
  // private userId = new BehaviorSubject<string | undefined>(undefined);

  private userId: BehaviorSubject<string> = new BehaviorSubject('chuj');
  // userId$ = this.userId.asObservable();

constructor(private http: HttpClient) { }

sendUserId(uid: string){
  console.log('sending');
  this.userId.next(uid);
  console.log('sending done');

}

getUserId2(): Observable<string>{
  return this.userId.asObservable();
}

login(user: User): Observable<any>{
  return this.http.post(this.apiURL + '/auth/login',
  {
    UserName: user.userName,
    Password: user.password
  },
  {
    observe: 'response'
  }
  );
}

register(user: User): Observable<any> {
  return this.http.post(this.apiURL + '/Users', user, { observe: 'response'});
}

getUserId(username: string): Observable<any>{
  return this.http.get<any>(this.baseUrl + '/api/users').pipe(
    map(
      res => res.filter( u => u.userName == username)
    )
  )
}

getUsers(): Observable<any>{
  return this.http.get(this.baseUrl + '/api/users');
}

updateUser(user: User, userId: string): Observable<any>{
  return this.http.patch(this.baseUrl + "/api/users/" + userId, user, this.httpOptions);
}
}
