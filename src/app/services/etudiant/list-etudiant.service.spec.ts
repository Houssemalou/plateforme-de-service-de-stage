import { TestBed } from '@angular/core/testing';

import { ListEtudiantService } from './list-etudiant.service';

describe('ListEtudiantService', () => {
  let service: ListEtudiantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListEtudiantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
