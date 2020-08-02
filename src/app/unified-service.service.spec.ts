import { TestBed } from '@angular/core/testing';

import { UnifiedServiceService } from './unified-service.service';

describe('UnifiedServiceService', () => {
  let service: UnifiedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnifiedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
