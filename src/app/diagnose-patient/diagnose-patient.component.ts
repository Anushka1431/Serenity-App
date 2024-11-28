import { Component, OnInit } from '@angular/core';
import { Appointment } from '../appointment';
import { MedicalRecord } from '../medical-record';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MedicalRecordService } from '../medical-record.service';
import { AppointmentService } from '../appointment.service';
import { Patient } from '../patient';

@Component({
  selector: 'app-diagnose-patient',
  templateUrl: './diagnose-patient.component.html',
  styleUrls: ['./diagnose-patient.component.css']
})
export class DiagnosePatientComponent implements OnInit {
  appointmentID: number;
  appointment!: Appointment;
  patient: Patient | null = null;
  medicalRecord: MedicalRecord = {
    diagnosis: '',
    medications: '',
    treatment: '',
    appointment: {
      appointmentID: 0
    },
    payment:0,
    
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medicalRecordService: MedicalRecordService,
    private appointmentService: AppointmentService
  ) { 
    this.appointmentID = +this.route.snapshot.params['id']; // Ensure it's a number
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.appointmentID = +params['appointmentID'];
    this.loadAppointmentDetails();
    this.loadMedicalRecord();
  });}

  loadAppointmentDetails(): void {
    this.appointmentService.getAppointmentById(this.appointmentID).subscribe(data => {
      this.appointment = data;
      this.medicalRecord.appointment = this.appointment;
      this.patient = this.appointment.patient;
    });
  }

  loadMedicalRecord(): void {
    this.medicalRecordService.getMedicalRecordByAppointmentID(this.appointmentID).subscribe(data => {
      if (data) {
        this.medicalRecord = data;
      }
    });
  }

  onSubmit(): void {
    this.medicalRecordService.createMedicalRecord(this.medicalRecord).subscribe(data => {
      console.log('Medical record created:', data);
      this.router.navigate(['admin-appointment-list']);
    });
  }
}
