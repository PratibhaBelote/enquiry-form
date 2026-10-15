
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-enquiry',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './enquiry.html',
  styleUrl: './enquiry.css'
})
export class Enquiry {
  constructor(private http: HttpClient) {}

  enquiry = {
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  };

  submitEnquiry(form: NgForm) {
    this.http.post(
      'http://localhost:3000/api/enquiries',
      this.enquiry
    ).subscribe({
      next: (response) => {
        alert('Enquiry submitted successfully!');

        form.resetForm({
          name: '',
          email: '',
          mobile: '',
          subject: '',
          message: ''
        });
      },
      error: (error) => {
        console.error('Submission error:', error);
        alert('Submission failed!');
      }
    });
  }
}
