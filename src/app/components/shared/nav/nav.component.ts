import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

interface Page {
  name: string;
  route: string;
}
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink
  ]
})
export class NavComponent {
  private breakpointObserver = inject(BreakpointObserver);
  pages: Page[] = [
    { name: 'Admin Panel', route: '/admin-panel' },
    { name: 'Patient List', route: '/patient-list' },
    { name: 'Create Patient', route: '/create-patient' },
    { name: 'Category List', route: '/category-list' },
    { name: 'Create Category', route: '/create-category' },
    { name: 'Dental Service List', route: '/dental-service-list' },
    { name: 'Create Dental Service', route: '/create-dental-service' },
    { name: 'Resource List', route: '/resource-list' },
    { name: 'Create Resource', route: '/create-resource' },
    { name: 'Location List', route: '/location-list' },
    { name: 'Location Preview', route: '/location-preview' },
    { name: 'Appointment Calendar', route: '/appointment-calendar' }
  ];
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
}
