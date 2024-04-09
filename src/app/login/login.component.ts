import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Seats } from '../seats';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  seat:Seats=new Seats();
  constructor(private router:Router,private loginservice:LoginService){}

  formdata={username:"",password:""}
  submit=false

  onlogin(){
    
    this.loginservice.onlogservice(this.formdata.username,this.formdata.password).subscribe((data)=>{
     
      this.router.navigate(['home'])
    })
  }
 

  gotologin(){
    this.router.navigate(['login'])
  }
}
