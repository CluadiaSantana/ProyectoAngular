import { Component, OnInit } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  nombre:string='Claudia';

  ngOnInit(){
    const socketClient=socketIo.io(environment.socketurl);
  }
}


