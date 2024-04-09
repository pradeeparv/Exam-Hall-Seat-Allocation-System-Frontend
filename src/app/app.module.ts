import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ManageroomsComponent } from './managerooms/managerooms.component';
import { UniversityexamsComponent } from './universityexams/universityexams.component';
import { SeatallocationComponent } from './seatallocation/seatallocation.component';
import { FilterPipe } from './filter.pipe';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ManageroomsComponent,
    UniversityexamsComponent,
    SeatallocationComponent,
    FilterPipe,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    
   
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
