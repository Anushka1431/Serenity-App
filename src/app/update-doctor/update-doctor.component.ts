import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Doctor } from '../doctor';

@Component({
  selector: 'app-update-doctor',
  templateUrl: './update-doctor.component.html',
  styleUrls: ['./update-doctor.component.css']
})
export class UpdateDoctorComponent implements OnInit {
  updateDoctorForm: FormGroup;
  doctorId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private doctorService: DoctorService,
    private snackBar: MatSnackBar
  ) {
    this.updateDoctorForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      specialization: ['', [Validators.required, Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.maxLength(20)]],
      password: ['', [Validators.maxLength(20)]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }

  ngOnInit(): void {
    this.doctorId = this.route.snapshot.params['id'];
    this.loadDoctorDetails();
  }

  loadDoctorDetails(): void {
    this.doctorService.getDoctorById(this.doctorId).subscribe(
      (data: Doctor) => {
        this.updateDoctorForm.patchValue({
          name: data.name,
          specialization: data.specialization,
          username: data.username,
          contact: data.contact,
          // Note: Password is not pre-filled for security reasons
        });
      },
      error => console.error(error)
    );
  }

  onSubmit(): void {
    if (this.updateDoctorForm.valid) {
      this.doctorService.updateDoctor(this.doctorId, this.updateDoctorForm.value).subscribe(
        () => this.router.navigate(['/doctorlist']),
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

  goToDoctorList(): void {
    this.router.navigate(['/doctorlist']);
  }
}
