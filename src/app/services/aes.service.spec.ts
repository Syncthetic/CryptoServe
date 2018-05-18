import { TestBed, inject } from '@angular/core/testing';

import { AesService } from './aes.service';

describe('AesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AesService]
    });
  });

  it('should be created', inject([AesService], (service: AesService) => {
    expect(service).toBeTruthy();
  }));
});
