import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment, AppointmentDTO, AppointmentRequest } from '../components/domains/Appointment';
import { environment } from '../../envinronments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private _httpClient: HttpClient) { }

  save(body: AppointmentRequest): Observable<AppointmentRequest>{
    return this._httpClient.post(`${environment.apiUrl}api/appointments`,body);
  }

  findAll(): Observable<AppointmentDTO[]>{
    return this._httpClient.get<AppointmentDTO[]>(`${environment.apiUrl}api/appointments`)
  }

  findById(id: string): Observable<Appointment>{
    return this._httpClient.get<Appointment>(`${environment.apiUrl}api/appointments/${id}`)
  }

  edit(id: string, body: AppointmentRequest): Observable<AppointmentRequest>{
    return this._httpClient.put<AppointmentRequest>(`${environment.apiUrl}api/appointments/${id}`,body)
  }

  delete(id: string): Observable<Appointment>{
    return this._httpClient.delete<Appointment>(`${environment.apiUrl}api/appointments/${id}`);
  }
}
