import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/guards/auth.guard';
import { RoleGuard } from './common/guards/role.guard';
import { HeaderComponent } from './layout/header/header.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { LoginComponent } from './pages/login/login.component';
import { MyprofileComponent } from './pages/myprofile/myprofile.component';
import { NewRecordComponent } from './pages/new-record/new-record.component';
import { RegistrationRecordsComponent } from './pages/registration-records/registration-records.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StudentsComponent } from './pages/students/students.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { UpdateComponent } from './pages/update/update.component';
import { UsersComponent } from './pages/users/users.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: {
    status: false
  }},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard,RoleGuard], data: {
    status: true,
    role: 'Admin',
    role1: 'Admin'
  }},
  {path: 'students', component: StudentsComponent, canActivate: [AuthGuard, RoleGuard], data: {
    status: true,
    role: 'Admin',
    role1: 'teacher'
  }},
  {path: 'teachers', component: TeachersComponent, canActivate: [AuthGuard], data: {
    status: true
  }},
  {path: 'classes', component: ClassesComponent, canActivate: [AuthGuard], data: {
    status: true,
  }},
  {path: 'records', component: RegistrationRecordsComponent, canActivate: [AuthGuard], data: {
    status: true,
  }},
  {path: 'signup', component: SignupComponent,canActivate: [AuthGuard], data: {
    status: false
  }},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'myprofile', component: MyprofileComponent,canActivate: [AuthGuard], data: {
    status: true,
  }},
  {path: 'update', component: UpdateComponent, canActivate: [AuthGuard,RoleGuard], data: {
    status: true,
    role: 'Admin',
    role1: 'Admin'
  }},
  {path: 'newRecord', component: NewRecordComponent, canActivate: [AuthGuard,RoleGuard], data: {
    status: true,
    role: 'Admin',
    role1: 'teacher'
  }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }