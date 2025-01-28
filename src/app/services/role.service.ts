import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../envinronments/environment';
import { Role } from '../components/domains/Role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private _httpClient: HttpClient) { }

  findAll(): Observable<Role[]>{
    return this._httpClient.get<Role[]>(`${environment.apiUrl}api/roles`);
  }
}
