import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';  
  password: string = '';  
  errorMessage: string = '';  

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.authenticatorResponse(this.username, this.password).subscribe(
      (user) => {
        if (user) {
          sessionStorage.setItem('userId', user.id);
          this.router.navigate(['/list-client']);
        } else {
          this.showError('Login failed. Please check your credentials.');
        }
      },
      (error: any) => {
        console.error('Login error:', error);
        this.showError('An error occurred. Please try again later.');
      }
    );
  }

  showError(message: string) {
    this.errorMessage = message;
    setTimeout(() => this.errorMessage = '', 3000);  // Nascondi il messaggio dopo 3 secondi
  }
}
