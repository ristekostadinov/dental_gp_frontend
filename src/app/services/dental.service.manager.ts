import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DentalService, DentalServiceDTO, DentalServiceRequest } from "../domains/DentalService";
import { Observable } from "rxjs";
import { environment } from "../../envinronments/environment";
import { PaginatedResponse } from "../domains/PaginatedResponse";

@Injectable({
  providedIn: 'root'
})
export class DentalServiceManager{
    constructor(
        private _httpClient: HttpClient
    ){
    }

    save(body: DentalServiceRequest){
      return this._httpClient.post<DentalServiceRequest>(`${environment.apiUrl}api/dental-services`,body)
    }
  
    findAll(page: number, size: number): Observable<PaginatedResponse<DentalServiceDTO>>{
      return this._httpClient.get<PaginatedResponse<DentalServiceDTO>>(`${environment.apiUrl}api/dental-services?page=${page}&size=${size}`);
    }
  
    findById(id: string): Observable<DentalService>{
      return this._httpClient.get<DentalService>(`${environment.apiUrl}api/dental-services/${id}`)
    }
  
    edit(id: string, body: DentalServiceRequest){
      return this._httpClient.put<DentalServiceRequest>(`${environment.apiUrl}api/dental-services/${id}`, body);
    }
  
    delete(id: string){
      return this._httpClient.delete<DentalService>(`${environment.apiUrl}api/dental-services/${id}`);
    }

}