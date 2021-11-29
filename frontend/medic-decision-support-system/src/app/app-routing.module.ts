import { UserEditComponent } from './components/user-edit/user-edit.component';
import { RoleGuardService } from './services/security/role-guard.service';
import { HomeComponent } from './components/home/home.component';
import { ShowingsAddComponent } from './components/shownigs/showings-add/showings-add.component';
import { MoviesAddComponent } from './components/Movies/movies-add/movies-add.component';
import { MedicalDataAddComponent } from './components/halls/medicalData-add/medicalData-add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { AuthGuardService as AuthGuard } from './services/security/auth-guard.service';
import { RegisterComponent } from './components/login-register/register/register.component';
import { MedicalDataBookComponent } from './components/medicalData/medicalData-book/medicalData-book.component';

const routes: Routes = [
{ path: '', redirectTo: 'login', pathMatch: 'full' },
{
  path: 'login',
  component: HomeComponent,
  //canActivate: [AuthGuard]
},
{
  path: 'home',
  component: HomeComponent
},
{
  path: 'medical-data-add',
  component: MedicalDataAddComponent, canActivate: [AuthGuard, RoleGuardService],
  data: {
    expectedRole: ['Admin']
  }
},
{
  path: 'movies-add',
  component: MoviesAddComponent, canActivate: [AuthGuard, RoleGuardService],
  data: {
    expectedRole: ['Admin']
  }
},
{
  path: 'showings-add',
  component: ShowingsAddComponent, canActivate: [AuthGuard, RoleGuardService],
  data: {
    expectedRole: ['Admin']
  }
},
{
  path: 'medicalData-book',
  component: MedicalDataBookComponent
},
{
  path: 'user-create',
  component: RegisterComponent, canActivate: [AuthGuard, RoleGuardService],
  data: {
    expectedRole: ['Admin']
  }
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
