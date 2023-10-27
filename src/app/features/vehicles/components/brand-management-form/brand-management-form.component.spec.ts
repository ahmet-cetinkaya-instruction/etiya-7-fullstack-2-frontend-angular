import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandManagementFormComponent } from './brand-management-form.component';

describe('BrandManagementFormComponent', () => {
  let component: BrandManagementFormComponent;
  let fixture: ComponentFixture<BrandManagementFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandManagementFormComponent]
    });
    fixture = TestBed.createComponent(BrandManagementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
