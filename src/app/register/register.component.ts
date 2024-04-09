import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { RegisterService } from '../register.service';
import { Seats } from '../seats';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent 
{
 
  seat:Seats=new Seats();
  
  constructor(private router:Router,private registerservice:RegisterService){}

  createlist(){

    console.log(this.seat)
    this.registerservice.createregister(this.seat).subscribe((data)=>{
      this.seat=data
    })
  }
}
