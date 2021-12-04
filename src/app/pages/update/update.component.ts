import { Component, OnInit } from '@angular/core';
import { SignService } from 'src/app/common/services/sign.service';
import { Router } from '@angular/router'; 
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  title = 'fileUpload';
  images: any;

  constructor(private signService: SignService, private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { 
    this.form= this.formBuilder.group({
      userName: ['',Validators.compose( 
        [Validators.required, Validators.pattern('[a-zA-Z\s ]+')]
        )],
      email: ['',Validators.compose([Validators.required, Validators.email])],
      password: ['',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])],
      confirm: ['',Validators.compose([Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])]
    }, {
      validators: this.compararPasswords.bind(this)
    });
  }

  sign(){
    if(this.form.valid){
      this.signService.sign({
        email: this.form.controls['email'].value,
        password: this.form.controls['password'].value,
        userName: this.form.controls['userName'].value,
        role: 'student'
      }).then((response)=>{
        this.router.navigate(['/login']);
      })
    }else{
      this.nameError= this.form.controls['userName'].valid;
      this.emailError= this.form.controls['email'].valid;
      this.passwordError =this.form.controls['password'].valid;
    }
  }

  ngOnInit(): void {
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

  selectImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
    }
  }

  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.images);

    this.http.post<any>('http://localhost:3001/file', formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }

}3
