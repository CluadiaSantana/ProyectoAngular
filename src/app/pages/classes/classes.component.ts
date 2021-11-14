import { Component, OnInit } from '@angular/core';
import { Classes } from 'src/app/common/datatypes/classes';
import { ClassService } from 'src/app/common/services/class.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss']
})
export class ClassesComponent implements OnInit {

  studentsId: string="";
  teachersId: string="";
  classes: Classes [] = [];
  isError: boolean = false;
  isLoading: boolean = false;
  constructor(private classService: ClassService) { }

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
  if(!this.studentsId || !this.teachersId){
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
  let ids :string=this.studentsId + "&teacherId=" +this.teachersId
  this.classService.getClass(ids).then(response=>{
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