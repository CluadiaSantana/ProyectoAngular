import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { DataService } from 'src/app/common/services/data.service';

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

  constructor(private authentication: AuthenticationService, private data: DataService, private router: Router) { }

  
  ngOnInit(): void {
    this.userName= this.authentication.getUserName();
    this.email= this.authentication.getEmail();
    this.role= this.authentication.getRole();
  }

  selectImage(event:any){
    console.log("hola1")
    if(event.target.value){
      console.log("hola2")
      const file = event.target.files[0];
      this.image = file;
    }
  }

  submitPhoto():any{
    let fd= new FormData();
    if(this.image){
      console.log("hola")
      fd.append('file', this.image);
      this.data.updateProfileImage(fd).subscribe((res)=>{
        this.router.navigate(['/myprofile']);
      })
    }
  }

  chageButton():any{
    this.change= !this.change;
  }

}
