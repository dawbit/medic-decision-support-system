import { TokenStorageService } from './../../services/security/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorage.isAuthenticated();
  }

}
