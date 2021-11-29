
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

  predict(medicalDataId): void {
    this.medicalDataService.predictMedicalDataById(medicalDataId).subscribe(
      res => {
        console.log(res);
      }
    )
  }

  result(userId): void {

  }

  ngOnDestroy() {

  }




}
