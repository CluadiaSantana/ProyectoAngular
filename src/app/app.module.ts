import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './modules/material/material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './pages/users/users.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { StudentsComponent } from './pages/students/students.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { RegistrationRecordsComponent } from './pages/registration-records/registration-records.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import { GoogleLoginProvider} from 'angularx-social-login';
import { SignupComponent } from './pages/signup/signup.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './common/services/auth-guard-service.service';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { UpdateComponent } from './pages/update/update.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    TeachersComponent,
    StudentsComponent,
    ClassesComponent,
    RegistrationRecordsComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ForbiddenComponent,
    SignInComponent,
    MyprofileComponent,
    UpdateComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: '**', component: LoginComponent}
    ]),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule

  ],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('959886331117-k83jcgut24jgeonjlhfqo1vfflcmjale.apps.googleusercontent.com') //Client id
        }
      ]
    }
  },
  AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }