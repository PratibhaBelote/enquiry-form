import { Routes } from '@angular/router';
import { Enquiry } from './enquiry/enquiry';
import { Admin } from './admin/admin';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', component: Enquiry },
  { path: 'login', component: Login },
  { path: 'admin', component: Admin }
];