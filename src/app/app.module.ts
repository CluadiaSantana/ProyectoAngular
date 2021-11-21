import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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
import { DemoComponent } from './pages/demo/demo.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from './common/services/auth-guard-service.service';
import { environment } from 'src/environments/environment';

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
    DemoComponent,
    SignInComponent,
    MainpageComponent

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'login', component: LoginComponent},
      {path: 'mainpage', component: MainpageComponent, canActivate: [AuthGuardService]},
      {path: '**', component: LoginComponent}
    ]),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
 
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false, //keeps the user signed in
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(environment.GoogleProvider) //Client id
        }
      ]
    }
  },
  SocialLoginModule,
  ReactiveFormsModule,
  AuthGuardService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }