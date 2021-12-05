import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/common/datatypes/user';
import { UserService } from 'src/app/common/services/user.service';
import { UploadService } from 'src/app/common/services/upload.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  form: FormGroup;
  emailError: boolean=true;
  nameError: boolean=true;
  passwordError: boolean=true;
  confirmError: boolean=true;
  users: User[]=[];
  pusername:string ='prueba';
  email:string="";
  usern:string="";
  role:string="";

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder, private uploadService: UploadService) { 
    this.form= this.formBuilder.group({
      userName: ['' ,Validators.compose( 
        [ Validators.pattern('[a-zA-Z\s ]+')]
        )],
      role: [''],
      email: ['',Validators.compose([ Validators.email])],
      password: ['',Validators.compose([Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])],
      confirm: ['',Validators.compose([Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])]
    }, {
      validators: this.compararPasswords.bind(this)
    });
  }
  ngOnInit(): void {
    this.userService.getUsers(this.uploadService.getUpload()).then(response=>{
      this.users = [];
      this.users.push(response)
      this.pusername=this.users[0].userName;
    }).catch(e=>{
      this.users=[];
    })
  }

  upload(){
    
    if(this.form.valid){
      this.usern=this.form.controls['userName'].value;
      this.email=this.form.controls['email'].value;
      this.role=this.form.controls['role'].value;
      if(this.form.controls['email'].pristine){
        this.email=this.users[0].email;
        console.log(this.users);
      }
      if(this.form.controls['userName'].pristine){
        this.usern=this.users[0].userName;
      }
      if(this.form.controls['role'].pristine){
        this.role=this.users[0].role;
      }
      if(this.form.controls['password'].pristine){
        this.userService.uploadUser(this.uploadService.getUpload(),{
          email: this.email,
          userName: this.usern,
          role: this.role
        }).then(resp=>{
          this.router.navigate(['/users']);
        }).catch(e=>{
          this.router.navigate(['/users']);
        })
      }else{
        this.userService.uploadUser(this.uploadService.getUpload(),{
          email: this.email,
          userName: this.usern,
          password: this.form.controls['password'].value,
          role: this.role
        }).then(resp=>{
          this.router.navigate(['/users']);
        }).catch(e=>{
          this.router.navigate(['/users']);
        })
      }
      
    }else{
      this.nameError= this.form.controls['userName'].valid;
      this.emailError= this.form.controls['email'].valid;
      this.passwordError =this.form.controls['password'].valid;
    }
  }

 

  compararPasswords() {
    if (!this.form) { return null; }
    const values = this.form.getRawValue();
    if (values.password === values.confirm) {
      this.confirmError=true;
      return null;
    } else {
      this.confirmError=false;
      return { mismatch: true }
    }
  }

}
