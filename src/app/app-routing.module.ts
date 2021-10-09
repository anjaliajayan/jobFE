import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AdminPortalComponent } from './admin-portal/admin-portal.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersWelcomeComponent } from './users-welcome/users-welcome.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models/role';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },  
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'user-profile', component: UserProfileComponent},
  { path: 'dashBoard', component: DashBoardComponent,canActivate:[AuthGuard],
  children:[
    { path: '', redirectTo:'user-welcome', pathMatch: 'full' },  
    {path: 'user-welcome',component: UsersWelcomeComponent ,canActivate:[AuthGuard]},
    {path: 'user-profile',component: UserProfileComponent ,canActivate:[AuthGuard],data:{roles:[Role.User]},
  children:[
    {path: 'job-search',component: UsersWelcomeComponent ,canActivate:[AuthGuard]},
    {path: 'applied-jobs',component: UsersWelcomeComponent ,canActivate:[AuthGuard]}
  ]},
    {path: 'admin-profile',component: AdminPortalComponent ,canActivate:[AuthGuard],data:{roles:[Role.Admin]}}
  ]
},
  { path: '**', redirectTo: '' }];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
