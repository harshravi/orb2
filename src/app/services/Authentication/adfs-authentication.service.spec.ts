import { TestBed, inject } from '@angular/core/testing';

import { AdfsAuthenticationService } from './adfs-authentication.service';

describe('AdfsAuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdfsAuthenticationService]
    });
  });

  it('should be created', inject([AdfsAuthenticationService], (service: AdfsAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
