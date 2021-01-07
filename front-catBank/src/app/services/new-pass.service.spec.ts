import { TestBed } from '@angular/core/testing';

import { NewPassService } from './new-pass.service';

describe('NewPassService', () => {
  let service: NewPassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewPassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
