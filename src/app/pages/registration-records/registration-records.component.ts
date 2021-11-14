import { Component, OnInit } from '@angular/core';
import { Record } from 'src/app/common/datatypes/record';
import { RecordService } from 'src/app/common/services/record.service';


@Component({
  selector: 'app-registration-records',
  templateUrl: './registration-records.component.html',
  styleUrls: ['./registration-records.component.scss']
})
export class RegistrationRecordsComponent implements OnInit {

  studentsId: string="";
  teachersId: string="";
  records: Record [] = [];
  isError: boolean = false;
  isLoading: boolean = false;
  constructor(private recordService: RecordService) { }

  ngOnInit(): void {
    
    this.recordService.getRecords("").then(response=>{
      this.records =response;
      this.isError = false;
      this.isLoading = false;
    }).catch(e=>{
      console.log('Error:  ', e);
      this.isError = true;
      this.isLoading = false;
    })
}

getRecords(){
  if(!this.studentsId || !this.teachersId){
    this.recordService.getRecords("").then(response=>{
      this.records =response;
      this.isError = false;
      this.isLoading = false;
    }).catch(e=>{
      console.log('Error:  ', e);
      this.isError = true;
      this.isLoading = false;
    })
    return;
  }
  let ids :string=this.studentsId + "&teacherId=" +this.teachersId
  this.recordService.getRecords(ids).then(response=>{
    this.records =response;
    this.isError = false;
    this.isLoading = false;
  }).catch(e=>{
    console.log('Error:  ', e);
    this.isError = false;
    this.isLoading = false;
    this.records=[];
  })
  this.studentsId="";
  this.teachersId="";
}

}
