import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/common/datatypes/student';
import { StudentService } from 'src/app/common/services/student.service';



@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  idSearch: string="";
  students: Student [] = [];
  isError: boolean = false;
  isLoading: boolean = false;
  constructor(private stundetService: StudentService) { }

  ngOnInit(): void {
    
    this.stundetService.getStudent("").then(response=>{
      this.students =response;
      this.isError = false;
      this.isLoading = false;
    }).catch(e=>{
      console.log('Error:  ', e);
      this.isError = true;
      this.isLoading = false;
    })
}

getStudentId(){
  if(!this.idSearch){
    this.stundetService.getStudent("").then(response=>{
      this.students =response;
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
  this.stundetService.getStudent(id).then(response=>{
    this.students = [];
    this.students.push(response)
    this.isError = false;
    this.isLoading = false;
  }).catch(e=>{
    console.log('Error:  ', e);
    this.isError = true;
    this.isLoading = false;
  })
  this.idSearch="";
}

}