
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppointmentService } from '../appointment.service';
import { MedicalRecordService } from '../medical-record.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { PdfserviceService } from '../pdfservice.service';
import { ExcelserviceService } from '../excelservice.service';
import { PatientService } from '../patient.service';
import { DocauthService } from '../docauth.service';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docdash',
  templateUrl: './docdash.component.html',
  styleUrls: ['./docdash.component.css']
})
export class DocdashComponent implements OnInit {
  patients: any[] = [];
  appointments: any[] = [];
  totalIncome: number = 0;
  todayIncome: number = 0;
  doctorName: string = '';
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Number of Patients';
  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#f889dc', '#f545c9', '#e81db5', ' #cb0599'] 
  };

  dateRangeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private medicalRecordService: MedicalRecordService,
    private patientService: PatientService,
    private pdfService: PdfserviceService,
    private excelService: ExcelserviceService,
    private docauthService: DocauthService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.dateRangeForm = this.formBuilder.group({
      start: [null],
      end: [null]
    });
  }

  ngOnInit(): void {
    this.fetchDoctorName();
    this.fetchAppointmentData();
    this.patientService.getPatientCountPerDay().subscribe(data => {
      const transformedData = Object.entries(data)
        .map(([date, count]) => ({
          name: date,
          value: count
        }))
        .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
      this.patients = transformedData;
    });
  }

  fetchDoctorName(): void {
    this.docauthService.getCurrentDoctor().subscribe(doctor => {
      this.doctorName = doctor.name;
    });
  }

  fetchAppointmentData(): void {
    this.appointmentService.getAppointmentCountPerDay().subscribe(data => {
      const transformedData = [{
        name: 'Appointments',
        series: Object.entries(data)
          .map(([date, count]) => ({
            name: new Date(date).toLocaleDateString(), 
            value: count
          }))
          .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())
      }];
      this.appointments = transformedData;
    });

    this.medicalRecordService.getTotalIncomeByDoctor().subscribe(income => {
      this.totalIncome = income;
    });

    this.medicalRecordService.getTodayIncomeByDoctor().subscribe(income => {
      this.todayIncome = income;
    });
  }

  applyDateRange(): void {
    const { start, end } = this.dateRangeForm.value;
    if (start && end) {
      this.filterAppointmentsByDateRange(start, end);
      this.filterPatientsByDateRange(start, end);
    }
  }

  filterAppointmentsByDateRange(start: Date, end: Date): void {
    this.appointmentService.getAppointmentCountPerDay().subscribe(data => {
      const filteredData = [{
        name: 'Appointments',
        series: Object.entries(data)
          .map(([date, count]) => ({
            name: new Date(date).toLocaleDateString(), 
            value: count
          }))
          .filter(item => {
            const itemDate = new Date(item.name);
            return itemDate >= start && itemDate <= end;
          })
          .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())
      }];
      this.appointments = filteredData;
    });
  }

  filterPatientsByDateRange(start: Date, end: Date): void {
    this.patientService.getPatientCountPerDay().subscribe(data => {
      const filteredData = Object.entries(data)
        .map(([date, count]) => ({
          name: date,
          value: count
        }))
        .filter(item => {
          const itemDate = new Date(item.name);
          return itemDate >= start && itemDate <= end;
        })
        .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
      this.patients = filteredData;
    });
  }

  public downloadPdf(): void {
    const pdfOptions = {
      quality: 'high',
      colorProfile: 'RGB'
    };
    this.pdfService.generatePdf('right-dash-content', pdfOptions);
  }

  public downloadExcel(): void {
    const data = [
      { label: 'Total Income', value: this.totalIncome },
      { label: "Today's Income", value: this.todayIncome },
      ...this.patients.map(patient => ({ label: `Patient Count on ${patient.name}`, value: patient.value })),
      ...(this.appointments.length > 0 ? 
          this.appointments[0].series.map((appointment: any) => ({
            label: `Appointments on ${appointment.name}`,
            value: appointment.value
          })) : [])
    ];
    this.excelService.exportToExcel(data, 'dashboard-data');
  }

  openChangePasswordDialog(): void {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: '400px'
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
