import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { DataService } from 'src/app/common/services/data.service';
import { User } from 'src/app/common/datatypes/user';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  image: any;
  change: boolean=false;
  users: User[] = [];

  constructor(private authentication: AuthenticationService, private data: DataService, private router: Router,private userService: UserService) { }

  
  ngOnInit(): void {
    let id: string = this.authentication.getUserId();
    //console.log("el id es",id)
    this.userService.getUsers(id).then((response: User)=>{
      console.log(response);
      this.users.push(response)
      //console.log("entro init")
    }).catch((e: any)=>{
      console.log('Error:  ', e);
      this.users=[];
    })
    //console.log("adios")
  }

  selectImage(event:any){
    //console.log("hola1")
    if(event.target.value){
      //console.log("hola2")
      const file = event.target.files[0];
      this.image = file;
    }
  }

  submitPhoto():any{
    let fd= new FormData();
    if(this.image){
      fd.append('file', this.image);
      //console.log("entro submit")
      this.data.updateProfileImage(fd).subscribe((res)=>{
        this.userService.getUsers(this.authentication.getUserId()).then((response: User)=>{
          console.log("submitPhoto",response)
          this.users = [];
          this.users.push(response)
        }).catch((e: any)=>{
          console.log('Error:  ', e);
          this.users=[];
        })
      })
    }
  }

  chageButton():any{
    this.change= !this.change;
  }

}
