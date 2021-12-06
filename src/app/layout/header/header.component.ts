import { Attribute, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { GoogleService } from 'src/app/common/services/google.service';
import { SocketsService } from 'src/app/common/services/sockets.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';



@Component({
  selector: 'app-header', 
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  checked: boolean = false;
  isLogged: boolean=false;
  roleAdmin:boolean=false;
  roleStudent:boolean=false;
  email: string=""; 
  name: string="";
  googleId: string="";
  idToken: string="";
  noSizecancel = 0;
  noSizConfirm = 0;
  noSizComplete = 0;
  noSizNew = 0;

  constructor(private authenticationService : AuthenticationService, private router: Router,
    private socialAuthService: SocialAuthService, private googleService: GoogleService, private socketService: SocketsService) { 
    this.authenticationService.loginStatus.subscribe((status:boolean)=>{
      this.isLogged=status;
    });
    this.authenticationService.roleAdminStatus.subscribe((status:boolean)=>{
      this.roleAdmin=status;
    });
    this.authenticationService.roleStudentStatus.subscribe((status:boolean)=>{
      this.roleStudent=status;
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

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((response) =>{
        this.email = response.email,
        this.name = response.name,
        this.googleId = response.id,
        this.idToken = response.idToken
        console.log(this.email);

        this.googleService.login({
          email: this.email,
          userName: this.name,
          googleId: this.googleId,
          idToken: this.idToken

        }).then(response=>{
          this.authenticationService.saveToken(response);
          this.socketService.connect(this.authenticationService.getToken());
          this.router.navigate(['/users']);
        });
      });
  }

  openNotifications() {
    this.router.navigate(['/records']);
    this.noSizecancel = 0;
    this.noSizConfirm = 0;
    this.noSizComplete = 0;
    this.noSizNew = 0;
  }

}