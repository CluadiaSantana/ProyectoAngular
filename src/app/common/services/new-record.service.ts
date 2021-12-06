import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewRecordService {

  constructor() { }
  goRecord(data : any){
    localStorage.setItem('recordId',data);
  }

  getRecord():string{
    return localStorage.getItem('recordId') || '';
  }

  cleanRecord():any{
    localStorage.removeItem('recordId');
  }
}
