import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exams } from './exams';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamserviceService {

  constructor(private HttpClient:HttpClient) { }

  private basicurl="http://localhost:9091/exams";

  createrooms(exams:Exams):Observable<Exams>{
    return this.HttpClient.post<Exams>(`${this.basicurl}/addexams`,exams)
  }

  getallrooms():Observable<Exams[]>{
    return this.HttpClient.get<Exams[]>(`${this.basicurl}/getallexams`)
  }

  getroom(subject:string):Observable<Exams>{
    return this.HttpClient.get<Exams>(`${this.basicurl}/getexams?subject=${subject}`)
  }
}
