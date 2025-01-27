import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { loadFilterState } from '../utils/sessionStorage';
import { TransactionModel } from '../transaction/transactionTypes';
import { catchError, map, Observable, throwError } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { getNumberToformatDate } from '../utils/formatDate';
import { transationStateEnum } from '../utils/enumtypes';
import { TRANSACTION_REJECTED_MESSAGE, TRANSACTION_SUCCESS_MESSAGE } from '../utils/constants';
@Injectable({
  providedIn: 'root'
})
export class TransactionSignalService {

  private URL ='https://bold-fe-api.vercel.app/api';
  private http = inject(HttpClient);
  private lastSessionValues = loadFilterState();

  private transactionResult:Signal<TransactionModel[]>  = toSignal(this.getTransations(),{ initialValue: [] })
  filterByTextS =  signal<string>("")
  transactionFilteredS:Signal<TransactionModel[]> = computed(()=>{
    return this.filterTransactionByText( this.filterByTextS(),this.transactionResult())
  })

  private filterTransactionByText(text:string,transactionList:TransactionModel[]):TransactionModel[]{
  
      if(!text || text ==='')
        return transactionList
  
      return transactionList.filter(transaction =>{
  
        const transactionStateLabel = (transaction.status === transationStateEnum.REJECTED) ? TRANSACTION_REJECTED_MESSAGE : TRANSACTION_SUCCESS_MESSAGE;
        
        return transaction.id.toLowerCase().includes(text.toLowerCase()) || 
               transaction.paymentMethod.toLowerCase().includes(text.toLowerCase()) || 
               transaction.amount.toString().includes(text) ||
               transaction.status.toString().toLowerCase().includes(text.toLowerCase()) ||
               getNumberToformatDate(transaction.createdAt).includes(text) ||
               transaction.franchise?.toString().toLowerCase().includes(text.toLowerCase()) ||
               transaction.salesType.toLowerCase().includes(text.toLocaleLowerCase()) ||
               transactionStateLabel.toLowerCase().includes(text.toLowerCase())
      })
    }

  private getTransations():Observable<TransactionModel[]>{
    return this.http.get<{data:TransactionModel[]}>(this.URL).pipe(
        map(({data}) => data),
        catchError(err => this.handleError(err))
    )  
  }

  private handleError(error:HttpErrorResponse):Observable<never>{
    let errorMessage = 'There was an error';

    if (error.error instanceof ErrorEvent)
      errorMessage = `An error occurred: ${error.error.message}`;

    return throwError(()=>errorMessage);
  }

}
