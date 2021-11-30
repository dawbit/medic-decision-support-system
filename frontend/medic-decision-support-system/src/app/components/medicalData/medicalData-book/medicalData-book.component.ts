
import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { MedicalData } from 'src/app/interfaces/MedicalData';
import { MedicalDataService } from 'src/app/services/medicalData.service';


@Component({
  selector: 'app-medicalData-book',
  templateUrl: './medicalData-book.component.html',
  styleUrls: ['./medicalData-book.component.scss']
})
export class MedicalDataBookComponent implements OnInit {

  MedicalData: MedicalData[] = [];
  learnAccuracy: number = 0;

  constructor(
    private medicalDataService: MedicalDataService
  ) { }

  ngOnInit(): void {
    this.medicalDataService.getAllMedicalDatas().subscribe(
      res => {
        res.forEach(med => {
          this.MedicalData.push({
            "pregnancies": med.pregnancies,
            "glucose": med.glucose,
            "bloodPressure": med.bloodPressure,
            "skinThickness": med.skinThickness,
            "insulin": med.insulin,
            "diabetesPedigreeFunction": med.diabetesPedigreeFunction,
            "bmi": med.bmi,
            "age": med.age,
            "userId": med.userId,
            "medicalDataId": med.medicalDataId
          })
        })
      }
    )
  }

  predict(medicalData): void {
    this.medicalDataService.predictMedicalDataById(medicalData.medicalDataId).subscribe(
      res => {
        medicalData.predict = res['score'];
      }
    )
  }

  result(userId): void {

  }

  learn(): void {
    this.medicalDataService.learn().subscribe(
      res => {
        console.log(res);
        this.learnAccuracy = res;
      }
    )
  }

  ngOnDestroy() {

  }




}
