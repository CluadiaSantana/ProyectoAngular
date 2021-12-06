import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/common/services/login.service';
import { SocketsService } from 'src/app/common/services/sockets.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
 
  email: string=""; 
  password: string="";
  hide = true;

  constructor( private authenticationService : AuthenticationService, private router: Router,private loginService: LoginService, private socketService: SocketsService) { }

  ngOnInit(): void {
  }

  login(){
    this.loginService.login({
      email: this.email,
      password: this.password
    }).then((response)=>{
      this.authenticationService.saveToken(response);
      this.socketService.connect(this.authenticationService.getToken());
      this.router.navigate(['/classes']);
    }). catch();
  }

}
