import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) { }
  
  getTeacher(data: string): Promise <any>{
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken()
    });
    if(data==""){
      //console.log(this.authenticationService.getToken())
      return this.httpClient.get( environment.host + environment.authPath + "/teachers" ,{
        headers: httpHeaders
      }).toPromise();
    }else{
      return this.httpClient.get( environment.host + environment.apiPath + "/teachers?id="+data,{
      headers: httpHeaders
    }).toPromise();
  }
    };

}
