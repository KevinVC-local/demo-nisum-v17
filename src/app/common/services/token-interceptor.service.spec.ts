import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpRequest } from '@angular/common/http';

import { TokenInterceptorService } from './token-interceptor.service';
import { of } from 'rxjs';

describe('TokenInterceptorService', () => {
  let service: TokenInterceptorService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TokenInterceptorService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptorService,
          multi: true
        }
      ]
    });

    service = TestBed.inject(TokenInterceptorService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('intercept', () => {
    it('should add an Authorization header to the request if the route is protected', () => {
      service['protectedRoutes'] = ['protected'];
      const url = 'https://example.com/protected';
      const next: any = {
				handle: (request: HttpRequest<any>) => {
					expect(request.headers.get('Authorization')).toEqual('Bearer environment.token')
					return of({}) as any;
				},
			};
      service.intercept(new HttpRequest('GET', url), next).subscribe();
    });

    it('should not add an Authorization header to the request if the route is not protected', () => {
      service['protectedRoutes'] = ['protected'];
      const url = 'https://example.com/non-protected';
      const request = httpClient.get(url).subscribe();
      const httpRequest = httpMock.expectOne(url);
      expect(httpRequest.request.headers.has('Authorization')).toBe(false);
    });
  });

  describe('isRouteProtected', () => {
    it('should return true if the route is protected', () => {
      service['protectedRoutes'] = ['protected'];
      const url = 'https://example.com/protected';
      expect(service['isRouteProtected'](url)).toBe(true);
    });
  });
});