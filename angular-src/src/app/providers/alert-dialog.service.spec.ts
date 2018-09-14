import { TestBed, inject } from '@angular/core/testing';

import { AlertDialogService } from './alert-dialog.service';

describe('AlertDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlertDialogService]
    });
  });

  it('should be created', inject([AlertDialogService], (service: AlertDialogService) => {
    expect(service).toBeTruthy();
  }));
});
