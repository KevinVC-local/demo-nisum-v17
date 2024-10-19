import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {path: '', component: LayoutComponent,
    children: [
      {path: 'users', component: UsersComponent},
      {path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent)},
      {path: 'category', loadComponent: () => import('./pages/category/category.component').then(m => m.CategoryComponent)},
      {path: '', redirectTo: 'users', pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
