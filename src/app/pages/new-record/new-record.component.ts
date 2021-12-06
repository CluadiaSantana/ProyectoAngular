import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewRecordService } from 'src/app/common/services/new-record.service';
import { StudentService } from 'src/app/common/services/student.service';
import { Student } from 'src/app/common/datatypes/student';
import { RecordService } from 'src/app/common/services/record.service';
import { SocketsService } from 'src/app/common/services/sockets.service';

@Component({
  selector: 'app-new-record',
  templateUrl: './new-record.component.html',
  styleUrls: ['./new-record.component.scss']
})
export class NewRecordComponent implements OnInit {
  form: FormGroup;
  dateError: boolean=true;
  hourError: boolean=true;
  students: Student [] = [];

  constructor(private stundetService: StudentService, private router: Router, private formBuilder: FormBuilder, private newRecordService: NewRecordService, private recordService: RecordService, 
    private socketService: SocketsService) {
    this.form= this.formBuilder.group({
      date: ['' ,Validators.compose( [ Validators.pattern('[a-zA-Z\s ]+')])],
        hour: ['']
      })
   }

  ngOnInit(): void {
    this.stundetService.getStudent(this.newRecordService.getRecord()).then(response=>{
      this.students = response;
    }).catch(e=>{
      console.log('Error:  ', e);
      this.students=[];
    })
  }
  postRecord(){
    this.recordService.postRecord({
      studentId: this.students[0].id,
      teacherId: this.students[0].teacher,
      date: this.form.controls['date'].value,
      hour: this.form.controls['hour'].value
    }).then((response)=>{
      this.socketService.emit('newRecord',{
        id: this.students[0].id,
      })
      this.router.navigate(['/records']);
    })
  }
}
