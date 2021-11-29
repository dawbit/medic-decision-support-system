import { UserIdService } from './../../../services/user-id.service';
import { MovieService } from './../../../services/movie.service';
import { Movie } from './../../../interfaces/Movie';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movies-add',
  templateUrl: './movies-add.component.html',
  styleUrls: ['./movies-add.component.scss']
})
export class MoviesAddComponent implements OnInit {

  movieForm: FormGroup;
  movie: Movie;
  userId;
  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private userIdService: UserIdService
  ) {

   }

  ngOnInit(): void {

    this.userIdService.testowyNext('wiadomosc z movies add');

    this.movieForm = this.formBuilder.group({
      Title: [''],
      Year: 2021,
      Director: ['']
    })
  }

  movieAddSubmit(){
    this.movie = this.movieForm.value;

    this.movieService.addMovie(this.movie).subscribe(
      res =>{
        if (res && res.ok && res.status === 200) {
          console.log('Pomyslnie dodano film');
          console.log(res);
        }
      },
      err =>{
        console.log(err);
      }
    )
  }

}
