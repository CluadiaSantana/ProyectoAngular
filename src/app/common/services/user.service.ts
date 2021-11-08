import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }


  getUsers():Promise <any>{
    return new Promise ((sucess)=>{
      
    })
  }

}


