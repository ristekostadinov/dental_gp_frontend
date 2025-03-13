import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, CategoryDTO, CategoryRequest } from '../components/domains/Category';
import { Observable } from 'rxjs';
import { environment } from '../../envinronments/environment';
import { PaginatedResponse } from '../components/domains/PaginatedResponse';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _httpClient: HttpClient) { }

    save(body: CategoryRequest){
      return this._httpClient.post<CategoryRequest>(`${environment.apiUrl}api/categories`,body)
    }
  
    findAll(page: number, size: number): Observable<PaginatedResponse<CategoryDTO>>{
      return this._httpClient.get<PaginatedResponse<CategoryDTO>>(`${environment.apiUrl}api/categories?page=${page}&size=${size}`);
    }
  
    findById(id: string): Observable<Category>{
      return this._httpClient.get<Category>(`${environment.apiUrl}api/categories/${id}`)
    }
  
    edit(id: string, body: CategoryRequest){
      return this._httpClient.put<CategoryRequest>(`${environment.apiUrl}api/categories/${id}`, body);
    }
  
    delete(id: string){
      return this._httpClient.delete<Category>(`${environment.apiUrl}api/categories/${id}`);
    }
}
