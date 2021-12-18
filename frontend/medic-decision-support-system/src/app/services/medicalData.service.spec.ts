/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MedicalDataService } from './MedicalData.service';

describe('Service: MedicalData', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicalDataService]
    });
  });

  it('should ...', inject([MedicalDataService], (service: MedicalDataService) => {
    expect(service).toBeTruthy();
  }));
});
