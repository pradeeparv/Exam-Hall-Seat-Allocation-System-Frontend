import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Seats } from './seats';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private HttpClient:HttpClient) { }

  private basicUrl="http://localhost:9091/loginusers";

  onlogservice(userName:any,password:any):Observable<Seats>{
    return this.HttpClient.get<Seats>(`${this.basicUrl}/getuser?userName=${userName}&password=${password}`)
  }

}
