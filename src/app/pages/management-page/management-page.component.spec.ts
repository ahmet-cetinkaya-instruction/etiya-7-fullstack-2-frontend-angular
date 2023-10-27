import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagmentPageComponent } from './management-page.component';

describe('ManagementPageComponent', () => {
  let component: ManagmentPageComponent;
  let fixture: ComponentFixture<ManagmentPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagmentPageComponent]
    });
    fixture = TestBed.createComponent(ManagmentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
