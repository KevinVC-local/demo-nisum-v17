import { Routes } from '@angular/router';
import { authGuard } from './presentation/guards/auth.guard';

export const routes: Routes = [
    {path: '', loadChildren: () => import('./presentation/modules/public/public.module').then(m => m.PublicModule)},
    {path: 'dashboard', 
        loadChildren: () => import('./presentation/modules/private/private.module').then(m => m.PrivateModule),
        canActivate: [authGuard],
    },
    { path: 'auth', loadChildren: () => import('./presentation/modules/auth/auth.module').then(m => m.AuthModule) },
    {path: '', redirectTo: 'home', pathMatch: 'full'}
];
