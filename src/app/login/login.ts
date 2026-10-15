import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {
    this.errorMessage = '';

    this.http.post<any>(
      'http://localhost:3000/api/admin/login',
      {
        username: this.username,
        password: this.password
      }
    ).subscribe({
      next: (response) => {
        if (response.success && response.token) {
          sessionStorage.setItem('adminToken', response.token);
          this.router.navigate(['/admin']);
        }
      },
      error: (error) => {
        this.errorMessage =
          error.error?.message || 'Login failed. Please try again.';
      }
    });
  }
}
