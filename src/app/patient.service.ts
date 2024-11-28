import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from './patient';
import { DocauthService } from './docauth.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private httpClient:HttpClient,private docauthService: DocauthService) { }

  private baseUrl="http://localhost:8080/api/patient"

  getPatientList():Observable<Patient[]>{
    return this.httpClient.get<Patient[]>(`${this.baseUrl}`)
  }
  createPatient(patient: Patient): Observable<Patient> {
    return this.httpClient.post<Patient>(`${this.baseUrl}/insert`, patient);
  }

  getPatientById(id: number): Observable<Patient> {   
    return this.httpClient.get<Patient>(`${this.baseUrl}/${id}`);
  }

  updatePatient(id: number, patient: Patient): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/${id}`, patient);
  }

  deletePatient(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }
  getPatientCountPerDay(): Observable<any> {
    const token = this.docauthService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<any>(`${this.baseUrl}/patients/countPerDay`, { headers });
  }
}
