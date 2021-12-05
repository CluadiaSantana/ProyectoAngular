import { Component, OnInit } from '@angular/core';
import { Classes } from 'src/app/common/datatypes/classes';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { ClassService } from 'src/app/common/services/class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  studentsId: string="";
  teachersId: string="";
  ids: string="";
  classes: Classes [] = [];
  isError: boolean = false;
  isLoading: boolean = false;
  roleStudent:boolean=false;
  roleAdmin:boolean=false;
  constructor(private classService: ClassService, private authenticationService : AuthenticationService) {
    this.authenticationService.roleStudentStatus.subscribe((status:boolean)=>{
      this.roleStudent=status;
    });
    this.authenticationService.roleAdminStatus.subscribe((status:boolean)=>{
      this.roleAdmin=status;
    });
   }

  ngOnInit(): void {
    
    this.classService.getClass("").then(response=>{
      this.classes =response;
      this.isError = false;
      this.isLoading = false;
    }).catch(e=>{
      console.log('Error:  ', e);
      this.isError = true;
      this.isLoading = false;
    })
}

getClass(){
  if(!this.studentsId && !this.teachersId){
    this.classService.getClass("").then(response=>{
      this.classes =response;
      this.isError = false;
      this.isLoading = false;
    }).catch(e=>{
      console.log('Error:  ', e);
      this.isError = true;
      this.isLoading = false;
    })
    return;
  }
  if(this.studentsId && this.teachersId){
    this.ids ="?studentId="+this.studentsId + "&teacherId=" +this.teachersId;
  }else if(this.studentsId){
    this.ids="?studentId="+this.studentsId;
  }else{
    this.ids="?teacherId="+this.teachersId;
  }
  this.classService.getClass(this.ids).then(response=>{
    this.classes = response;
    this.isError = false;
    this.isLoading = false;
  }).catch(e=>{
    console.log('Error:  ', e);
    this.isError = false;
    this.isLoading = false;
    this.classes=[];
  })
  this.studentsId="";
  this.teachersId="";
}

}