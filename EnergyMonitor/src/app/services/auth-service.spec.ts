import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { vi } from 'vitest';

import { AuthService } from './auth-service';

describe('AuthService', () => {
  let service: AuthService;
  let routerNavigateSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    localStorage.clear();
    routerNavigateSpy = vi.fn();

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: { navigate: routerNavigateSpy },
        },
      ],
    });

    service = TestBed.inject(AuthService);
  });

  it('should initialize as unauthenticated when auth is missing', () => {
    expect(service.isAuthenticated()).toBeFalsy();
  });

  it('should initialize as authenticated when auth is true in storage', () => {
    TestBed.resetTestingModule();
    localStorage.setItem('auth', 'true');

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: { navigate: vi.fn() },
        },
      ],
    });

    const initializedService = TestBed.inject(AuthService);

    expect(initializedService.isAuthenticated()).toBeTruthy();
  });

  it('should login and persist auth state', () => {
    service.login();

    expect(service.isAuthenticated()).toBeTruthy();
    expect(localStorage.getItem('auth')).toBe('true');
    expect(routerNavigateSpy).toHaveBeenCalledWith(['home']);
  });

  it('should logout and clear auth state', () => {
    service.login();
    service.logout();

    expect(service.isAuthenticated()).toBeFalsy();
    expect(localStorage.getItem('auth')).toBeNull();
    expect(routerNavigateSpy).toHaveBeenCalledWith(['']);
  });
});
