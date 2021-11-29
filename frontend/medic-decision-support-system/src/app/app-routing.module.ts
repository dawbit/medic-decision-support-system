import { UserEditComponent } from './components/user-edit/user-edit.component';
import { RoleGuardService } from './services/security/role-guard.service';
import { HomeComponent } from './components/home/home.component';
import { TicketsBookComponent } from './components/tickets/tickets-book/tickets-book.component';
import { ShowingsAddComponent } from './components/shownigs/showings-add/showings-add.component';
import { MoviesAddComponent } from './components/Movies/movies-add/movies-add.component';
import { HallsAddComponent } from './components/halls/halls-add/halls-add.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { AuthGuardService as AuthGuard } from './services/security/auth-guard.service';

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
  path: 'hall-add',
  component: HallsAddComponent, canActivate: [AuthGuard, RoleGuardService],
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
  path: 'tickets-book',
  component: TicketsBookComponent
},
{
  path: 'user-edit',
  component: UserEditComponent, canActivate: [AuthGuard, RoleGuardService],
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
