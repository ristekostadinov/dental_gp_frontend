import {Routes} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {AdminComponent} from './components/admin/admin.component';
import {AuthGuard} from './guards/AuthGuard';
import {NavComponent} from './components/shared/nav/nav.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

export const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin-panel',
        component: AdminComponent
      },
      {
        path: 'admin-panel/edit-user/:id',
        component: EditUserComponent
      }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  }

];
