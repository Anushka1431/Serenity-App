import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AppointmentService } from '../appointment.service';
import { Appointment } from '../appointment';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  dataSource: MatTableDataSource<Appointment>;
  displayedColumns: string[] = ['appointmentID', 'patientName', 'contact', 'doctorName', 'appointmentDate', 'appointmentTime', 'status','action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private appointmentService: AppointmentService,private router: Router) {
    this.dataSource = new MatTableDataSource<Appointment>();
  }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments() {
    this.appointmentService.getMyAppointments().subscribe(data => {
      data.sort((a, b) => {
        if (a.status === b.status) {
          const dateA = new Date(a.appointmentDate + ' ' + a.appointmentTime);
          const dateB = new Date(b.appointmentDate + ' ' + b.appointmentTime);
          return dateA.getTime() - dateB.getTime(); // Sort by most recent first within same status
        } else if (a.status === 'Pending') {
          return -1; // Pending appointments come first
        } else {
          return 1; // Completed appointments come last
        }
      });

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  viewPatient(id: number) {
    this.router.navigate(['view-patient', id]);
  }
  diagnosePatient(id: number) {
    this.router.navigate(['diagnose-patient', id]);
  }
  deleteAppointment(id: number): void {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentService.deleteAppointment(id).subscribe(() => {
        this.getAppointments(); // Reload appointments after deletion
      });
    }
  }
  downloadExcel() {
    const filename = 'appointments.xlsx';
    const sheetName = 'Appointments';
    const excelData = this.dataSource.data.map(appointment => ({
      'Appointment ID': appointment.appointmentID,
      'Patient Name': appointment.patient?.fname,
      'Contact': appointment.patient?.contact,
      'Doctor Name': appointment.doctor?.name,
      'Appointment Date': appointment.appointmentDate,
      'Appointment Time': appointment.appointmentTime,
      'Status': appointment.status
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, filename);
  }
  goBack(): void {
    this.router.navigate(['/docdash']);
  }
}
