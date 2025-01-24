import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {CurrentUser} from '../components/domains/CurrentUser';
import { inject } from '@angular/core';
import {Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const user: CurrentUser = JSON.parse(<string>localStorage.getItem('currentUser')) as CurrentUser;
  const router = inject(Router);
  const authToken = user?.token;

  if (authToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }
  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
