import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MedicalRecord } from './medical-record';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {
  private baseUrl = 'http://localhost:8080/api/medicalrecords';

  constructor(private http: HttpClient) { }

  getMedicalRecordsByPatientId(patientID: number): Observable<MedicalRecord[]> {
    return this.http.get<MedicalRecord[]>(`${this.baseUrl}/patient/${patientID}`);
  }

  createMedicalRecord(medicalRecord: MedicalRecord): Observable<MedicalRecord> {
    return this.http.post<MedicalRecord>(`${this.baseUrl}/insert`, medicalRecord);
  }
  getMedicalRecordByAppointmentID(appointmentID: number): Observable<MedicalRecord> {
    return this.http.get<MedicalRecord>(`${this.baseUrl}/appointment/${appointmentID}`);
  }
  getTotalIncome(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/totalIncome`);
  }

  getTodayIncome(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/todayIncome`);
  }
  getTotalIncomeByDoctor(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/totalIncomeByDoctor`);
  }

  getTodayIncomeByDoctor(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/todayIncomeByDoctor`);
  }
  
}
