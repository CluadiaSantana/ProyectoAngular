import { Attribute, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';

@Component({
  selector: 'app-header', 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  checked: boolean = false;
  isLogged: boolean=false;

  constructor(private authenticationService : AuthenticationService, private router: Router) { 
    this.authenticationService.loginStatus.subscribe((status:boolean)=>{
      this.isLogged=status;
    });
  }

  ngOnInit(): void {
  }

  hideMenu(): void{
     this.checked = false;
  }

  logOut(): void{
    this.authenticationService.clear();
  }
}