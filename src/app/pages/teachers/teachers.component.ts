import { Component, OnInit } from '@angular/core';
import { Teacher } from 'src/app/common/datatypes/teacher';
import { TeacherService } from 'src/app/common/services/teacher.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {

  idSearch: string="";
  teachers: Teacher [] = [];
  isError: boolean = false;
  isLoading: boolean = false;
  constructor(private teachearService: TeacherService) { }

  ngOnInit(): void {
    
    this.teachearService.getTeacher("").then(response=>{
      this.teachers =response;
      this.isError = false;
      this.isLoading = false;
    }).catch(e=>{
      console.log('Error:  ', e);
      this.isError = true;
      this.isLoading = false;
    })
}

getTeacherId(){
  if(!this.idSearch){
    this.teachearService.getTeacher("").then(response=>{
      this.teachers =response;
      this.isError = false;
      this.isLoading = false;
    }).catch(e=>{
      console.log('Error:  ', e);
      this.isError = true;
      this.isLoading = false;
    })
    return;
  }
  let id :string=this.idSearch
  this.teachearService.getTeacher(id).then(response=>{
    this.teachers = [];
    this.teachers.push(response)
  }).catch(e=>{
    console.log('Error:  ', e);
  })
  this.idSearch="";
}

}