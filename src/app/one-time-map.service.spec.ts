import { TestBed, inject } from '@angular/core/testing';

import { OneTimeMapService } from './one-time-map.service';

describe('OneTimeMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OneTimeMapService]
    });
  });

  it('should ...', inject([OneTimeMapService], (service: OneTimeMapService) => {
    expect(service).toBeTruthy();
  }));
});
