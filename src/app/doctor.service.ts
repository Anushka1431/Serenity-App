import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Doctor } from './doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private httpClient: HttpClient) { }
  private baseUrl = "http://localhost:8080/api/doctor";

  getDoctorList(): Observable<Doctor[]> {
    return this.httpClient.get<Doctor[]>(`${this.baseUrl}`);
  }
  createDoctor(doctor: Doctor): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/insert`, doctor);
  }

  updateDoctor(id: number, doctor: Doctor): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, doctor);
  }

  deleteDoctor(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
  getDoctorById(id: number): Observable<Doctor> {
    return this.httpClient.get<Doctor>(`${this.baseUrl}/${id}`)
     
  }
}
