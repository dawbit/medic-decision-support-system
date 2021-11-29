import { Router } from '@angular/router';
import { UserIdService } from './../../../../services/user-id.service';
import { TokenStorageService } from './../../../../services/security/token-storage.service';
import { User } from './../../../../interfaces/User';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  userId: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private userIdService: UserIdService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: ['']
    });

  }

  loginSubmit(){
    let user: User = this.loginForm.value;

    this.userService.login(user).subscribe(
      res => {
        if (res && res.ok && res.status === 200) {
          this.userId = res.body.id;
          console.log(res.body.token);
          const authorizationInfo = res.body.token;
          this.tokenStorageService.saveUserInLocalStorage(authorizationInfo);
          // window.location.reload();
        }
      },
      err => {
        console.log(err);
      },
      () =>{
        this.userIdService.sendUserId(this.userId);

        this.router.navigateByUrl('home');
      }

    );
  }

}
