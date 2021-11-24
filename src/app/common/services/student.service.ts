import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthenticationService } from './authentication.service';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getStudent(data: string): Promise<any> {
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken(),
    });
    if (data == '') {
      //console.log(this.authenticationService.getToken())
      return this.httpClient
        .get(environment.host + environment.apiPath + '/students', {
          headers: httpHeaders,
        })
        .toPromise();
    } else {
      return this.httpClient
        .get(environment.host + environment.apiPath + '/students?userName=' + data, {
          headers: httpHeaders,
        })
        .toPromise();
    }
  }

  postStudent(data: any) {
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken(),
    });
    return this.httpClient
      .post(environment.host + environment.apiPath + '/students', data, {
        headers: httpHeaders,
      })
      .toPromise();
  }

  putStudent(studentId: string, data: any) {
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken(),
    });
    return this.httpClient
      .put(
        environment.host +
          environment.apiPath +
          '/students?studentId=' +
          studentId,
        data,
        {
          headers: httpHeaders,
        }
      )
      .toPromise();
  }

  deleteStudent(studentId: string, data: any) {
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken(),
    });
    return this.httpClient
      .delete(
        environment.host +
          environment.apiPath +
          '/classes?studentId=' +
          studentId,
        data
      )
      .toPromise();
  }
}

