import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageManagerService } from '../../common/services/storage-manager.service';

export const authGuard: CanActivateFn = (route, state) => {
  const storageManagerService = inject(StorageManagerService);
  const router = inject(Router);
  const isLogget = storageManagerService.get('tokenUser');
  if (isLogget) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
