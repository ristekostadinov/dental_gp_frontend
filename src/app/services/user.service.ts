import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../components/domains/User';
import { environment } from '../../envinronments/environment';
import { Observable } from 'rxjs';
import { UserListItem } from '../components/domains/UserListItem';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) { }

  findAll(): Observable<UserListItem[]>{
    return this._httpClient.get<UserListItem[]>(`${environment.apiUrl}api/users`);
  }

  findById(id: number): Observable<User>{
    return this._httpClient.get<User>(`${environment.apiUrl}api/user/${id}`);
  }


}
