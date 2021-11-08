import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loginStatus: boolean= false;

  constructor() { }

  saveToken(data : any){
    this.loginStatus= true;
    localStorage.setItem('token',data.token);
    localStorage.setItem('rol',data.rol);
    localStorage.setItem('userId',data.id);
    localStorage.setItem('email',data.email);
  }

  getUserId(){
    return localStorage.getItem('userId');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  clear(){
    this.loginStatus= false;
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
  }

}


