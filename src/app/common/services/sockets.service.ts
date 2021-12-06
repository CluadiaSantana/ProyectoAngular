import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as socketIo from 'socket.io-client';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketsService {
  socketClient:any;
  constructor() { }

  socketStatus: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);

  connect(token: string ) {
    this.socketClient = socketIo.io(environment.socketurl, {
      transportOptions: {
        polling: {
          extraHeaders: {
            'x-auth': token
          }
        }
      }
    });

    this.socketStatus.next(true);
  }

  on(eventName: any, callback: any) {
    this.socketClient.on(eventName, callback);
  }

  emit(eventName: any, data: any) {
    this.socketClient.emit(eventName, data);
  }

  disconnect() {
    if(this.socketClient && this.socketClient.connected) {
      this.socketClient.disconnect();
      this.socketStatus.next(false);
    }
  }
}