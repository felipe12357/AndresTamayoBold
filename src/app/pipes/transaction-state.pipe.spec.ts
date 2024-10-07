import { TransactionStatePipe } from './transaction-state.pipe';

describe('TransactionStatePipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionStatePipe();
    expect(pipe).toBeTruthy();
  });
});
