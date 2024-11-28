import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashComponent } from './admindash/admindash.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { HomeComponent } from './home/home.component';
import { DocdashComponent } from './docdash/docdash.component';
import { CreatePatientComponent } from './create-patient/create-patient.component';
import { DocloginComponent } from './doclogin/doclogin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { DiagnosePatientComponent } from './diagnose-patient/diagnose-patient.component';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';
import { UpdateDoctorComponent } from './update-doctor/update-doctor.component';
import { AdminAppointmentListComponent } from './admin-appointment-list/admin-appointment-list.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
const routes: Routes = [
  {path:'admin',component:AdmindashComponent},
  {path:'appointmentlist',component:AppointmentComponent},
  {path:'patientlist',component:PatientListComponent},
  {path:'doctorlist',component:DoctorListComponent},
  {path:'create-appointment',component:CreateAppointmentComponent},
  {path:'home',component:HomeComponent},
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'docdash',component:DocdashComponent},
  {path:'create-patient',component:CreatePatientComponent},
  {path: 'doclogin',component:DocloginComponent},
  {path: 'adminlogin',component:AdminloginComponent},
  {path: 'diagnose-patient/:appointmentID', component: DiagnosePatientComponent },
  {path: 'updatepatient/:id', component: UpdatePatientComponent },
  { path: '', redirectTo: '/appointmentlist', pathMatch: 'full' },
  { path: 'view-patient/:patientID', component: ViewPatientComponent },
  {path:'create-doctor',component:CreateDoctorComponent},
  {path: 'updatedoctor/:id', component: UpdateDoctorComponent },
  {path:'admin-appointment-list',component:AdminAppointmentListComponent},
  {path:'change-password-dialog',component:ChangePasswordDialogComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
