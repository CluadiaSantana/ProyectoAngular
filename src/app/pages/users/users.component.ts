import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/common/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  //me quede con la lista de usuarios
  
  constructor(userService: UserService) { }
  


  ngOnInit(): void {

  }

}
