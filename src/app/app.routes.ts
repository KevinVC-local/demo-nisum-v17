import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', loadChildren: () => import('./presentation/modules/public/public.module').then(m => m.PublicModule)},
    {path: 'dashboard', loadChildren: () => import('./presentation/modules/private/private.module').then(m => m.PrivateModule)},
    { path: 'auth', loadChildren: () => import('./presentation/modules/auth/auth.module').then(m => m.AuthModule) },
    {path: '', redirectTo: 'home', pathMatch: 'full'}
];
