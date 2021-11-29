import { Showing } from './../interfaces/Showing';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from './../common/global-constants';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowingService {
  private apiURL = GlobalConstants.apiURL + '/api/showings';
  private baseUrl = GlobalConstants.apiURL;
  private httpOptions = GlobalConstants.httpOptions;

  constructor(private http: HttpClient) { }

  addShowing(showing: Showing): Observable<any>{
    return this.http.post(this.apiURL, showing, {observe: 'response'});
  }

  getShowings(): Observable<Showing[]>{
    return this.http.get<Showing[]>(this.apiURL);
  }
}
