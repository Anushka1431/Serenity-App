import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../patient.service';
import { MedicalRecordService } from '../medical-record.service';
import { Patient } from '../patient';
import { MedicalRecord } from '../medical-record';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.css']
})
export class ViewPatientComponent implements OnInit {
  patientID!: number;
  patient: Patient | null = null;
  medicalRecords: MedicalRecord[] = [];

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private medicalRecordService: MedicalRecordService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.patientID = +params['patientID'];
      this.loadPatientDetails();
      this.loadMedicalRecords();
    });
  }

  loadPatientDetails(): void {
    this.patientService.getPatientById(this.patientID).subscribe(data => {
      this.patient = data;
    });
  }

  loadMedicalRecords(): void {
    this.medicalRecordService.getMedicalRecordsByPatientId(this.patientID).subscribe(data => {
      this.medicalRecords = data;
    });
  }
}
