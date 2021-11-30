import { TokenInterceptor } from './services/security/token.interceptor';
// modules

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

// material modules
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
// components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login-register/login/login/login.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { MedicalDataAddComponent } from './components/medicalData-add/medicalData-add.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './components/login-register/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { MedicalDataBookComponent } from './components/medicalData/medicalData-book/medicalData-book.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginRegisterComponent,
    MedicalDataAddComponent,
    MedicalDataBookComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatButtonModule
  ],
  exports: [
    MatInputModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
