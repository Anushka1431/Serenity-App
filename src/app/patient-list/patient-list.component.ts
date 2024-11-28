
import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from '../patient';
import { PatientService } from '../patient.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExcelserviceService } from '../excelservice.service'; // Import ExcelserviceService

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {
  displayedColumns: string[] = ['patientID', 'fname', 'lname', 'gender', 'dateOfBirth', 'bloodgroup', 'contact', 'action'];
  patients!: MatTableDataSource<Patient>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private patientService: PatientService, private router: Router, private excelService: ExcelserviceService) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatientList().subscribe(data => {
      this.patients = new MatTableDataSource(data);
      this.patients.paginator = this.paginator;
      this.patients.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.patients.filter = filterValue.trim().toLowerCase();
  }

  updatePatient(id: number): void {
    this.router.navigate(['update-patient', id]);
  }

  deletePatient(id: number): void {
    this.patientService.deletePatient(id).subscribe(data => {
      console.log(data);
      this.getPatients();
    });
  }

  downloadExcel(): void {
    const data = this.patients.data.map(patient => ({
      'Patient ID': patient.patientID,
      'First Name': patient.fname,
      'Last Name': patient.lname,
      'Gender': patient.gender,
      'Date of Birth': new Date(patient.dateOfBirth).toLocaleDateString(),
      'Blood Group': patient.bloodgroup,
      'Contact': patient.contact
    }));
    this.excelService.exportToExcel(data, 'patient-list');
  }
  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
