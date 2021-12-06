import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  constructor(
    private httpClient: HttpClient,
    private authenticationService: AuthenticationService
  ) {}
  getRecords(data: string): Promise<any> {
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken(),
    });
    if (data == '') {
      //console.log(this.authenticationService.getToken())
      return this.httpClient
        .get(environment.host + environment.apiPath + '/records', {
          headers: httpHeaders,
        })
        .toPromise();
    } else {
      return this.httpClient
        .get(
          environment.host + environment.apiPath + '/records' + data,
          {
            headers: httpHeaders,
          }
        )
        .toPromise();
    }
  };
  postRecord(data: any) {
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken(),
    });
    return this.httpClient
      .post(environment.host + environment.apiPath + '/records', data, {
        headers: httpHeaders,
      })
      .toPromise();
  };
   
  putRecord(teacherId: string, studentId: string, data: any) {
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken(),
    });
    return this.httpClient
      .put(
        environment.host +
          environment.apiPath +
          '/records?studentId=' +
          studentId +
          '&teacherId=' +
          teacherId,
        data,
        {
          headers: httpHeaders,
        }
      )
      .toPromise();
  };
  deleteRecord(teacherId: string, studentId: string, data: any) {
    const httpHeaders = new HttpHeaders({
      'x-auth': this.authenticationService.getToken(),
    });
    return this.httpClient
      .delete(
        environment.host +
          environment.apiPath +
          '/records?studentId=' +
          studentId +
          '&teacherId=' +
          teacherId,
        data
      )
      .toPromise();
  };
}
