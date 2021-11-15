import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationRecordsComponent } from './pages/registration-records/registration-records.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StudentsComponent } from './pages/students/students.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { UsersComponent } from './pages/users/users.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UsersComponent},
  {path: 'students', component: StudentsComponent},
  {path: 'teachers', component: TeachersComponent},
  {path: 'classes', component: ClassesComponent},
  {path: 'records', component: RegistrationRecordsComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
