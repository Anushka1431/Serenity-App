import { Component, OnInit, ViewChild } from '@angular/core';
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExcelserviceService } from '../excelservice.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {
  displayedColumns: string[] = ['doctorID', 'name', 'specialization', 'contact', 'action'];
  doctors!: MatTableDataSource<Doctor>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private doctorService: DoctorService, private router: Router, private excelService: ExcelserviceService) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors(): void {
    this.doctorService.getDoctorList().subscribe(data => {
      this.doctors = new MatTableDataSource(data);
      this.doctors.paginator = this.paginator;
      this.doctors.sort = this.sort;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.doctors.filter = filterValue.trim().toLowerCase();
  }

  updateDoctor(id: number): void {
    this.router.navigate(['update-doctor', id]);
  }

  deleteDoctor(id: number): void {
    if (confirm('Are you sure you want to delete this doctor?')) {
      this.doctorService.deleteDoctor(id).subscribe(() => {
        this.getDoctors();
      });
    }
  }
  

  downloadExcel(): void {
    const data = this.doctors.data.map(doctor => ({
      'Doctor ID': doctor.doctorID,
      'Name': doctor.name,
      'Specialization': doctor.specialization,
      'Contact': doctor.contact
    }));

    this.excelService.exportToExcel(data, 'doctors-list');
  }
  goBack(): void {
    this.router.navigate(['/admin']);
  }
}
