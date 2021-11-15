import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/guards/auth.guard';
import { RoleGuard } from './common/guards/role.guard';
import { HeaderComponent } from './layout/header/header.component';
import { ClassesComponent } from './pages/classes/classes.component';
import { ForbiddenComponent } from './pages/forbidden/forbidden.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationRecordsComponent } from './pages/registration-records/registration-records.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StudentsComponent } from './pages/students/students.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { UsersComponent } from './pages/users/users.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: {
    status: false
  }},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard], data: {
    status: true
  }},
  {path: 'students', component: StudentsComponent, canActivate: [AuthGuard], data: {
    status: true
  }},
  {path: 'teachers', component: TeachersComponent, canActivate: [AuthGuard], data: {
    status: true
  }},
  {path: 'classes', component: ClassesComponent, canActivate: [AuthGuard, RoleGuard], data: {
    status: true,
    role: 'Admin',
    role1: 'teacher'
  }},
  {path: 'records', component: RegistrationRecordsComponent, canActivate: [AuthGuard, RoleGuard], data: {
    status: true,
    role: 'Admin',
    role1: 'teacher'
  }},
  {path: 'signup', component: SignupComponent,canActivate: [AuthGuard], data: {
    status: false
  }},
  {path: 'forbidden', component: ForbiddenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
