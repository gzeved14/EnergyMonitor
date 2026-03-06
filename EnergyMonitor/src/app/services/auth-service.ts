import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authStorageKey = 'auth';
  private readonly router = inject(Router);

  isAuthenticated = signal<boolean>(this.initializeAuthState());

  private initializeAuthState(): boolean {
    return localStorage.getItem(this.authStorageKey) === 'true';
  }

  login(): void {
    this.isAuthenticated.set(true);
    localStorage.setItem(this.authStorageKey, 'true');
    this.router.navigate(['home']);
  }

  logout(): void {
    this.isAuthenticated.set(false);
    localStorage.removeItem(this.authStorageKey);
    this.router.navigate(['']);
  }
}
