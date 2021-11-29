import { UserIdService } from './../../../services/user-id.service';
import { TokenStorageService } from './../../../services/security/token-storage.service';
import { UserService } from './../../../services/user.service';
import { Ticket } from './../../../interfaces/Ticket';
import { TicketService } from './../../../services/ticket.service';
import { Hall } from './../../../interfaces/Hall';
import { HallService } from './../../../services/hall.service';
import { MovieService } from './../../../services/movie.service';
import { ShowingService } from './../../../services/showing.service';
import { Showing } from './../../../interfaces/Showing';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/Movie';
import { map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-tickets-book',
  templateUrl: './tickets-book.component.html',
  styleUrls: ['./tickets-book.component.scss']
})
export class TicketsBookComponent implements OnInit {

  userIdSubscription: Subscription;
  ticketsForm: FormGroup;
  showings$: Observable<Showing[]> | undefined;
  movies$: Observable<Movie[]> | undefined;
  showingsAndMovies$;
  choosenShowing: Showing | undefined;
  choosenHall: Hall | undefined;
  seat: number = 1;
  rows: number[] = [];
  cols: number[] = [];
  currentSeatRow: number = undefined;
  currentSeatCol: number = undefined;
  takenSeats;
  tickets: Ticket[] | undefined;
  userId: string;
  booked: boolean = false;
  bought: boolean = false;
  reservedTicket: any;
  error: string = '';
  bookingRes;
  user_login;

  constructor(
    private showingService: ShowingService,
    private movieService: MovieService,
    private hallService: HallService,
    private ticketService: TicketService,
    private userIdService: UserIdService,

    private userService: UserService,
    private tokenStorage: TokenStorageService,
    // private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    // this.ticketsForm = this.formBuilder.group({
    //   buttons: this.formBuilder.array([])
    // })

    this.showings$ = this.showingService.getShowings();
    this.movies$ = this.movieService.getAllMovies();
	this.user_login = this.tokenStorage.getUser();

    this.showingsAndMovies$ = combineLatest([
      this.showings$,
      this.movies$
    ]).pipe(
      map(([showings, movies]) => {
        return showings.map(
          show => ({
            movieId: show.movieId,
            hallId: show.hallId,
            time: show.time,
            showingId: show.id,
            movieTitle: movies.filter(
              movie => show.movieId === movie.id
            ).map(
              movie => movie.title
            )
          })
        )
      }
      )
    )
  }

  ngOnDestroy() {
    // this.userIdSubscription.unsubscribe();
  }

  chooseShowing(showing: Showing){
    this.userIdService.userId$.subscribe(
      res => {
        this.userId = res;
      }
    )
	
	/*this.userService.getUserId(this.user_login).subscribe(
		res => {
			console.log(res);
			this.userId = res[0].id;
		}
	)*/
	console.log(this.userId);

    console.log(showing);
    this.choosenShowing = showing;

    this.hallService.getHallById(showing.hallId).subscribe(
      res => {
        this.choosenHall = res;
      },
      undefined,
      () => {
        this.initializeSeats(this.choosenHall)
        this.getTakenSeats()
        // this.getTickets()
      }
    )

  }

  initializeSeats(hall: Hall){
    for (let i = 1; i <= hall.sizeX; i++ ){
      this.rows.push(i);
    }
    for (let i = 1; i <= hall.sizeY; i++ ){
      this.cols.push(i);
    }
  }

  setCurrentSeat(row: number, col: number){
    this.currentSeatRow = row;
    this.currentSeatCol = col;
    console.log(col, row)
  }

  getTakenSeats(){
    this.ticketService.getTakenSeats(this.choosenShowing.showingId).subscribe(
      res =>{

        console.log("res zajętych miejsc");
        console.log(res);
        this.takenSeats = res;
        // this.takenSeats = res.map(
        //   res => ({
        //     x: res.fieldX,
        //     y: res.fieldY
        //   })
        // )
      }
    )
    console.log("zajęte miejsca");

    console.log(this.takenSeats);

  }


  isTaken(row: number, col: number): boolean{
    let taken: boolean = this.takenSeats.some( place => place.x == row && place.y == col)

    return taken;
  }

  // getTickets(){
  //   this.ticketService.getTickets(this.choosenShowing.showingId).subscribe(
  //     res => {
  //       this.tickets = res;
  //       console.log("bilety")
  //       console.log(this.tickets)
  //       console.log("bilety")
  //     }
  //   )
  //   }

  bookTicket(){
    this.reservedTicket = {
      fieldX: this.currentSeatCol,
      fieldY: this.currentSeatRow,
      Showing: this.choosenShowing.showingId,
      User: this.userId,
      // User: "de8753f5-7f42-4eb0-a3d3-fb0993564850",
      status: 0
    }
    this.ticketService.bookTicket(this.reservedTicket).subscribe(
      res => {
        console.log(res);
        this.booked = true;
        this.bookingRes = res;
      },
      err =>{
        this.error = err.error;
      }
    )

  }

  buyTicket(){
    this.reservedTicket.status = 1;

    this.ticketService.buyTicket(this.reservedTicket, this.bookingRes.body.ticket.id).subscribe(
      res =>{
        this.bought = true;
        console.log(res);
      },
      err =>{
        console.log(err);
      }
    )
  }


}
