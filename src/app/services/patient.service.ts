import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../envinronments/environment';
import { PatientDTO, Patient, PatientRequest } from '../components/domains/Patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private _httpClient: HttpClient) { }

  save(body: PatientRequest){
    return this._httpClient.post<PatientRequest>(`${environment}api/patients`,body)
  }

  findAll(): Observable<PatientDTO[]>{
    return this._httpClient.get<PatientDTO[]>(`${environment.apiUrl}api/patients`)
  }

  findById(id: string){
    return this._httpClient.get<Patient>(`${environment}api/patients/${id}`)
  }

  edit(id: string, body: PatientRequest){
    return this._httpClient.put<PatientRequest>(`${environment}api/patients/${id}`, body);
  }

  delete(id: string){
    return this._httpClient.delete<Patient>(`${environment.apiUrl}api/patients/${id}`);
  }

  patch(){

  }
}
