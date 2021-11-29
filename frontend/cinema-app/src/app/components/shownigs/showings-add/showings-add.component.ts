import { UserIdService } from './../../../services/user-id.service';
import { ShowingService } from './../../../services/showing.service';
import { Hall } from './../../../interfaces/Hall';
import { Movie } from './../../../interfaces/Movie';
import { Showing } from './../../../interfaces/Showing';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HallService } from './../../../services/hall.service';
import { MovieService } from './../../../services/movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showings-add',
  templateUrl: './showings-add.component.html',
  styleUrls: ['./showings-add.component.scss']
})
export class ShowingsAddComponent implements OnInit {

  movies = [];
  halls = [];
  showingForm: FormGroup;

  constructor(
    private movieService: MovieService,
    private hallService: HallService,
    private ShowingService: ShowingService,
    private userIdService: UserIdService
  ) { }

  ngOnInit(): void {

    this.userIdService.testowyBh$.subscribe(
      res => {
        console.log(res);
      }
    )

    this.showingForm = new FormGroup({
      hallControl: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      movieControl: new FormControl('', Validators.required),
    })

    this.getAllMovies();
    this.getAllHalls();
  }

  get hallControl() {
    return this.showingForm.get('hallControl');
  }

  get movieControl() {
    return this.showingForm.get('movieControl');
  }

  displayMovieFieldName(movie?: Movie): string | undefined {
    return movie ? movie.title : undefined;
  }

  displayHallFieldName(hall?: Hall): string | undefined {
    return hall ? hall.name : undefined;
  }

  getAllMovies(): void{
    this.movieService.getAllMovies().subscribe(
      data => {
        for (const key in data){
          if (data.hasOwnProperty(key)){
            this.movies.push({
              title: data[key].title,
              id: data[key].id
            });
          }
        }
      }
    )
  }

  getAllHalls(): void{
    this.hallService.getAllHalls().subscribe(
      data => {
        for (const key in data){
          if (data.hasOwnProperty(key)){
            this.halls.push({
              name: data[key].name,
              id: data[key].id
            });
          }
        }
      }
    )
  }

  addShowing(): void{
    let show: Showing = {
      movie: this.showingForm.get('movieControl').value.id,
      hall: this.showingForm.get('hallControl').value.id,
      time: this.showingForm.get('date').value
    }

    console.log(show);

    this.ShowingService.addShowing(show).subscribe(
      res =>{
        if (res && res.ok && res.status === 200) {
          console.log('Pomyslnie dodano spektakl');
          console.log(res);
        }
      },
      err =>{
        console.log(err);
      }
    )
  }

}
