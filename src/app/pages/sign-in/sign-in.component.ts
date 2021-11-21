import { Component, OnInit } from '@angular/core';
import { SignService } from 'src/app/common/services/sign.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  form: FormGroup;

  constructor(private signService: SignService, private router: Router, private formBuilder: FormBuilder ) {
    this.form= this.formBuilder.group({
      userName: [' ',Validators.required, Validators.pattern('^[a-zA-Z]+$')],
      email: [' ',Validators.required, Validators.email],
      password: [' ',Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')],
      confirm: [' ',Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')],
      role: 'student'
    })
   }

   sign(){
    if(this.form.valid){

    }else{
      
    }
  }

  ngOnInit(): void {
  }

}
