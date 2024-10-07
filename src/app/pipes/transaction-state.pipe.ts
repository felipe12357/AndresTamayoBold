import { Pipe, PipeTransform } from '@angular/core';
import { transationStateEnum } from '../utils/enumtypes';
import {TRANSACTION_REJECTED_MESSAGE, TRANSACTION_SUCCESS_MESSAGE} from '../utils/constants';

@Pipe({
  name: 'transactionState',
  standalone:true
})
export class TransactionStatePipe implements PipeTransform {
  transform(value:transationStateEnum): string {

    return (value === transationStateEnum.REJECTED) ? 
      TRANSACTION_REJECTED_MESSAGE :TRANSACTION_SUCCESS_MESSAGE
  }

}
