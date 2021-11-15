import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  private user: SocialUser = new SocialUser;
  private loggedIn: boolean = false;

  constructor(private SocialAuthService: SocialAuthService) { }

  // Subscribing to the user authentication status OnInit
  ngOnInit() {
    this.SocialAuthService.authState.subscribe((user: SocialUser) => {
    this.user = user;
    this.loggedIn = (user != null);
    });
  }
}
