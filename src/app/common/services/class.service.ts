import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClassService {

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) { }
  
  getClass(data:string): Promise <any>{
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken()
    });
    if(data==""){
      //console.log(this.authenticationService.getToken())
      return this.httpClient.get( environment.host + environment.apiPath + "/classes" ,{
        headers: httpHeaders
      }).toPromise();
    }else{
      return this.httpClient.get( environment.host + environment.apiPath + "/classes?studentId="+data,{
      headers: httpHeaders
    }).toPromise();
  }
    };



}
