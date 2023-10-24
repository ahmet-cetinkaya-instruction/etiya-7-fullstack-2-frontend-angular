import { TestBed } from '@angular/core/testing';

import { CarsMockService } from './cars-mock.service';

describe('CarsMockService', () => {
  let service: CarsMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarsMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
