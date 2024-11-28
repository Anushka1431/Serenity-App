import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminauthService } from '../adminauth.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  hidePassword: boolean = true;

  constructor(private adminauthService: AdminauthService, private router: Router) {}

  login(): void {
    this.adminauthService.login(this.username, this.password).subscribe(
      response => {
        this.adminauthService.saveToken(response.token);
        this.router.navigate(['/admin']);
      },
      error => {
        this.errorMessage = 'Invalid username or password';
      }
    );
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
