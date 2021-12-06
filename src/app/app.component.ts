import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './common/services/authentication.service';
import { SocketsService } from './common/services/sockets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nombre:string='Claudia';

  constructor(private authenticationService: AuthenticationService, private socket: SocketsService){
    if(this.authenticationService.isLoggedIn()){
      this.socket.connect(this.authenticationService.getToken());
    }
  }
}

