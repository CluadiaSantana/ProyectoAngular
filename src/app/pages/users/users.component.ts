import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';
import { User } from 'src/app/common/datatypes/user';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  search: string="";
  users: User[] = [];
  constructor(private userService: UserService) { }
  


  ngOnInit(): void {
    
      this.userService.getUsers("").then(response=>{
        this.users =response;
      }).catch(e=>{
        console.log('Error:  ', e);
      })
  }

}
