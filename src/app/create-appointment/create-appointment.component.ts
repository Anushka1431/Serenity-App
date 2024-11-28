
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment.service';
import { PatientService } from '../patient.service';
import { DoctorService } from '../doctor.service';
import { Patient } from '../patient';
import { Doctor } from '../doctor';
import { TimeSlot } from '../time-slot';

@Component({
  selector: 'app-create-appointment',
  templateUrl: './create-appointment.component.html',
  styleUrls: ['./create-appointment.component.css']
})
export class CreateAppointmentComponent implements OnInit {
  patients: Patient[] = [];
  doctors: Doctor[] = [];
  timeSlots: TimeSlot[] = [];
  selectedTimeSlot!: TimeSlot;
  appointmentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router,
    private patientService: PatientService,
    private doctorService: DoctorService
  ) {
    this.appointmentForm = this.formBuilder.group({
      patientID: ['', Validators.required],
      doctorID: ['', Validators.required],
      appointmentDate: ['', [Validators.required, this.dateValidator]],
      appointmentTime: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPatients();
    this.loadDoctors();
    this.appointmentForm.get('doctorID')?.valueChanges.subscribe(() => {
      this.timeSlots = [];
      this.appointmentForm.get('appointmentTime')?.reset();
    });
  }

  loadPatients(): void {
    this.patientService.getPatientList().subscribe(data => {
      this.patients = data;
    });
  }

  loadDoctors(): void {
    this.doctorService.getDoctorList().subscribe(data => {
      this.doctors = data;
    });
  }

  onDateChange(event: any): void {
    const date = this.formatDate(event.value);
    const doctorID = this.appointmentForm.get('doctorID')?.value;
    if (doctorID) {
      this.appointmentForm.get('appointmentDate')?.setValue(new Date(event.value));
      this.appointmentService.getAvailableTimeSlots(date, doctorID).subscribe(slots => {
        this.timeSlots = slots;
        this.fetchBookedAppointments(date, doctorID);
      });
    }
  }

  fetchBookedAppointments(date: string, doctorID: string): void {
    this.appointmentService.getAppointmentsByDateAndDoctor(date, doctorID).subscribe(appointments => {
      appointments.forEach(appointment => {
        const slot = this.timeSlots.find(slot => slot.time === appointment.appointmentTime);
        if (slot) {
          slot.booked = true;
        }
      });
    });
  }

  selectTimeSlot(slot: TimeSlot): void {
    this.selectedTimeSlot = slot;
    this.appointmentForm.get('appointmentTime')?.setValue(slot.time);
    console.log('Selected time slot:', slot);
  }

  saveAppointment(): void {
    if (this.appointmentForm.valid) {
      const appointment = this.appointmentForm.value;
      this.appointmentService.createAppointment(appointment).subscribe(
        data => {
          console.log(data);
          this.goToAppointmentList();
        },
        error => console.log(error)
      );
    }
  }

  goToAppointmentList(): void {
    this.router.navigate(['admin-appointment-list']);
  }

  onSubmit(): void {
    console.log(this.appointmentForm.value);
    this.saveAppointment();
  }

  private formatDate(date: string): string {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const today = new Date();
    if (control.value && new Date(control.value) < today) {
      return { min: true };
    }
    return null;
  }
}
