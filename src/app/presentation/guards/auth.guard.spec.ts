import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

import { authGuard } from './auth.guard';
import { StorageManagerService } from '../../common/services/storage-manager.service';


describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  describe('authGuard', () => {
    it('should return true if user is logged in', () => {
      const storageManagerService = TestBed.inject(StorageManagerService);
      spyOn(storageManagerService, 'get').and.returnValue('tokenUser');

      const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
      const state: RouterStateSnapshot = {} as RouterStateSnapshot;
      const result = executeGuard(route, state);

      expect(result).toBeTrue();
    });

    it('should return false and navigate to login page if user is not logged in', () => {
      const storageManagerService = TestBed.inject(StorageManagerService);
      spyOn(storageManagerService, 'get').and.returnValue(null);

      const router = TestBed.inject(Router);
      spyOn(router, 'navigate');

      const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
      const state: RouterStateSnapshot = {} as RouterStateSnapshot;

      const result = executeGuard(route, state);

      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  
  });
});
