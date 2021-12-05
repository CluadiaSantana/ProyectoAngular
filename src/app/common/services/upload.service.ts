import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor() { }
  goUpload(data : any){
    localStorage.setItem('uploadId',data);
  }

  getUpload():string{
    return localStorage.getItem('uploadId') || '';
  }

  cleanUpload():any{
    localStorage.removeItem('uploadId');
  }
}
