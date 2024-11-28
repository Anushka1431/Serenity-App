import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Appointment } from './appointment';
import { AdminauthService } from './adminauth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService {
  private baseUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient, private adminauthService: AdminauthService) {}

  getAllAppointments(): Observable<Appointment[]> {
    const token = this.adminauthService.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Appointment[]>(`${this.baseUrl}/appointments`, { headers });
  }
}