import { TokenStorageService } from './token-storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

constructor(
  public router: Router,
  public tokenStorage: TokenStorageService
) { }

canActivate(): boolean{
  if(this.tokenStorage.isAuthenticated()){
    return true;
  }
  else{
    this.router.navigate(['/login']);
    return false;
  }
}

}
