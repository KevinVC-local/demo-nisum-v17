import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { ProductPagination } from '../interfaces/productPagination';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly baseApi = environment.apiPlatzi;
  private readonly httpClient = inject(HttpClient);

  constructor() { }

  getProductsPagination(offset = 0, limit = 10): Observable<ProductPagination[]>{
    return this.httpClient.get<ProductPagination[]>(`${this.baseApi}/products?offset=${offset}&limit=${limit}`);
  }
  
}
