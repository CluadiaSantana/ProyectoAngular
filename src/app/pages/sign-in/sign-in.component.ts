import { Component, OnInit } from '@angular/core';
import { SignService } from 'src/app/common/services/sign.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  email: string="";
  password: string="";
  name: string="";
  rol: string="student";

  constructor(private signService: SignService, private router: Router) { }

  sign(){
    this.signService.sign({
      email: this.email,
      password: this.password,
      name: this.name,
      rol: this.rol
    }).then((response)=>{
      this.router.navigate(['/login']);
    })
  }


  ngOnInit(): void {
  }


}
