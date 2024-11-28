import { AppointmentService } from '../appointment.service';
import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient.service';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { MedicalRecordService } from '../medical-record.service';
import { PdfserviceService } from '../pdfservice.service';
import { ExcelserviceService } from '../excelservice.service';
import { AdminserviceService } from '../adminservice.service';
import { DoctorService } from '../doctor.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import * as XLSX from 'xlsx';
import { map } from 'rxjs/operators';
import { Doctor } from '../doctor';
import { Appointment } from '../appointment';

interface ExcelData {
  [key: string]: string | number;
}

interface ForkJoinResult {
  doctor: Doctor;
  appointments: Appointment[];
  totalIncome: number;
  todayIncome: number;
}

@Component({
  selector: 'app-admindash',
  templateUrl: './admindash.component.html',
  styleUrls: ['./admindash.component.css']
})
export class AdmindashComponent implements OnInit {
  patients: any[] = [];
  appointments: any[] = [];
  totalIncome: number = 0;
  todayIncome: number = 0;
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
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private medicalRecordService: MedicalRecordService,
    private pdfService: PdfserviceService,
    private excelService: ExcelserviceService,
    private adminService: AdminserviceService,
    private doctorService: DoctorService,
    private fb: FormBuilder
  ) {
    this.dateRangeForm = this.fb.group({
      start: [null],
      end: [null]
    });
  }

  ngOnInit(): void {
    this.patientService.getPatientCountPerDay().subscribe(data => {
      const transformedData = Object.entries(data)
        .map(([date, count]) => ({
          name: date,
          value: count
        }))
        .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
      this.patients = transformedData;
    });
    this.adminService.getAllAppointments().subscribe(data => {
      const transformedData = [{
        name: 'Appointments',
        series: data
          .map(appointment => ({
            name: new Date(appointment.appointmentDate).toLocaleDateString(),
            value: appointment.appointmentID
          }))
          .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())
      }];
      this.appointments = transformedData;
    });

    this.medicalRecordService.getTotalIncome().subscribe(income => {
      this.totalIncome = income;
    });

    this.medicalRecordService.getTodayIncome().subscribe(income => {
      this.todayIncome = income;
    });
  }

  applyDateRange(): void {
    const startDate = this.dateRangeForm.value.start;
    const endDate = this.dateRangeForm.value.end;

    if (startDate && endDate) {
      // Filter the appointments based on the selected date range
      this.appointmentService.getAllAppointments().subscribe(data => {
        const filteredData = data.filter(appointment => {
          const appointmentDate = new Date(appointment.appointmentDate);
          return appointmentDate >= startDate && appointmentDate <= endDate;
        });

        const transformedData = [{
          name: 'Appointments',
          series: filteredData
            .map(appointment => ({
              name: new Date(appointment.appointmentDate).toLocaleDateString(),
              value: appointment.appointmentID
            }))
            .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())
        }];
        this.appointments = transformedData;
      });
    }
  }

  public downloadPdf(): void {
    const pdfOptions = {
      quality: 'high',
      colorProfile: 'RGB'
    };
    this.pdfService.generatePdf('right-dash-content', pdfOptions);
  }

  public downloadExcel(): void {
    this.doctorService.getDoctorList().subscribe(doctors => {
      const requests: Observable<ForkJoinResult>[] = doctors.map(doctor => {
        return forkJoin({
          appointments: this.appointmentService.getAppointmentsByDoctor(doctor.username),
          totalIncome: this.medicalRecordService.getTotalIncomeByDoctor(),
          todayIncome: this.medicalRecordService.getTodayIncomeByDoctor()
        }).pipe(
          map(result => ({
            doctor,
            appointments: result.appointments,
            totalIncome: result.totalIncome,
            todayIncome: result.todayIncome
          }))
        );
      });

      forkJoin(requests).subscribe((results: ForkJoinResult[]) => {
        const excelData: ExcelData[] = [];
        results.forEach(result => {
          excelData.push({ label: `Doctor: ${result.doctor.name}`, value: '' });
          excelData.push({ label: `Total Income: ${result.totalIncome}`, value: '' });
          excelData.push({ label: `Today's Income: ${result.todayIncome}`, value: '' });
          excelData.push(...result.appointments.map(appointment => ({
            'Appointment ID': appointment.appointmentID,
            'Patient Name': appointment.patient?.fname || '',
            'Contact': appointment.patient?.contact || '',
            'Doctor Name': appointment.doctor?.name || '',
            'Appointment Date': new Date(appointment.appointmentDate).toLocaleDateString(), 
            'Appointment Time': appointment.appointmentTime,
            'Status': appointment.status
          })));
          excelData.push({ label: '', value: '' }); 
        });

        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Appointments');
        XLSX.writeFile(wb, 'appointments_by_doctor.xlsx');
      });
    });
  }
}
