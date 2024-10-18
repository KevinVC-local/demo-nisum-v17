import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { StorageManagerService } from './storage-manager.service';
import { LoginResponse } from '../../presentation/modules/auth/interfaces/login';
import { Router } from '@angular/router';

const isRouteProtected = (url: string, arrayRoutes: string[]): boolean => {
  return arrayRoutes.some((route) => url.includes(route));
}

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {

  const protectedRoutes = ['/auth', '/users', '/products'];
  const storageManagerService = inject(StorageManagerService);
  const authToken = storageManagerService.get<LoginResponse>('tokenUser');
  const router = inject(Router);

  if (isRouteProtected(request.url, protectedRoutes)) {
    if (authToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken?.access_token}`,
        },
      });
    }
  }

  return next(request).pipe(
    catchError((error) => {
      const CODES_STATUS = [401, 403];

      if (CODES_STATUS.includes(error.status)) {
        storageManagerService.removeLocalAndSessionStorage();
        router.navigate(['/auth']);
      }

      return throwError(() => error);
    }),
  );
};

export default authInterceptor;