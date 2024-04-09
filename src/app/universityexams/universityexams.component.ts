import { Component, OnInit } from '@angular/core';
import { Exams } from '../exams';
import { ExamserviceService } from '../examservice.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-universityexams',
  templateUrl: './universityexams.component.html',
  styleUrls: ['./universityexams.component.css']
})
export class UniversityexamsComponent implements OnInit
{
  fileName='ExcelSheet.xlsx';
  exams:Exams=new Exams();
  exam:Exams[]=[];
  selectedDate:string;
  constructor(private examservice:ExamserviceService){}

  ngOnInit(): void {
    this.getallexams()
  }

  addexams(){
    console.log(this.exams)
    console.log(this.selectedDate)
    
    this.exams.date=new Date(this.selectedDate)  
    this.examservice.createrooms(this.exams).subscribe((data)=>{
      alert("exam scheduled succesfully")
      this.exams=data
    })
  }

  getallexams(){
    console.log(this.exam)
    this.examservice.getallrooms().subscribe((data)=>{
      this.exam=data
    })
  }
 
 
  
}
