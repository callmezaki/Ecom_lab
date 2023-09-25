import { TestBed } from '@angular/core/testing';

import { TCShopFormService } from './tcshop-form.service';

describe('TCShopFormService', () => {
  let service: TCShopFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TCShopFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
