import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient:HttpClient, private authenticationService: AuthenticationService) { }
updateProfileImage(file: any){
  const httpHeaders = new HttpHeaders({
    'x-auth': this.authenticationService.getToken(),
  });
  return this.httpClient.post( environment.host + environment.apiPath + "/users/profile", file, {
    headers: httpHeaders,
  })
};

}
