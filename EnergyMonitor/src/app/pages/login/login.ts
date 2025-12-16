import { Component } from '@angular/core';
import { LoginHeader } from './components/login-header/login-header'; // <--- 1. Importe o arquivo
import { LoginFormComponent } from './components/login-form/login-form';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginHeader, LoginFormComponent],
  template: `<app-login-header></app-login-header>
             <app-login-form></app-login-form>
             <p>login works!</p>`,
  styleUrls: ['./login.css'],
})
export class Login {
  // ...
}
