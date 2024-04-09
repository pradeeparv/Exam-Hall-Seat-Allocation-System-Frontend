import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ManageroomsComponent } from './managerooms/managerooms.component';
import { UniversityexamsComponent } from './universityexams/universityexams.component';
import { SeatallocationComponent } from './seatallocation/seatallocation.component';


const routes: Routes = [
{path:'',redirectTo:"login",pathMatch:'full'}
,{path:'login',component:LoginComponent},
 {path:'register',component:RegisterComponent},
 {path:'home',component:HomeComponent},{path:'managerooms',component:ManageroomsComponent}, {path:'universityrooms',component:UniversityexamsComponent}, {path:'seatallocation',component:SeatallocationComponent}, {path:'seatallocation/:subject',component:SeatallocationComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
