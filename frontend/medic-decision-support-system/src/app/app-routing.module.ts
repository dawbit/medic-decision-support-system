import { UserEditComponent } from './components/user-edit/user-edit.component';
import { RoleGuardService } from './services/security/role-guard.service';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './services/security/auth-guard.service';
import { RegisterComponent } from './components/login-register/register/register.component';
import { MedicalDataBookComponent } from './components/medicalData/medicalData-book/medicalData-book.component';
import { MedicalDataAddComponent } from './components/medicalData-add/medicalData-add.component';

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
