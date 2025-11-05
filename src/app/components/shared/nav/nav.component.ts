import { Component, inject, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';

interface Page {
  name: string;
  route: string;
  icon?: string;
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
    RouterLink,
  ],
})
export class NavComponent implements OnInit {
  user: any;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    try{
      this.user = JSON.parse(localStorage.getItem('currentUser') || 'null');
      console.log("NavComponent - currentUser:", this.user);
    }
    catch(error){
      console.error("NavComponent - Error parsing currentUser from localStorage:", error);
      this.user = null;
    }
    
  }
  private breakpointObserver = inject(BreakpointObserver);
  pages: Page[] =  [
    { name: 'Manage Users', route: '/admin-panel', icon: 'admin_panel_settings' },
    { name: 'Patients', route: '/patient-list', icon: 'person' },
    { name: 'Services', route: '/dental-service-list', icon: 'medical_services' },
    { name: 'Locations', route: '/location-list', icon: 'place' },
    { name: 'Dental Providers', route: '/resource-list', icon: 'group' },
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  get currentUser() {
    return this.user;
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
