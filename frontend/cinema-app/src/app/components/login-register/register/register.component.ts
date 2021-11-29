import { UserService } from './../../../services/user.service';
import { User } from './../../../interfaces/User';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
	  role: 0
    })
  }

  register(){
    let newUser: User = this.registerForm.value;
    this.userService.register(newUser).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err)
      }
    )
  }

}
