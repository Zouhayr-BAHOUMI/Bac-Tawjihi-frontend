import { TestBed } from '@angular/core/testing';

import { RecuService } from './recu.service';

describe('RecuService', () => {
  let service: RecuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
