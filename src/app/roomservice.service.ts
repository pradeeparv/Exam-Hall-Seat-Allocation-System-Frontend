import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rooms } from './rooms';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RoomserviceService {

  constructor(private HttpClient:HttpClient) { }

  private basicurl="http://localhost:9091/rooms";
  
  addrooms(rooms:Rooms):Observable<Rooms>{
    return this.HttpClient.post<Rooms>(`${this.basicurl}/addrooms`,rooms)
  }

  getallrooms():Observable<Rooms[]>{
    return this.HttpClient.get<Rooms[]>(`${this.basicurl}/getallrooms`)
  }

  deleterooms(roomNo:number):Observable<any>{
    return this.HttpClient.delete<any>(`${this.basicurl}/deleterooms?roomNo=${roomNo}`)
  }

 getroom(roomNo:number):Observable<Rooms>{
    return this.HttpClient.get<Rooms>(`${this.basicurl}/getrooms?roomNo=${roomNo}`)
 } 

 updateroom(roomNo:number,rooms:Rooms):Observable<any>{
  return this.HttpClient.put<any>(`${this.basicurl}/updaterooms?roomNo=${roomNo}`,rooms)
 }

 getAllRooms(): Observable<Rooms[]> {
  return this.HttpClient.get<Rooms[]>(this.basicurl);
}
}

