import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../patient.service';
import { Patient } from '../patient';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {
  patientForm: FormGroup;
  patients: Patient[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private patientService: PatientService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.patientForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z\\s]+$')]],
      lname: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z\\s]+$')]],
      gender: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, this.dateValidator]],
      bloodgroup: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit(): void {}

  savePatient(): void {
    if (this.patientForm.valid) {
      const newPatient: Patient = this.patientForm.value;

      this.patientService.createPatient(newPatient).subscribe(
        data => {
          console.log(data);
          this.goToPatientList();
        },
        error => {
          if (error.status === 409) {
            const config = new MatSnackBarConfig();
            config.duration = 5000;
            config.verticalPosition = 'top';
            config.panelClass = ['custom-snackbar'];
            this.snackBar.open('Duplicate entry alert: A patient with the same birthdate and contact number already exists.', 'Close', config);
          } else {
            console.error(error);
          }
        }
      );
    }
  }

  goToPatientList() {
    this.router.navigate(['/patientlist']);
  }

  onSubmit() {
    console.log(this.patientForm.value);
    this.savePatient();
  }

  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const today = new Date();
    if (control.value && new Date(control.value) > today) {
      return { max: true };
    }
    return null;
  }
}
