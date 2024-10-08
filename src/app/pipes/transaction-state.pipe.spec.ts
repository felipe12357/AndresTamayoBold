import { TRANSACTION_REJECTED_MESSAGE, TRANSACTION_SUCCESS_MESSAGE } from '../utils/constants';
import { transationStateEnum } from '../utils/enumtypes';
import { TransactionStatePipe } from './transaction-state.pipe';

describe('TransactionStatePipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionStatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the label',()=>{
    const pipe = new TransactionStatePipe();
    const reject =pipe.transform(transationStateEnum.REJECTED);
    expect(reject).toBe(TRANSACTION_REJECTED_MESSAGE);

    const accepted =pipe.transform(transationStateEnum.SUCCESSFULL);
    expect(accepted).toBe(TRANSACTION_SUCCESS_MESSAGE);
  })
});
