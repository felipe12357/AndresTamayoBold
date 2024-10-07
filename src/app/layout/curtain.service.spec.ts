import { TestBed } from '@angular/core/testing';

import { CurtainService } from './curtain.service';

describe('CurtainService', () => {
  let service: CurtainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurtainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
