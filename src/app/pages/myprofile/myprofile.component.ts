import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/common/services/authentication.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.scss']
})
export class MyprofileComponent implements OnInit {
  userName: string="";
  email: string="";
  role: string="";
  image: any;
  change: boolean=false;

  constructor(private authentication: AuthenticationService) { }

  
  ngOnInit(): void {
    this.userName= this.authentication.getUserName();
    this.email= this.authentication.getEmail();
    this.role= this.authentication.getRole();
  }

  selectImage(event:any){
    if(event.target.vale){
      this.image= <File>event.target.files[0]
    }
  }

  submitPhoto():any{
    let fd= new FormData();
    if(this.image){
      fd.append('profileImage',this.image,this.authentication.getUserId());
    }
  }

  chageButton():any{
    this.change= !this.change;
  }

}
