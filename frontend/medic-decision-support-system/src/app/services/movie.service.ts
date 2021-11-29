import { Observable } from 'rxjs';
import { Movie } from './../interfaces/Movie';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from './../common/global-constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiURL = GlobalConstants.apiURL + '/api/movies';
  private baseUrl = GlobalConstants.apiURL;
  private httpOptions = GlobalConstants.httpOptions;

constructor(private http: HttpClient) { }

addMovie(movie: Movie): Observable<any>{
  return this.http.post(this.apiURL, movie, {observe: 'response'});
}

getAllMovies(): Observable<Movie[]> {
  return this.http.get<Movie[]>(this.apiURL);
}

}
