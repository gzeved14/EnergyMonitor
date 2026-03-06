import { Component } from '@angular/core';
import { LoginHeader } from './components/login-header/login-header';
import { LoginFormComponent } from './components/login-form/login-form';

@Component({
  selector: 'app-login',
  imports: [LoginHeader, LoginFormComponent],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {}
