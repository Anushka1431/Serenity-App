import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocauthService {

  private loginUrl = 'http://localhost:8080/api/auth/login'; // Adjust the URL as needed
  private changePasswordUrl = 'http://localhost:8080/api/auth/change-password';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };
    return this.http.post<any>(this.loginUrl, body, { headers });
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && localStorage) {
      return localStorage.getItem('token');
    }
    return null;
  }

  getDocauthHeaders(): HttpHeaders {
    let token = '';
    if (typeof window !== 'undefined' && localStorage) {
      token = localStorage.getItem('token') || '';
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getCurrentDoctor(): Observable<any> {
    const headers = this.getDocauthHeaders();
    return this.http.get<any>('http://localhost:8080/api/auth/current-doctor', { headers });
  }

  changePassword(request: { username: string; oldPassword: string; newPassword: string }): Observable<any> {
    const headers = this.getDocauthHeaders();
    return this.http.post(this.changePasswordUrl, request, { headers, responseType: 'text' as 'json' });
  }
}
