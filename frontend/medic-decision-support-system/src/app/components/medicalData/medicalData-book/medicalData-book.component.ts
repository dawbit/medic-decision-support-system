
import { Component, OnInit } from '@angular/core';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { MedicalData } from 'src/app/interfaces/MedicalData';
import { User } from 'src/app/interfaces/User';
import { MedicalDataService } from 'src/app/services/medicalData.service';
import { TokenStorageService } from 'src/app/services/security/token-storage.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-medicalData-book',
  templateUrl: './medicalData-book.component.html',
  styleUrls: ['./medicalData-book.component.scss']
})
export class MedicalDataBookComponent implements OnInit {

  MedicalData: MedicalData[] = [];
  learnAccuracy: number = 0;
  userRole: string = '';

  constructor(
    private medicalDataService: MedicalDataService,
    private tokenStorage: TokenStorageService,
    private userService: UserService
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
            "medicalDataId": med.medicalDataId,
            "result": med.result
          });
        })

        this.userRole = this.tokenStorage.getRole();

        if(this.userRole == 'Patient') {
          this.userService.getMe().subscribe(
            res => {
              this.MedicalData = this.MedicalData.filter(med => med.userId == res.userId);
            }
          )
        }
      }
    );

  }

  predict(medicalData): void {
    this.medicalDataService.predictMedicalDataById(medicalData.medicalDataId).subscribe(
      res => {
        medicalData.predict = res['score'];
      }
    )
  }

  result(medicalData): void {
    this.medicalDataService.result(medicalData).subscribe(
      res => {
        medicalData.result = !medicalData.result;
      }
    );
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
