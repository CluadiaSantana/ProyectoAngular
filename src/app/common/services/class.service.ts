import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClassService {
  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) {}

  getClass(data: string): Promise<any> {
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken(),
    });
    if (data == '') {
      //console.log(this.authenticationService.getToken())
      return this.httpClient
        .get(environment.host + environment.apiPath + '/classes', {
          headers: httpHeaders,
        })
        .toPromise();
    } else {
      return this.httpClient
        .get(
          environment.host + environment.apiPath + '/classes' + data,
          {
            headers: httpHeaders,
          }
        )
        .toPromise();
    }
  }

  postClass(data: any) {
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken(),
    });
    return this.httpClient
      .post(environment.host + environment.apiPath + '/classes', data, {
        headers: httpHeaders,
      })
      .toPromise();
  };

  putClass(teacherId: string, studentId: string, data: any) {
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken(),
    });
    return this.httpClient
      .put(
        environment.host +
          environment.apiPath +
          '/classes?teacherId=' +
          teacherId +
          '&studentId=' +
          studentId,
        data,
        {
          headers: httpHeaders,
        }
      )
      .toPromise();
  };

  deleteClass(teacherId: string, studentId: string, data: any) {
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken(),
    });
    return this.httpClient
      .delete(
        environment.host +
          environment.apiPath +
          '/classes?studentId=' +
          studentId +
          '&teacherId=' +
          teacherId,
        data
      )
      .toPromise();
  };
}
