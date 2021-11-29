import { UserIdService } from './../../../services/user-id.service';
import { ShowingService } from './../../../services/showing.service';
import { MedicalData } from '../../../interfaces/MedicalData';
import { Movie } from './../../../interfaces/Movie';
import { Showing } from './../../../interfaces/Showing';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MedicalDataService } from '../../../services/medicalData.service';
import { MovieService } from './../../../services/movie.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showings-add',
  templateUrl: './showings-add.component.html',
  styleUrls: ['./showings-add.component.scss']
})
export class ShowingsAddComponent implements OnInit {

  movies = [];
  medicalDatas = [];
  showingForm: FormGroup;

  constructor(
    private movieService: MovieService,
    private medicalDataService: MedicalDataService,
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
      medicalDataControl: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      movieControl: new FormControl('', Validators.required),
    })

    this.getAllMovies();
    this.getAllMedicalDatas();
  }

  get medicalDataControl() {
    return this.showingForm.get('medicalDataControl');
  }

  get movieControl() {
    return this.showingForm.get('movieControl');
  }

  displayMovieFieldName(movie?: Movie): string | undefined {
    return movie ? movie.title : undefined;
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

  getAllMedicalDatas(): void{
    this.medicalDataService.getAllMedicalDatas().subscribe(
      data => {
        for (const key in data){
          if (data.hasOwnProperty(key)){
            this.medicalDatas.push({
              pregnancies: data[key].pregnancies,
              glucose: data[key].glucose,
              bloodPressure: data[key].bloodPressure,
              skinThickness: data[key].skinThickness,
              insulin: data[key].insulin,
              diabetesPedigreeFunction: data[key].diabetesPedigreeFunction,
              bmi: data[key].bmi,
              age: data[key].age
            });
          }
        }
      }
    )
  }

  addShowing(): void{
    let show: Showing = {
      movie: this.showingForm.get('movieControl').value.id,
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
