import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EditUserRequest, User, UserDTO } from '../components/domains/User';
import { environment } from '../../envinronments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _httpClient: HttpClient) { }

  findAll(): Observable<UserDTO[]>{
    return this._httpClient.get<UserDTO[]>(`${environment.apiUrl}api/users`);
  }

  findById(id: string): Observable<User>{
    return this._httpClient.get<User>(`${environment.apiUrl}api/users/${id}`);
  }

  update(id: string, body: EditUserRequest){
    return this._httpClient.put<EditUserRequest>(`${environment.apiUrl}api/users/${id}`, body);
  }

  delete(id: string){
    return this._httpClient.delete<User>(`${environment.apiUrl}api/users/${id}`);
  }
}
