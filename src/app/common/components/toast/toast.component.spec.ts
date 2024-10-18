import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ToastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('dataToastAsing', () => {
    it('should set dataTaoast to success if type is success', () => {
      component.type = 'success';
      component.dataToastAsing();
      expect(component.dataTaoast).toEqual({
        icon: './assets/icons/success.png',
        color: 'text-green-500',
        spam: 'Check icon',
        bgColor: 'bg-teal-100'
      });
    });

    it('should set dataTaoast to delete if type is delete', () => {
      component.type = 'delete';
      component.dataToastAsing();
      expect(component.dataTaoast).toEqual({
        icon: './assets/icons/error.png',
        color: 'text-red-500',
        spam: 'Error icon',
        bgColor: 'bg-red-100'
      });
    });

    it('should set dataTaoast to warning if type is warning', () => {
      component.type = 'warning';
      component.dataToastAsing();
      expect(component.dataTaoast).toEqual({
        icon: './assets/icons/warning.png',
        color: 'text-orange-500',
        spam: 'Warning icon',
        bgColor: 'bg-orange-100'
      });
    });

    it('should set dataTaoast to warning if type is default', () => {
      component.type = 'default';
      component.dataToastAsing();
      expect(component.dataTaoast).toEqual({
        icon: './assets/icons/success.png',
        color: 'text-green-500',
        spam: 'Check icon',
        bgColor: 'bg-teal-100'
      });
    });
  });

  describe('automaticClose', () => {
    it('should emit close event after 5 seconds', fakeAsync(() => {
      const spy = spyOn(component.close, 'emit');
      component.automaticClose();
      tick(3000)
      expect(spy).toHaveBeenCalled();
    }));
  });
});
