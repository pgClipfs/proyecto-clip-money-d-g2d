import { TestBed } from '@angular/core/testing';

import { OperatoriaPesosService } from './operatoria-pesos.service';

describe('OperatoriaPesosService', () => {
  let service: OperatoriaPesosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperatoriaPesosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
