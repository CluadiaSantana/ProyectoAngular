import { Attribute, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { GoogleService } from 'src/app/common/services/google.service';
import { SocketsService } from 'src/app/common/services/sockets.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from 'src/app/common/services/user.service';
import { User } from 'src/app/common/datatypes/user';


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
  roleTeacher:boolean=false;
  email: string=""; 
  name: string="";
  googleId: string="";
  idToken: string="";
  noSizeRecord: number = 0;
  noSizeCancel: number = 0;
  noSizeConfirm: number = 0;
  noSizeComplete: number = 0;

  constructor(private authenticationService : AuthenticationService, private router: Router,
    private socialAuthService: SocialAuthService, private googleService: GoogleService, private socketService: SocketsService, private userService: UserService) { 
    this.authenticationService.loginStatus.subscribe((status:boolean)=>{
      this.isLogged=status;
    });
    this.authenticationService.roleAdminStatus.subscribe((status:boolean)=>{
      this.roleAdmin=status;
    });
    this.authenticationService.roleStudentStatus.subscribe((status:boolean)=>{
      this.roleStudent=status;
    });
    this.authenticationService.roleSTeacherStatus.subscribe((status:boolean)=>{
      this.roleTeacher=status;
    });
    this.userService.getMyUsers().then((response: User)=>{
      this.noSizeCancel=response.noSizeCancel;
      this.noSizeRecord=response.noSizeRecord;
      this.noSizeConfirm=response.noSizeConfirm;
      this.noSizeComplete=response.noSizeComplete;
    })
    
  }

  ngOnInit(): void {
    this.socketService.on('pushRecord',(data: any)=>{
      console.log("dataid", data.id);
      console.log(this.authenticationService.getUserId());
      if(data.id!= this.authenticationService.getUserId())
      console.log("se debio añadir 1 record")
      this.noSizeRecord+=1;
    });
    this.socketService.on('Notification',(data: any)=>{
      console.log("se debio añadir 1 notificacion")
      if(data.name=="Completada"){
        this.noSizeComplete+=1;
      }
      if(data.name=="Confirmada"){
        this.noSizeConfirm+=1;
      }
      if(data.name=="Cancelada"){
        this.noSizeCancel+=1;
      }
    });
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
    this.socketService.emit('newNotification',{
      id: this.authenticationService.getUserId(),
      name:"all"
    })
    this.router.navigate(['/records']);
    this.noSizeRecord= 0;
    this.noSizeCancel= 0;
    this.noSizeConfirm= 0;
    this.noSizeComplete= 0;
  }


}