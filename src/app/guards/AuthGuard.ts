import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import {CurrentUser} from '../components/domains/CurrentUser';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    const user: CurrentUser = JSON.parse(<string>localStorage.getItem('currentUser')) as CurrentUser;
    if (user.token) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
