import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { TokenStorageService } from './token-storage.service';
import { Injectable } from '@angular/core';
import decode from 'jwt-decode';

const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService {

  constructor(
    public auth: TokenStorageService,
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {    // this will be passed from the route config
    // on the data property
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem(TOKEN_KEY);    // decode the token to get its payload
    if (!token) {
      return false;
    }
    const tokenPayload: any = decode(token);

    if (!this.auth.isAuthenticated() || tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] !== expectedRole.find(x => x === tokenPayload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"])) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

}
