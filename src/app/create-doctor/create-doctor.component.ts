import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { Doctor } from '../doctor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-doctor',
  templateUrl: './create-doctor.component.html',
  styleUrls: ['./create-doctor.component.css']
})
export class CreateDoctorComponent implements OnInit {
  doctorForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private doctorService: DoctorService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.doctorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z\\s]+$')]],
      specialization: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
      username: ['', [Validators.required, Validators.maxLength(20), Validators.pattern('^[a-zA-Z0-9]+$')]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit(): void {}

  saveDoctor(): void {
    if (this.doctorForm.valid) {
      const newDoctor: Doctor = this.doctorForm.value;

      this.doctorService.createDoctor(newDoctor).subscribe(
        data => {
          console.log(data);
          this.goToDoctorList();
        },
        error => {
          if (error.status === 409) {
            const config = new MatSnackBarConfig();
            config.duration = 5000;
            config.verticalPosition = 'top';
            config.panelClass = ['custom-snackbar'];
            this.snackBar.open('Duplicate entry alert: A doctor with the same username and contact number already exists.', 'Close', config);
          } else {
            console.error(error);
          }
        }
      );
    }
  }

  goToDoctorList() {
    this.router.navigate(['/doctorlist']);
  }

  onSubmit() {
    console.log(this.doctorForm.value);
    this.saveDoctor();
  }
}
