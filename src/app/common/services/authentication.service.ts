import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor() { }

  saveToken(data : any){
    localStorage.setItem('token',data.token);
    localStorage.setItem('rol',data.rol);
    localStorage.setItem('email',data.email);
    
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
  }

}



