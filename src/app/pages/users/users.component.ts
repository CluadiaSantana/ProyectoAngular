import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';
import { User } from 'src/app/common/datatypes/user';
import { AuthenticationService } from 'src/app/common/services/authentication.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  idSearch: string="";
  users: User[] = [];
  isError: boolean = false;
  isLoading: boolean = false;
  noFound: boolean=false;
  constructor(private userService: UserService, private authenticationService : AuthenticationService) { }
  


  ngOnInit(): void {
    
      this.userService.getUsers("").then(response=>{
        this.users =response;
        this.isError = false;
        this.isLoading = false;
      }).catch(e=>{
        console.log('Error:  ', e);
        this.isError = true;
        this.isLoading = false;
      })
  }

  getUserId(){
    if(!this.idSearch){
      this.userService.getUsers("").then(response=>{
        this.users =response;
        this.isError = false;
        this.isLoading = false;
      }).catch(e=>{
        console.log('Error:  ', e);
        this.isError = true;
        this.isLoading = false;
      })
      return;
    }
    let id :string=this.idSearch
    this.userService.getUsers(id).then(response=>{
      this.users = [];
      this.users.push(response)
      this.isError = false;
      this.isLoading = false;
    }).catch(e=>{
      console.log('Error:  ', e);
      this.isError = false;
      this.isLoading = false;
      this.users=[];
    })
    this.idSearch="";
  }
  delete(id : String, userName :String):boolean{
    console.log("Se borro el usurio"+ " " + id);
    console.log(userName);
    return true;
  }
}
