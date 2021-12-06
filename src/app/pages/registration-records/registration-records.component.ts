import { Component, OnInit } from '@angular/core';
import { Record } from 'src/app/common/datatypes/record';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { RecordService } from 'src/app/common/services/record.service';

@Component({
  selector: 'app-registration-records',
  templateUrl: './registration-records.component.html',
  styleUrls: ['./registration-records.component.scss'],
})
export class RegistrationRecordsComponent implements OnInit {
  studentsId: string = '';
  teachersId: string = '';
  ids: string = '';
  records: Record[] = [];
  isError: boolean = false;
  isLoading: boolean = false;
  roleAdmin: boolean = false;
  roleStudent: boolean = false;
  constructor(
    private recordService: RecordService,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.roleAdminStatus.subscribe((status: boolean) => {
      this.roleAdmin = status;
    });
    this.authenticationService.roleStudentStatus.subscribe(
      (status: boolean) => {
        this.roleStudent = status;
      }
    );
  }

  ngOnInit(): void {
    this.recordService
      .getRecords('')
      .then((response) => {
        this.records = response;
        this.isError = false;
        this.isLoading = false;
      })
      .catch((e) => {
        console.log('Error:  ', e);
        this.isError = true;
        this.isLoading = false;
      });
  }

  getRecords() {
    if (!this.studentsId && !this.teachersId) {
      this.recordService
        .getRecords('')
        .then((response) => {
          this.records = response;
          this.isError = false;
          this.isLoading = false;
        })
        .catch((e) => {
          console.log('Error:  ', e);
          this.isError = true;
          this.isLoading = false;
        });
      return;
    }
    if (this.studentsId && this.teachersId) {
      this.ids =
        '?studentId=' + this.studentsId + '&teacherId=' + this.teachersId;
    } else if (this.studentsId) {
      this.ids = '?studentId=' + this.studentsId;
    } else {
      this.ids = '?teacherId=' + this.teachersId;
    }
    this.recordService
      .getRecords(this.ids)
      .then((response) => {
        this.records = response;
        this.isError = false;
        this.isLoading = false;
      })
      .catch((e) => {
        console.log('Error:  ', e);
        this.isError = false;
        this.isLoading = false;
        this.records = [];
      });
    this.studentsId = '';
    this.teachersId = '';
  }
  putRecord(_id: any, upda: string){
    console.log(upda)
    this.recordService.putRecord({
      _id: _id,
      status: upda
    }).then(re=>{
     this.recordService
      .getRecords('')
      .then((response) => {
        this.records = response;
        this.isError = false;
        this.isLoading = false;
      })
    })
      .catch((e) => {
        console.log('Error:  ', e);
        this.isError = true;
        this.isLoading = false;
      });
  }
}
