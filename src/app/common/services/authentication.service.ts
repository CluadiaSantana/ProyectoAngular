import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

loginStatus: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
roleAdminStatus: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
roleStudentStatus: BehaviorSubject<boolean>= new BehaviorSubject<boolean>(false);
  constructor() {
    this.loginStatus.next(this.isLoggedIn());
   }
 
  saveToken(data : any){
    localStorage.setItem('token',data.token);
    localStorage.setItem('role',data.role);
    localStorage.setItem('photoName',data.photoName);
    localStorage.setItem('email',data.email);
    localStorage.setItem('userName',data.userName);
    localStorage.setItem('userId',data.id);
    this.loginStatus.next(true);
    this.roleAdminStatus.next(this.rolePermition("Admin"));
    this.roleStudentStatus.next(this.rolePermition("student"));
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

  getEmail():string{
    return localStorage.getItem('email') || '';
  }

  getPhotoName():string{
    return localStorage.getItem('photoName') || '';
  }

  isLoggedIn(): boolean{
    return !!localStorage.getItem('token');
  }

  rolePermition(role : String): boolean{
    if(localStorage.getItem('role')==role){
      return(true);
    }else{
      return(false);
    }
  }

  clear(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    localStorage.removeItem('photoName');
    this.loginStatus.next(false);
    this.roleAdminStatus.next(false);
    this.roleStudentStatus.next(false);
  }

}



