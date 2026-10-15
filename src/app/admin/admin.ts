
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin implements OnInit {
  enquiries: any[] = [];
  loading = true;
  errorMessage = '';

  constructor(private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit() {
    console.log('Admin component loaded');

    this.loading = true;
    this.errorMessage = '';

    this.http.get<any[]>(
      'https://enquiry-backend-lm21.onrender.com/api/enquiries',
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('adminToken') || ''}`
        }
      }
    )
      .subscribe({
        next: (data) => {
          console.log('API data:', data);

          this.enquiries = data;
          this.loading = false;

          this.cdr.detectChanges();

          console.log('Enquiry count:', this.enquiries.length);
        },
        error: (error) => {
          console.error('API Error:', error);
          this.errorMessage = 'Unable to load enquiries.';
          this.loading = false;
        }
      });
  }

}
