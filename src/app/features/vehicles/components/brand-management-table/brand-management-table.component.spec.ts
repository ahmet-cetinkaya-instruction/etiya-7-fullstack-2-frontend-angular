import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandManagementTableComponent } from './brand-management-table.component';

describe('BrandManagementTableComponent', () => {
  let component: BrandManagementTableComponent;
  let fixture: ComponentFixture<BrandManagementTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandManagementTableComponent]
    });
    fixture = TestBed.createComponent(BrandManagementTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
