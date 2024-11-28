import { TestBed } from '@angular/core/testing';

import { Tokeninterceptor } from './tokeninterceptor';

describe('Tokeninterceptor', () => {
  let service: Tokeninterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tokeninterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
