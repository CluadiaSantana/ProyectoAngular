import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor(private httpClient:HttpClient) { }

  sign(data: any): Promise <any>{
    return this.httpClient.post( environment.host + environment.authPath + "/users", data ).toPromise();
  }
  
}
