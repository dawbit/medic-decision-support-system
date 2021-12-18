import { Router } from '@angular/router';
import { TokenStorageService } from './../../services/security/token-storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
isLoggedIn: boolean = false;
userRole;
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorage.isAuthenticated();
    this.userRole = this.tokenStorage.getRole();
    console.log(this.userRole)
  }

  logout() {
    this.tokenStorage.deleteUserFromLocalStorage();
    this.router.navigate(['login']);
    // window.location.reload();
    // this.router.navigate(['login']);

  }

}
