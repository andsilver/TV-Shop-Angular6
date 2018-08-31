import { TestBed, inject } from '@angular/core/testing';

import { InitStateService } from './init-state.service';

describe('InitStateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitStateService]
    });
  });

  it('should be created', inject([InitStateService], (service: InitStateService) => {
    expect(service).toBeTruthy();
  }));
});
