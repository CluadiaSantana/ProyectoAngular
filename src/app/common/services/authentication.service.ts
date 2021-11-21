import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

loginStatus: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
roleStatus: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
  constructor() {
    this.loginStatus.next(this.isLoggedIn());
   }

  saveToken(data : any){
    localStorage.setItem('token',data.token);
    localStorage.setItem('role',data.role);
    localStorage.setItem('email',data.email);
    localStorage.setItem('userName',data.userName);
    this.loginStatus.next(true);
    this.roleStatus.next(this.rolePermition());
  }

  getUserId() : string {
    return localStorage.getItem('userId') || '';
  }

  getToken() :string {
    return localStorage.getItem('token') || '';
  }

  getRole() :string {
    return localStorage.getItem('role') || '';
  }

  getUserName():string {
    return localStorage.getItem('userName') || '';
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  rolePermition(): boolean{
    if(localStorage.getItem('role')=='Admin' || localStorage.getItem('role')=='teacher'){
      return(true);
    }else{
      return(false);
    }
  }

  clear(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    this.loginStatus.next(false);
    this.roleStatus.next(false);
  }

}



