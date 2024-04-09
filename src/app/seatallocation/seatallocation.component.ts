import { Component, OnInit } from '@angular/core';
import { Rooms } from '../rooms';
import { RoomserviceService } from '../roomservice.service';
import { Student } from '../student';
import { StudentserviceService } from '../studentservice.service';
import * as XLSX from 'xlsx';
import { HttpClient } from '@angular/common/http';
import { Exams } from '../exams';
import { ExamserviceService } from '../examservice.service';
import { ActivatedRoute } from '@angular/router';


interface Participant {
  id: number;
  name: string;
  checked: boolean;
  disableCheckbox: boolean;
}



@Component({
  selector: 'app-seatallocation',
  templateUrl: './seatallocation.component.html',
  styleUrls: ['./seatallocation.component.css']
})
export class SeatallocationComponent implements OnInit {


  rooms: Rooms[] = [];
  searchtext: any
  students: Student = new Student()
  student: Student[] = []
  exams: Exams = new Exams();
  examid: string = "subject"
  constructor(private roomservice: RoomserviceService, private studentservice: StudentserviceService, private HttpClient: HttpClient, private examservice: ExamserviceService, private activateRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getrooms()
   
  }



  onclick(examid: string) {
    console.log(examid)
    this.examservice.getroom(examid).subscribe((data: Exams) => {
      console.log("Data retrieved successfully:", data);

      console.log(data)
      this.exams = data;
    }, error => {
      console.error("Error occurred while fetching data:", error);
    });

  }

  getsubject() {
    console.log(this.examid)

    if (this.examid) {
      console.log("Subject value is", this.examid);
      this.examservice.getroom(this.examid).subscribe((data: Exams) => {
        console.log("Data retrieved successfully:", data);
        this.exams = data;
      }, error => {
        console.error("Error occurred while fetching data:", error);
      });
    } else {
      console.error("Subject parameter is undefined");
    }
  }



  getrooms() {
    this.roomservice.getallrooms().subscribe((data) => {
      this.rooms = data
    })

  }

  totalseats() {
    return this.rooms.reduce((total, val) => total + val.availableSeats, 0);

  }
  //for loop for roomno depends on availableseats length
  selectedRoomsCount: number = 0;
  selectedRooms: any = {};
  selectedSeatsCount: number = 0;
  count:number
  remainingSeats:number=0
  onCheckboxChange() {
    this.selectedRoomsCount = Object.values(this.selectedRooms).filter(value => value).length;

    this.selectedSeatsCount = 0;
    Object.keys(this.selectedRooms).forEach(roomNo => {
      if (this.selectedRooms[roomNo]) {
        const room = this.rooms.find(room => room.roomNo.toString() === roomNo);
        if (room) {
          this.selectedSeatsCount += room.availableSeats;
          this.remainingSeats=this.totalparticipants - this.selectedSeatsCount
        }
      }
    });

    const selectedRoomDetails = [];
    for (const roomNo in this.selectedRooms) {
      if (this.selectedRooms[roomNo]) {
        const room = this.rooms.find(room => room.roomNo.toString() === roomNo);
        if (room) {
          selectedRoomDetails.push({ roomNo: room.roomNo, availableSeats: room.availableSeats });

        }
      }
    }
    console.log('Selected Rooms:', selectedRoomDetails);
  }



  downloadData(): void {
    // Get selected room numbers
    const selectedRoomNos = Object.keys(this.selectedRooms)
      .filter(roomNo => this.selectedRooms[roomNo]);

    // Call the backend API to download Excel with selected room numbers
    this.HttpClient.post('http://localhost:9091/excel/download', selectedRoomNos, { responseType: 'blob' })
      .subscribe((response: Blob) => {
        // Create a blob and initiate download
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'student_rooms.xlsx';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      });
  }
  

  totalparticipants: number = 0;
  selectedFile: File;
  downloadUrl: string;

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
    
    if(this.selectedFile){
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
    
          const data = new Uint8Array(fileReader.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          let excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
          this.totalparticipants = excelData.length;
          
          console.log(this.selectedSeatsCount)
          console.log(this.totalparticipants)
    }
    fileReader.readAsArrayBuffer(this.selectedFile);
  }
  }

  processFile(): void {

   // this.onButtonClick()
    if (this.selectedFile) {
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        try {
          const data = new Uint8Array(fileReader.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          let excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
       

          // Manipulate Excel data based on selected checkboxes
          const selectedRooms:any[] = [];

          // Iterate over the selected rooms
          for (const roomNo in this.selectedRooms) {
              if (this.selectedRooms[roomNo]) {
                  const room = this.rooms.find(room => room.roomNo.toString() === roomNo);
                  if (room) {
                      // Push the room number into the selectedRooms array multiple times based on available seats
                      for (let i = 0; i < room.availableSeats; i++) {
                          selectedRooms.push(roomNo);
                      }
                  }
              }
          }

          // Log the selectedRooms array for debugging
          console.log("Selected Rooms:", selectedRooms);

          // Update the excelData with the selectedRooms array
          excelData = excelData.map((record: any, index: number) => {
            // Check if there's a corresponding room number in selectedRooms array
            if (index < selectedRooms.length) {
                // Assign the room number from selectedRooms array to the 'roomNo' property of the record
                record['roomNo'] = selectedRooms[index];
            } else {
                // Handle case where there are more records than available room numbers
                // For example, if there are more records than available seats
                record['roomNo'] = null; // Or any suitable default value
            }
            return record;
        });
          // Log modified data for debugging
          console.log("Modified Excel data:", excelData);

          
          // Generate new Excel file with modified data
        const newWorkbook = XLSX.utils.book_new();
          const newWorksheet = XLSX.utils.json_to_sheet(excelData);
          XLSX.utils.book_append_sheet(newWorkbook, newWorksheet, 'Sheet1');
          const newFileContent = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'binary' });

          // Convert to Blob
          const newFileBlob = new Blob([s2ab(newFileContent)], { type: 'application/octet-stream'});

          // Create temporary <a> element to initiate download
          const anchor = document.createElement('a');
          anchor.href = URL.createObjectURL(newFileBlob);
          anchor.download = 'Modified-Studentlist.xlsx';
          anchor.click();
          console.log("Ready to download");

          // Utility function to convert binary string to array buffer
          function s2ab(s: string): ArrayBuffer {
            const buf = new ArrayBuffer(s.length);
            const view = new Uint8Array(buf);
            for (let i = 0; i < s.length; i++) {
              view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
          }

          console.log("Ready to download");
        } catch (error) {
          console.error("Error processing file:", error);
        }
      };
      fileReader.readAsArrayBuffer(this.selectedFile);
    }
  }



 

}





















