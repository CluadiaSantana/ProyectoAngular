import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

loginStatus: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
  constructor() {
    this.loginStatus.next(this.isLoggedIn());
   }

  saveToken(data : any){
    localStorage.setItem('token',data.token);
    localStorage.setItem('rol',data.rol);
    localStorage.setItem('email',data.email);
    this.loginStatus.next(true);
  }

  getUserId() : string {
    return localStorage.getItem('userId') || '';
  }

  getToken() :string {
    return localStorage.getItem('token') || '';
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  clear(){
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('email');
    this.loginStatus.next(false);
  }

}



