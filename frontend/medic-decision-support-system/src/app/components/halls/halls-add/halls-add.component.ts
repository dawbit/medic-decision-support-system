import { HallService } from './../../../services/hall.service';
import { Hall } from './../../../interfaces/Hall';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-halls-add',
  templateUrl: './halls-add.component.html',
  styleUrls: ['./halls-add.component.scss']
})
export class HallsAddComponent implements OnInit {

  hallForm: FormGroup;
  hall: Hall;

  constructor(
    private formBuilder: FormBuilder,
    private hallService: HallService
    ) { }

  ngOnInit(): void {
    this.hallForm = this.formBuilder.group({
      Name: [''],
      SizeX: 0,
      SizeY: 0
    })
  }

  hallAddSubmit(){
    this.hall = this.hallForm.value;

    this.hallService.addHall(this.hall).subscribe(
      res => {
        if (res && res.ok && res.status === 200) {
          console.log('Pomyslnie dodano sale');
          console.log(res);
        }
      },
      err => {
        console.log(err);
      }
    )
  }

}
