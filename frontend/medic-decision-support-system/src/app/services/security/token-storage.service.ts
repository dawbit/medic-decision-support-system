import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ROLE_KEY = 'auth-role'
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  public jwtHelper: JwtHelperService = new JwtHelperService();

constructor() { }

  public saveToken(token: string){
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(){
    return window.localStorage.getItem(TOKEN_KEY);
  }

  public isAuthenticated(): boolean{
    const jwtHelper = new JwtHelperService();
    const rawToken = localStorage.getItem(TOKEN_KEY);
    return !this.jwtHelper.isTokenExpired(rawToken);
  }

  public saveUser(user: string) {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, user);
  }

  public getUser() {
    return localStorage.getItem(USER_KEY);
  }

  public saveRole(role: string) {
    window.localStorage.removeItem(ROLE_KEY);
    window.localStorage.setItem(ROLE_KEY, role);
  }

  public getRole(): string {
    return localStorage.getItem(ROLE_KEY);
  }

  public saveUserInLocalStorage(token) {
    if (token) {
      const decodedToken: any = jwt_decode(token);
      this.saveToken(token);
      this.saveUser(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']);
      this.saveRole(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
    }
  }

  public deleteUserFromLocalStorage() {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.removeItem(ROLE_KEY);
  }
}
