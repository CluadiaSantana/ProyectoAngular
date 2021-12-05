import { TestBed } from '@angular/core/testing';

import { NewRecordService } from './new-record.service';

describe('NewRecordService', () => {
  let service: NewRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
