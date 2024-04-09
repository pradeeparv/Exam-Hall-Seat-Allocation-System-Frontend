import { Component, OnInit } from '@angular/core';
import { RoomserviceService } from '../roomservice.service';
import { Rooms } from '../rooms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-managerooms',
  templateUrl: './managerooms.component.html',
  styleUrls: ['./managerooms.component.css']
})
export class ManageroomsComponent implements OnInit
{
  
  searchtext:any
  room:Rooms=new Rooms();
  rooms:Rooms[]=[];
  constructor(private roomservice:RoomserviceService,private router:Router){}

  ngOnInit(): void {
    this.getrooms()
  }
  createrooms(){
    console.log(this.room);
    this.roomservice.addrooms(this.room).subscribe((data)=>{
      alert("Room inserted successfully")
      this.room=data

    })

    }
    getrooms(){
      console.log(this.rooms)
      this.roomservice.getallrooms().subscribe((data)=>{
        this.rooms=data;
      })
    }

    deleterooms(roomNo:number){
            
      this.roomservice.deleterooms(roomNo).subscribe((data)=>{
        alert("Room deleted successfully")
      })
    }

    
  }


