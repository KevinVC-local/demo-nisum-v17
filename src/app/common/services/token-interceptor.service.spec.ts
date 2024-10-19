import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { StorageManagerService } from './storage-manager.service';
import { LoginResponse } from '../../presentation/modules/auth/interfaces/login';
import authInterceptor from './token-interceptor.service';
import { runInInjectionContext } from '@angular/core';

describe('AuthInterceptor', () => {
  let storageManagerService: jasmine.SpyObj<StorageManagerService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const storageSpy = jasmine.createSpyObj('StorageManagerService', ['get', 'removeLocalAndSessionStorage']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: StorageManagerService, useValue: storageSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    storageManagerService = TestBed.inject(StorageManagerService) as jasmine.SpyObj<StorageManagerService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should add Authorization header if token is present and route is protected', (done) => {
    const mockToken: LoginResponse = { access_token: 'test-token', refresh_token: 'refresh_token' };
    storageManagerService.get.and.returnValue(mockToken);

    const request = new HttpRequest('GET', '/auth/user');
    const next = jasmine.createSpy('next').and.returnValue(of({} as HttpEvent<unknown>));

    // Ejecutamos el interceptor dentro de un contexto de inyección válido
    runInInjectionContext(TestBed, () => {
      authInterceptor(request, next).subscribe(() => {
        const modifiedRequest = next.calls.first().args[0] as HttpRequest<unknown>;
        expect(modifiedRequest.headers.get('Authorization')).toBe('Bearer test-token');
        done();
      });
    });
  });

  it('should handle 401 and 403 errors by clearing storage and redirecting to /auth', (done) => {
    const request = new HttpRequest('GET', '/auth/user');
    const next = jasmine.createSpy('next').and.returnValue(
      throwError(() => ({ status: 401 }))
    );

    runInInjectionContext(TestBed, () => {
      authInterceptor(request, next).subscribe({
        error: () => {
          expect(storageManagerService.removeLocalAndSessionStorage).toHaveBeenCalled();
          expect(router.navigate).toHaveBeenCalledWith(['/auth']);
          done();
        },
      });
    });
  });
});
