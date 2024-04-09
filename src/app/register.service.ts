import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seats } from './seats';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private HttpClient:HttpClient) { }

  private basicUrl="http://localhost:9091/examseats";

  createregister(seat:Seats):Observable<Seats>{
    return this.HttpClient.post<Seats>(`${this.basicUrl}/addseats`,seat)
  }
}
