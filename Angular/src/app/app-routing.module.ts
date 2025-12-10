import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './login/signup.component';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list.component';

const routes: Routes = [
  {
path:'',
pathMatch:'full',
redirectTo:'welcome'

},

{
path:'welcome',
component:WelcomeComponent
},

{
path:'login',
component:LoginComponent
},

{
path:'signup',
component:SignupComponent
},

{
    path: 'user',
    component: UserComponent
  },

   {
    path: 'userList',
    component: UserListComponent
  },

  {
    path: 'user/:id',
    component: UserComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
