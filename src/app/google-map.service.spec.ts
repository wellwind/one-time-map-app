import { TestBed, inject } from '@angular/core/testing';

import { GoogleMapService } from './google-map.service';

describe('GoogleMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleMapService]
    });
  });

  it('should ...', inject([GoogleMapService], (service: GoogleMapService) => {
    expect(service).toBeTruthy();
  }));
});
