import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseStyleComponent } from './browse-style.component';

describe('BrowseStyleComponent', () => {
  let component: BrowseStyleComponent;
  let fixture: ComponentFixture<BrowseStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowseStyleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowseStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
