import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/layout/layout.component';

const routes: Routes = [
  {path: '', component: LayoutComponent,
    children: [
      {path: 'users', loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent)},
      {path: 'products', loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent)},
      {path: '', redirectTo: 'users', pathMatch: 'full'},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
