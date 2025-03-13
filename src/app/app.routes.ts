import {Routes} from '@angular/router';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {AdminComponent} from './components/admin/admin.component';
import {AuthGuard} from './guards/AuthGuard';
import {NavComponent} from './components/shared/nav/nav.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { CreatePatientComponent } from './components/create-patient/create-patient.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';

export const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin-panel',
        component: AdminComponent,
      },
      {
        path: 'admin-panel/edit-user/:id',
        component: EditUserComponent,
      },
      {
        path: 'patient-list',
        component: PatientListComponent,
      },
      {
        path: 'create-patient',
        component: CreatePatientComponent,
      },
      {
        path: 'patient-list/edit-patient/:id',
        component: EditPatientComponent,
      },
      {
        path: 'categories-list',
        component: CategoriesListComponent,
      },
      {
        path: 'create-category',
        component: CreateCategoryComponent,
      },
      {
        path: 'edit-category/:id',
        component: EditCategoryComponent,
      },

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
