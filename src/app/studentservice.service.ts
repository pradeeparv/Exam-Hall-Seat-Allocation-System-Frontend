import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentserviceService {


  constructor(private HttpClient:HttpClient) { }

  private basiceurl="http://localhost:9091/students";

  addstudent(students:Student):Observable<Student>{
    return this.HttpClient.post<Student>(`${this.basiceurl}/addstudents`,students)
  }

  getallstudent(){
   
     this.HttpClient.get('http://localhost:9091/students/getstudents', {
      responseType: 'blob' // Important for downloading files
    }).subscribe((response: Blob) => {
      // Create a blob object URL for the Excel file
      const file = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const fileURL = URL.createObjectURL(file);
      
      // Open the file in a new window
      window.open(fileURL);
    });
  }

  getAllStudents() {
     this.HttpClient.get('http://localhost:9091/excel/download',{ responseType: 'blob' // Important for downloading files
    }).subscribe((response: Blob) => {
      // Create a blob object URL for the Excel file
      const file = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const fileURL = URL.createObjectURL(file);
      
      // Open the file in a new window
      window.open(fileURL);
    });};



    addRoomColumn(file: File, rooms: string[]): Observable<any> {
      const formData = new FormData();
      formData.append('file', file);
      /*formData.append('rooms', JSON.stringify(rooms));*/
      return this.HttpClient.post<any>('http://localhost:9091/excelfile/generate-excel', formData);
    }
  }
  

