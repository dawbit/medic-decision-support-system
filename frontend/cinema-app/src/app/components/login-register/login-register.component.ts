import { TokenStorageService } from './../../services/security/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  loggedIn = this.tokenStorage.isAuthenticated();
  register: boolean = false;

  constructor(
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit() {
  }

}
