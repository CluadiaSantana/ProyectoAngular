import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getTeacher(data: string): Promise<any> {
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken(),
    });
    if (data == '') {
      //console.log(this.authenticationService.getToken())
      return this.httpClient
        .get(environment.host + environment.apiPath + '/teachers', {
          headers: httpHeaders,
        })
        .toPromise();
    } else {
      return this.httpClient
        .get(environment.host + environment.apiPath + '/teachers?userName=' + data, {
          headers: httpHeaders,
        })
        .toPromise();
    }
  }

  postTeacher(data: any) {
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken(),
    });
    return this.httpClient
      .post(environment.host + environment.apiPath + '/teachers', data, {
        headers: httpHeaders,
      })
      .toPromise();
  }

  putTeacher(teacherId: string, data: any) {
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken(),
    });
    return this.httpClient
      .put(
        environment.host +
          environment.apiPath +
          '/classes?teacherId=' +
          teacherId,
        data,
        {
          headers: httpHeaders,
        }
      )
      .toPromise();
  }

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
}
