import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocationDTO } from '../domains/Location';
import { PaginatedResponse } from '../domains/PaginatedResponse';
import { Observable } from 'rxjs';
import { environment } from '../../envinronments/environment';
@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private _httpClient: HttpClient) { }

  findAll(page: number, size: number): Observable<PaginatedResponse<LocationDTO>> {
    return this._httpClient.get<PaginatedResponse<LocationDTO>>(`${environment.apiUrl}api/locations?page=${page}&size=${size}`);
  }

  findById(id: string): Observable<LocationDTO> {
    return this._httpClient.get<LocationDTO>(`${environment.apiUrl}api/locations/${id}`);
  }
}
