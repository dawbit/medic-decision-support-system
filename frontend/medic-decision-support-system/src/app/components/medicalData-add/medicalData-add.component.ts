import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { TokenStorageService } from 'src/app/services/security/token-storage.service';
import { MedicalDataService } from 'src/app/services/medicalData.service';
import { MedicalData } from 'src/app/interfaces/MedicalData';
import {MatSelectModule} from '@angular/material/select';
import {FormControl} from '@angular/forms';
import { User } from 'src/app/interfaces/User';

@Component({
  selector: 'app-medical-data-add',
  templateUrl: './medicalData-add.component.html',
  styleUrls: ['./medicalData-add.component.scss']
})
export class MedicalDataAddComponent implements OnInit {

  medicalDataForm: FormGroup;
  medicalData: MedicalData;
  users: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private medicalDataService: MedicalDataService,
    private userService: UserService,
    private tokenStorageService: TokenStorageService
    ) { }

  ngOnInit(): void {
    this.medicalDataForm = this.formBuilder.group({
      pregnancies: 0,
      glucose: 0,
      bloodPressure: 0,
      skinThickness: 0,
      insulin: 0,
      diabetesPedigreeFunction: 0,
      bmi: 0,
      age: 0,
      userId: ""
    });
    this.userService.getUsers().subscribe(
      res => {
        this.users = res.filter(user => user.role == 'Patient');
      }
    )
  }

  medicalDataAddSubmit(){
    this.medicalData = this.medicalDataForm.value;

    this.medicalDataService.addMedicalData(this.medicalData).subscribe(
      res => {
        if (res && res.ok && res.status === 200) {
          console.log('Pomyslnie dodano medicalData');
          console.log(res);
        }
      });
/*
    this.userService.getUserId(this.tokenStorageService.getUser()).subscribe(
      res => {
        this.medicalData.userId = res[0].userId;

        this.medicalDataService.addMedicalData(this.medicalData).subscribe(
          res => {
            if (res && res.ok && res.status === 200) {
              console.log('Pomyslnie dodano medicalData');
              console.log(res);
            }
          },
          err => {
            console.log(err);
          }
        )
      }
    )*/


  }

}
