import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { DocauthService } from './docauth.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
import { AdmindashComponent } from './admindash/admindash.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { CreateAppointmentComponent } from './create-appointment/create-appointment.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { DocdashComponent } from './docdash/docdash.component';
import { CreatePatientComponent } from './create-patient/create-patient.component';
import { DocloginComponent } from './doclogin/doclogin.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UpdatePatientComponent } from './update-patient/update-patient.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { DiagnosePatientComponent } from './diagnose-patient/diagnose-patient.component';
import { ViewPatientComponent } from './view-patient/view-patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { Tokeninterceptor } from './tokeninterceptor';
//import { BaseChartDirective } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { CreateDoctorComponent } from './create-doctor/create-doctor.component';
import { UpdateDoctorComponent } from './update-doctor/update-doctor.component';
import { AdminAppointmentListComponent } from './admin-appointment-list/admin-appointment-list.component';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material/dialog';
 

@NgModule({
  declarations: [
    AppComponent,
    AdmindashComponent,
    AppointmentComponent,
    CreateAppointmentComponent,
    HomeComponent,
    DocdashComponent,
    CreatePatientComponent,
    DocloginComponent,
    AdminloginComponent,
    UpdatePatientComponent,
    DiagnosePatientComponent,
    
    ViewPatientComponent,
    PatientListComponent,
    DoctorListComponent,
    CreateDoctorComponent,
    UpdateDoctorComponent,
    AdminAppointmentListComponent,
    ChangePasswordDialogComponent,
   


    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatSnackBarModule,
    //BaseChartDirective,
    NgxChartsModule,
    MatExpansionModule,
    MatMenuModule,
    MatDialogModule
    
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    DocauthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Tokeninterceptor,
      multi: true
    }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
