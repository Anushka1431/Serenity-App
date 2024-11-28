import { TestBed } from '@angular/core/testing';

import { ExcelserviceService } from './excelservice.service';

describe('ExcelserviceService', () => {
  let service: ExcelserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
