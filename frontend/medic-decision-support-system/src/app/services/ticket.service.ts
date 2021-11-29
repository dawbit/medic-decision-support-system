import { Ticket } from './../interfaces/Ticket';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from './../common/global-constants';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Test } from '../interfaces/Test';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private apiURL = GlobalConstants.apiURL + '/api/tickets';
  private baseUrl = GlobalConstants.apiURL;
  private httpOptions = GlobalConstants.httpOptions;

  constructor(private http: HttpClient) { }

  // getTickets(): Observable<Ticket[]>{
  //   return this.http.get<Ticket[]>(this.apiURL);
  // }

  // bilety: Observable<Ticket[]>

  getTickets(showId: string): Observable<Ticket[]>{
    return this.http.get<Ticket[]>(this.apiURL).pipe(
      map(
        res => res.filter(
          res => res.showingId == showId
        )
      )
    )
  }

  getTakenSeats(showId: string): Observable<any[]>{
    return this.http.get<Ticket[]>(this.apiURL).pipe(
      map(
        response => response.filter(
          res => res.showingId == showId
        ).map(
          res => ({
            x: res.fieldX,
            y: res.fieldY
          })
        )
      )
    )
  }

  // getTakenSeats(showId: string): Observable<Ticket[]>{
  //   return this.http.get<Ticket[]>(this.apiURL).pipe(
  //     map(
  //       response => response.filter(
  //         res => res.showingId == showId
  //       )
  //     )
  //   )
  // }

  bookTicket(ticket: Ticket): Observable<any>{
    return this.http.post<Ticket>(this.apiURL, ticket, {observe: 'response'})
  }

  buyTicket(ticket: Ticket, ticketId: string): Observable<any>{
    return this.http.patch<Ticket>(this.apiURL + "/" + ticketId, ticket, this.httpOptions)
  }
}
