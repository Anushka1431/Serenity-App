import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { PatientService } from '../patient.service';
import { Patient } from '../patient';
import { MatSnackBar,MatSnackBarConfig } from '@angular/material/snack-bar';


@Component({
  selector: 'app-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.css']
})
export class UpdatePatientComponent implements OnInit {
  updatePatientForm: FormGroup;
  patientId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private snackBar: MatSnackBar
  ) {
    this.updatePatientForm = this.formBuilder.group({
      fname: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
      lname: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
      gender: ['', Validators.required],
      dateOfBirth: ['', [Validators.required, this.dateValidator]],
      bloodgroup: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit(): void {
    this.patientId = this.route.snapshot.params['id'];
    this.patientService.getPatientById(this.patientId).subscribe(
      data => {
        this.updatePatientForm.patchValue(data);
      },
      error => console.error(error)
    );
  }

  onSubmit(): void {
    if (this.updatePatientForm.valid) {
      this.patientService.updatePatient(this.patientId, this.updatePatientForm.value).subscribe(
        () => this.router.navigate(['/patientlist']),
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

  goToPatientList(): void {
    this.router.navigate(['/patientlist']);
  }

  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const today = new Date();
    if (control.value && new Date(control.value) > today) {
      return { max: true };
    }
    return null;
  }
}
