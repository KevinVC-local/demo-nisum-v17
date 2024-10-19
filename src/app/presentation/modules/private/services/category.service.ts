import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryList, CreateCategory, UpdateCategory } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly baseApi = environment.apiPlatzi;
  private readonly httpClient = inject(HttpClient);

  getAllCategories(): Observable<CategoryList[]> {
    return this.httpClient.get<CategoryList[]>(`${this.baseApi}/categories`);
  }

  createCategory(category: CreateCategory): Observable<CategoryList> {
    return this.httpClient.post<CategoryList>(`${this.baseApi}/categories`, category);
  }

  updateCategory(category: UpdateCategory, id: number): Observable<CategoryList> {
    return this.httpClient.put<CategoryList>(`${this.baseApi}/categories/${id}`, category);
  }

  deleteCategory(id: number): Observable<CategoryList> {
    return this.httpClient.delete<CategoryList>(`${this.baseApi}/categories/${id}`);
  }
}
