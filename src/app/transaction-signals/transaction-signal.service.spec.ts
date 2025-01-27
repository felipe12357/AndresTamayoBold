import { TestBed } from '@angular/core/testing';
import { TransactionSignalService } from './transaction-signal.service';



describe('TransactionSignalService', () => {
  let service: TransactionSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
