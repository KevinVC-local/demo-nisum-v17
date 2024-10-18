import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserList } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly baseApi = environment.apiPlatzi;
  private readonly httpClient = inject(HttpClient);

  constructor() { }

  getAllUser(): Observable<UserList>{
    return this.httpClient.get<UserList>(`${this.baseApi}/users`);
  }

  getUserById(id: number): Observable<UserList>{
    return this.httpClient.get<UserList>(`${this.baseApi}/users/${id}`);
  }

  createUser(user: UserList): Observable<UserList>{
    return this.httpClient.post<UserList>(`${this.baseApi}/users`, user);
  }

  updateUser(user: UserList): Observable<UserList>{
    return this.httpClient.put<UserList>(`${this.baseApi}/users/${user.id}`, user);
  }

  validUniqueEmail(email: string): Observable<boolean>{
    return this.httpClient.post<boolean>(`${this.baseApi}/users/is-available`, {email});
  }

}
