import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/dataUser';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly baseApi = environment.apiPlatzi;
  private readonly httpClient = inject(HttpClient);
  public user = new BehaviorSubject<User>({} as User);

  constructor() { }

  getDataClient(): Observable<User>{
    return this.httpClient.get<User>(`${this.baseApi}/auth/profile`);
  }

  setDataClient(data: User) {
    this.user.next(data);
  }
}
