import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboveNavbarComponent } from './above-navbar.component';

describe('AboveNavbarComponent', () => {
  let component: AboveNavbarComponent;
  let fixture: ComponentFixture<AboveNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboveNavbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboveNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
