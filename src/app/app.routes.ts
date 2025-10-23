import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './guards/AuthGuard';
import { NavComponent } from './components/shared/nav/nav.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { CreatePatientComponent } from './components/create-patient/create-patient.component';
import { EditPatientComponent } from './components/edit-patient/edit-patient.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { CreateCategoryComponent } from './components/create-category/create-category.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { DentalServiceListComponent } from './components/dental-service-list/dental-service-list.component';
import { CreateDentalServiceComponent } from './components/create-dental-service/create-dental-service.component';
import { EditDentalServiceComponent } from './components/edit-dental-service/edit-dental-service.component';
import { ResourceListComponent } from './components/resource-list/resource-list.component';
import { CreateResourceComponent } from './components/create-resource/create-resource.component';
import { EditResourceComponent } from './components/edit-resource/edit-resource.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { LocationPreviewComponent } from './components/location-preview/location-preview.component';
import { AppointmentCalendarComponent } from './components/appointment-calendar/appointment-calendar.component';

export const routes: Routes = [
  // Redirect the root path to /login
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },

  // Protected routes under NavComponent
  {
    path: '',
    component: NavComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'admin-panel', component: AdminComponent },
      { path: 'admin-panel/edit-user/:id', component: EditUserComponent },
      { path: 'patient-list', component: PatientListComponent },
      { path: 'create-patient', component: CreatePatientComponent },
      {
        path: 'patient-list/edit-patient/:id',
        component: EditPatientComponent,
      },
      { path: 'category-list', component: CategoriesListComponent },
      { path: 'create-category', component: CreateCategoryComponent },
      {
        path: 'category-list/edit-category/:id',
        component: EditCategoryComponent,
      },
      { path: 'dental-service-list', component: DentalServiceListComponent },
      {
        path: 'create-dental-service',
        component: CreateDentalServiceComponent,
      },
      {
        path: 'dental-service-list/edit-dental-service/:id',
        component: EditDentalServiceComponent,
      },
      { path: 'resource-list', component: ResourceListComponent },
      { path: 'create-resource', component: CreateResourceComponent },
      {
        path: 'resource-list/edit-resource/:id',
        component: EditResourceComponent,
      },
      { path: 'location-list', component: LocationListComponent },
      {
        path: 'location-list/location/:id',
        component: LocationPreviewComponent,
      },
      { path: 'appointment-calendar', component: AppointmentCalendarComponent },
    ],
  },

  // Public routes
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  // Optional: catch-all for unknown routes
  {
    path: '**',
    redirectTo: '/login',
  },
];
