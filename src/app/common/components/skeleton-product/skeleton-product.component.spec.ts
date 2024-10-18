import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonProductComponent } from './skeleton-product.component';

describe('SkeletonProductComponent', () => {
  let component: SkeletonProductComponent;
  let fixture: ComponentFixture<SkeletonProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkeletonProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
