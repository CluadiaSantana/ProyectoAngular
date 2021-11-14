import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';

import { environment } from './../../../environments/environment';

 

@Injectable({

  providedIn: 'root'

})

export class StudentService {



  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) { }




  getStudent(data: string): Promise <any>{
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken()
    });
    if(data==""){
      //console.log(this.authenticationService.getToken())
      return this.httpClient.get( environment.host + environment.apiPath + "/students" ,{
        headers: httpHeaders
      }).toPromise();
    }else{
      return this.httpClient.get( environment.host + environment.apiPath + "/students?id="+data,{
      headers: httpHeaders
    }).toPromise();
  }
    };


}