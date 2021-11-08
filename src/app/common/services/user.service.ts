import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';

import { environment } from './../../../environments/environment';



@Injectable({

  providedIn: 'root'

})

export class UserService {



  constructor(private httpClient: HttpClient, private authenticationService: AuthenticationService) { }




  getUsers(data: any):Promise <any>{

    const httpHeaders = new HttpHeaders();

    httpHeaders.append( "x-auth" , this.authenticationService.getToken() )

    if(!data){

      return this.httpClient.post( environment.host + environment.apiPath + "/users" ,{

        headers: httpHeaders

      }).toPromise();

    }else{

      return this.httpClient.post( environment.host + environment.apiPath + "/users", data,{

      headers: httpHeaders

    }).toPromise();

  }

     

    };



}