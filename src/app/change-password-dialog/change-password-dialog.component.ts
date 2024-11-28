
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DocauthService } from '../docauth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.css']
})
export class ChangePasswordDialogComponent {
  changePasswordForm: FormGroup;
  hideOldPassword = true;
  hideNewPassword = true;
  hideConfirmNewPassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private docauthService: DocauthService,
    private snackBar: MatSnackBar
  ) {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const { oldPassword, newPassword, confirmNewPassword } = this.changePasswordForm.value;
      if (newPassword !== confirmNewPassword) {
        this.snackBar.open('New passwords do not match', 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
        return;
      }

      this.docauthService.getCurrentDoctor().subscribe(
        doctor => {
          const request = {
            username: doctor.username,
            oldPassword,
            newPassword
          };

          this.docauthService.changePassword(request).subscribe(
            () => {
              this.snackBar.open('Password changed successfully', 'Close', {
                duration: 3000,
                verticalPosition: 'top'
              });
              this.dialogRef.close();
            },
            error => {
              this.snackBar.open('Error changing password', 'Close', {
                duration: 3000,
                verticalPosition: 'top'
              });
            }
          );
        }
      );
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  togglePasswordVisibility(field: string): void {
    if (field === 'oldPassword') {
      this.hideOldPassword = !this.hideOldPassword;
    } else if (field === 'newPassword') {
      this.hideNewPassword = !this.hideNewPassword;
    } else if (field === 'confirmNewPassword') {
      this.hideConfirmNewPassword = !this.hideConfirmNewPassword;
    }
  }
}
