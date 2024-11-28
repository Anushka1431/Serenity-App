import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminauthService {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };
    return this.http.post<any>(`${this.baseUrl}/login`, body, { headers });
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        return localStorage.getItem('token');
      } catch (e) {
        console.error('Error accessing localStorage', e);
        return null;
      }
    }
    return null;
  }

  saveToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('token', token);
      } catch (e) {
        console.error('Error accessing localStorage', e);
      }
    }
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.removeItem('token');
      } catch (e) {
        console.error('Error accessing localStorage', e);
      }
    }
  }
}
