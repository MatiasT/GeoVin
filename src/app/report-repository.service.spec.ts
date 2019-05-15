import { TestBed } from '@angular/core/testing';

import { ReportRepositoryService } from './report-repository.service';

describe('ReportRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReportRepositoryService = TestBed.get(ReportRepositoryService);
    expect(service).toBeTruthy();
  });
});
