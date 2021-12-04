import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';

import { environment } from './../../../environments/environment';



@Injectable({

  providedIn: 'root'

})

export class UserService {



  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) { }

  getUsers(data:string): Promise <any>{
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken() 
    });
    //console.log("La data tiene",data);
    if(data==""){
      //console.log(this.authenticationService.getToken())
      return this.httpClient.get( environment.host + environment.apiPath + "/users" ,{
        headers: httpHeaders
      }).toPromise();
    }else{
      return this.httpClient.get( environment.host + environment.apiPath + "/users?id="+data,{
      headers: httpHeaders
    }).toPromise();
  }
    };

    
  deleteTeacher(teacherId: string, data: any) {
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken(),
    });
    return this.httpClient
      .delete(
        environment.host +
          environment.apiPath +
          '/classes?teacherId=' +
          teacherId,
        data
      )
      .toPromise();
  }
  putTeacher(id: string, data: any) {
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken(),
    });
    return this.httpClient
      .put(
        environment.host +
          environment.apiPath +
          '/users?id=' +
          id + 
        data, 
        {
          headers: httpHeaders,
        }
      )
      .toPromise();
  };
}



