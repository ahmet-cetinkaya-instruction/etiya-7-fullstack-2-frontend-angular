import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarCardListComponent } from './car-card-list.component';

describe('CarCardListComponent', () => {
  let component: CarCardListComponent;
  let fixture: ComponentFixture<CarCardListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarCardListComponent]
    });
    fixture = TestBed.createComponent(CarCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
