import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest, LoginResponse } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseApi = environment.apiPlatzi;
  private readonly httpClient = inject(HttpClient);

  constructor() { }

  goToLogin(dataLogin: LoginRequest): Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(`${this.baseApi}/auth/login`, dataLogin);
  }
  
}
