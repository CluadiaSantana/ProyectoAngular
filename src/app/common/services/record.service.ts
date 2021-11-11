import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) { }
  getRecords(data:string): Promise <any>{
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken()
    });
    if(data==""){
      //console.log(this.authenticationService.getToken())
      return this.httpClient.get( environment.host + environment.apiPath + "/records" ,{
        headers: httpHeaders
      }).toPromise();
    }else{
      let url: string=  environment.host + environment.apiPath + "/records?studentId="+data;
      console.log(url);
      return this.httpClient.get( environment.host + environment.apiPath + "/records?studentId="+data,{
      headers: httpHeaders
    }).toPromise();
  }
    };


}
