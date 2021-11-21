import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { GoogleService } from 'src/app/common/services/google.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {

  email: string=""; 
  name: string="";
  googleId: string="";


  constructor(private router: Router, private authenticationService : AuthenticationService,
    private socialAuthService: SocialAuthService, private googleService: GoogleService) {
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((response) =>{
        this.email = response.email,
        this.name = response.name,
        this.googleId = response.id

        console.log(this.email);

        this.googleService.login({
          email: this.email,
          userName: this.name,
          googleId: this.googleId

        }).then(response=>{
          this.authenticationService.saveToken(response);
          this.router.navigate(['/users']);
        });
      });
  }

  ngOnInit(): void {
  }

}
