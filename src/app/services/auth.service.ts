import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../envinronments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private _http: HttpClient) {
    //@ts-ignore
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(){
    return this.currentUserSubject.value;
  }

  login(email: string | null | undefined, password: string | null | undefined) {
    return this._http.post<any>(`${environment.apiUrl}api/v1/auth/sign_in`, {email: email, password})
      .pipe(tap(() => localStorage.setItem('currentUser', '')),
        map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout(): Observable<any> {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return of(true);
  }

  signUp(rawValue: any) {
    return this._http.post<any>(`${environment.apiUrl}api/v1/auth/sign_up`, rawValue);
  }
}
