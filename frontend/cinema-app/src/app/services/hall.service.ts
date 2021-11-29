import { GlobalConstants } from './../common/global-constants';
import { Observable } from 'rxjs';
import { Hall } from './../interfaces/Hall';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  private apiURL = GlobalConstants.apiURL + '/api/halls';
  private baseUrl = GlobalConstants.apiURL;
  private httpOptions = GlobalConstants.httpOptions;

constructor(private http: HttpClient) { }

addHall(hall: Hall): Observable<any>{
  return this.http.post(this.apiURL, hall, {observe: 'response'});
}

getAllHalls(): Observable<Hall[]>{
  return this.http.get<Hall[]>(this.apiURL);
}

getHallById(id: string): Observable<Hall>{
  return this.http.get<Hall>(this.apiURL + '/' + id);
}
}
