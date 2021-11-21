import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(private httpClient:HttpClient ) { }

  login(data: any) : Promise <any>{
    return this.httpClient.post( environment.host + environment.authPath + "/users/google", data).toPromise();
  }
}
 