import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutComponent } from './layout.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, Router } from '@angular/router';
import { HomeComponent } from '../../../public/pages/home/home.component';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutComponent, HttpClientTestingModule, BrowserAnimationsModule,],
      providers: [
        provideRouter([
          { path: 'home', component: HomeComponent }
        ]),
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call profileService.getDataClient', () => {
      const spy = spyOn(component.profileService, 'getDataClient').and.callThrough();
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should call mobileQuery.removeEventListener', () => {
      const spy = spyOn(component.mobileQuery, 'removeEventListener').and.callThrough();
      component.ngOnDestroy();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('handleOpen', () => {
    it('should call openOptionsUser.set', () => {
      const spy = spyOn(component.openOptionsUser, 'set').and.callThrough();
      component.handleOpen();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('closeSession', () => {
    it('should call storageManagerService.removeLocalAndSessionStorage', () => {
      const spy = spyOn(component.storageManagerService, 'removeLocalAndSessionStorage').and.callThrough();
      component.closeSession();
      expect(spy).toHaveBeenCalled();
    });

    it('should call router.navigate', () => {
      const spy = spyOn(component.router, 'navigate').and.callThrough();
      component.closeSession();
      expect(spy).toHaveBeenCalledWith(['/home']);
    });
  });
});
