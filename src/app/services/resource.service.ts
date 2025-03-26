import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResourceDTO, ResourceRequest, Resource } from '../components/domains/Resource';
import { environment } from '../../envinronments/environment';
import { PaginatedResponse } from '../components/domains/PaginatedResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResourceService {
  constructor(private _httpClient: HttpClient) {}

  save(body: ResourceRequest) {
    return this._httpClient.post<ResourceRequest>(
      `${environment.apiUrl}api/resources`,
      body
    );
  }

  findAll(
    page: number,
    size: number
  ): Observable<PaginatedResponse<ResourceDTO>> {
    return this._httpClient.get<PaginatedResponse<ResourceDTO>>(
      `${environment.apiUrl}api/resources?page=${page}&size=${size}`
    );
  }

  findById(id: string): Observable<Resource> {
    return this._httpClient.get<Resource>(
      `${environment.apiUrl}api/resources/${id}`
    );
  }

  edit(id: string, body: ResourceRequest) {
    return this._httpClient.put<ResourceRequest>(
      `${environment.apiUrl}api/resources/${id}`,
      body
    );
  }

  delete(id: string) {
    return this._httpClient.delete<Resource>(
      `${environment.apiUrl}api/resources/${id}`
    );
  }
}
