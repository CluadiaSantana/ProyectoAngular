import { TestBed } from '@angular/core/testing';
import { AuthGuardService } from './auth-guard-service.service';

 

describe('AuthGuardServic', () => {
  let service: AuthGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
