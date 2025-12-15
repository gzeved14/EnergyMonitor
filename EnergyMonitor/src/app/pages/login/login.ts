import { Component } from '@angular/core';
import { LoginHeader } from './components/login-header/login-header'; // <--- 1. Importe o arquivo

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginHeader],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // ...
}
