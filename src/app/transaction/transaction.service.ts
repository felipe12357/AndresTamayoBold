import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, combineLatest, map, Observable, shareReplay, throwError } from 'rxjs';
import { transactionFilterTypeEnum, TransactionModel } from './transactionTypes';
import { transactionFilterBySalesEnum, transactionFilterByTimeEnum, transationStateEnum } from '../utils/enumtypes';
import { getDateWeek } from '../utils/calculateWeekNumber';
import { loadFilterState, saveFilterState } from '../utils/sessionStorage';
import { getNumberToformatDate } from '../utils/formatDate';
import { TRANSACTION_REJECTED_MESSAGE, TRANSACTION_SUCCESS_MESSAGE } from '../utils/constants';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private URL ='https://bold-fe-api.vercel.app/api';
  private http = inject(HttpClient);
  private lastSessionValues = loadFilterState();
  private filterByTimeSubject = new BehaviorSubject<transactionFilterByTimeEnum>(this.lastSessionValues.dateTime);
  private filterBySalesTypeSubject = new BehaviorSubject<transactionFilterBySalesEnum[]>([...this.lastSessionValues.salesType]);
  private filterByTextSubject = new BehaviorSubject<string>(this.lastSessionValues.searchText);

  fiterByTime$ = this.filterByTimeSubject.asObservable();
  filterBySalesType$ = this.filterBySalesTypeSubject.asObservable();



  MONTH_TO_SEARCH = new Date().getMonth();

  transactionFiltered$:Observable<TransactionModel[]> = combineLatest([
    this.filterByTimeSubject,this.filterBySalesTypeSubject,this.filterByTextSubject,this.getTransations()
  ])
  .pipe(
    map(([byTime,BySalesType,byText,transationList])=>{
      let filterList = this.filterTransationByTime(byTime,transationList);
      filterList = this.filterTransactionByText(byText,filterList);
      return this.filterTransationBySaleType(BySalesType,filterList);
    }),
    shareReplay()
  );

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

  private filterTransationBySaleType(saleTypes:transactionFilterBySalesEnum[],transactionList:TransactionModel[]):TransactionModel[]{
    if( saleTypes.findIndex(type => type === transactionFilterBySalesEnum.ALL ) >-1)
      return transactionList;
   
    return transactionList.filter(transaction =>{    
        const found = saleTypes.findIndex((type)=> transaction.salesType === type as string );
        return (found!=-1)
    })
  }


  private filterTransationByTime(byTime:transactionFilterByTimeEnum,transactionList:TransactionModel[]):TransactionModel[]{
    return transactionList.filter( transation => {
      switch(byTime){
        case transactionFilterByTimeEnum.MONTH:
          return  new Date(transation.createdAt).getMonth() === this.MONTH_TO_SEARCH;
        case transactionFilterByTimeEnum.WEEK:
          return getDateWeek(new Date()) === getDateWeek(new Date(transation.createdAt))
        case transactionFilterByTimeEnum.TODAY:
          return new Date(transation.createdAt).getDate() === new Date().getDate();
      }
    })
  }


  updateFilterByTime(val:transactionFilterByTimeEnum){
    this.filterByTimeSubject.next(val);
    saveFilterState(val,transactionFilterTypeEnum.DATE_TYPE);
  }


  updateFilterByText(val:string){
    this.filterByTextSubject.next(val);
    saveFilterState(val,transactionFilterTypeEnum.SEARCH_TEXT);
  }


  getFilterByText():string{
    return this.filterByTextSubject.getValue();
  }


  getFilterByTimeTypeSubjectValue():transactionFilterByTimeEnum{
    return this.filterByTimeSubject.getValue();
  }


  getFilterBySalesTypeSubjectValue():transactionFilterBySalesEnum[]{
    return this.filterBySalesTypeSubject.getValue();
  }

  updateFilterBySaleType(val:transactionFilterBySalesEnum[]){
    this.filterBySalesTypeSubject.next(val);
    saveFilterState(val,transactionFilterTypeEnum.SALES_TYPE);
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
