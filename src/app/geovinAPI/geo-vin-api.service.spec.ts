import { TestBed } from '@angular/core/testing';

import { GeoVinAPIService } from './geo-vin-api.service';

describe('GeoVinAPIService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeoVinAPIService = TestBed.get(GeoVinAPIService);
    expect(service).toBeTruthy();
  });
});
