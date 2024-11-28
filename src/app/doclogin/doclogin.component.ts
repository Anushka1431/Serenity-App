import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DocauthService } from '../docauth.service';

@Component({
  selector: 'app-doclogin',
  templateUrl: './doclogin.component.html',
  styleUrls: ['./doclogin.component.css']
})
export class DocloginComponent {
  username: string = '';
  password: string = '';
  hidePassword: boolean = true;

  constructor(private docauthService: DocauthService, private router: Router) {}

  onSubmit() {
    this.docauthService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (typeof window !== 'undefined' && localStorage) {
          localStorage.setItem('token', response.token);
        }
        this.router.navigate(['/docdash']);
      },
      error: (err) => {
        console.error('Login failed', err);
      }
    });
  }
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
