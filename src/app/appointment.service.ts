import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Appointment } from './appointment';
import { Observable, of} from 'rxjs';
import { TimeSlot } from './time-slot';
import { DocauthService } from './docauth.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private httpClient:HttpClient,private docauthService: DocauthService) { }

  private baseUrl="http://localhost:8080/api/appointment"

  getAllAppointments():Observable<Appointment[]>{
    return this.httpClient.get<Appointment[]>(`${this.baseUrl}`)
  }

  createAppointment(appointment: Appointment): Observable<Appointment> {
    const { appointmentID, ...rest } = appointment;
    return this.httpClient.post<Appointment>(`${this.baseUrl}/insert`, appointment);
  }
  deleteAppointment(id: number): Observable<Object> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);

  }
  getAppointmentsByDateAndDoctor(date: string, doctorID: string): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(`${this.baseUrl}/date/${date}/doctor/${doctorID}`)
      .pipe(catchError(this.handleError<Appointment[]>('getAppointmentsByDateAndDoctor', [])));
  }

  getAppointmentById(id: number): Observable<Appointment> {
    return this.httpClient.get<Appointment>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError<Appointment>('getAppointmentById')));
  }

  getAvailableTimeSlots(date: string, doctorID: string): Observable<TimeSlot[]> {
    const slots: TimeSlot[] = [
      { time: '09:00:00', booked: false, displayTime: this.formatTime('09:00:00') },
      { time: '10:00:00', booked: false, displayTime: this.formatTime('10:00:00') },
      { time: '11:00:00', booked: false, displayTime: this.formatTime('11:00:00') },
    ];

    return this.getAppointmentsByDateAndDoctor(date, doctorID).pipe(
      map(appointments => {
        appointments.forEach(appointment => {
          const slot = slots.find(slot => slot.time === appointment.appointmentTime);
          if (slot) {
            slot.booked = true;
          }
        });
        return slots;
      }),
      catchError(this.handleError<TimeSlot[]>('getAvailableTimeSlots', slots))
    );
  }

  private formatTime(time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const suffix = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${suffix}`;
  }
  getAppointmentCountPerDay(): Observable<any> {
    const token = this.docauthService.getToken();

    if (token) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });

      const options = { headers: headers };

      return this.httpClient.get<any>(`${this.baseUrl}/countPerDay`, options);
    } else {
      throw new Error('JWT token not found in localStorage');
    }
  }
  getMyAppointments(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(`${this.baseUrl}/myAppointments`);
  }
  getAppointmentsByDoctor(username: string): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(`${this.baseUrl}/doctor/${username}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
}
}