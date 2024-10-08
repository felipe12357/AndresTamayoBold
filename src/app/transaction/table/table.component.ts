import { AfterViewInit, Component, ElementRef, inject, OnDestroy, ViewChild } from '@angular/core';
import { TransactionModel } from '../transactionTypes';
import { TransactionService } from '../transaction.service';
import { faBank, faCreditCard,faLink,faSearch, faWifi } from '@fortawesome/free-solid-svg-icons';
import { paymentMethodEnum, salesTypeEnum, transactionFilterByTimeEnum } from '../../utils/enumtypes';
import { debounceTime, distinctUntilChanged, fromEvent, map, Observable, Subscription } from 'rxjs';
import { monthNameList } from '../../utils/getMonthName';
import { CurtainService } from '../../layout/curtain.service';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgFor, NgClass, NgIf, AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { TransactionStatePipe } from '../../pipes/transaction-state.pipe';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrl: './table.component.scss',
    standalone: true,
    imports: [FormsModule, FaIconComponent, NgFor, NgClass, NgIf, AsyncPipe, CurrencyPipe, DatePipe, TransactionStatePipe]
})
export class TableComponent implements OnDestroy, AfterViewInit{

  private transactionService = inject(TransactionService);
  private curtainService = inject(CurtainService);
  
  transactionFiltered$ = this.transactionService.transactionFiltered$;
  tableTitle$ = this.transactionService.fiterByTime$.pipe(map(val =>this.getTitle(val))) 

  inputChange$!: Observable<Event>;
  inputSubscription!:Subscription;
  
  @ViewChild('inputToHandle') inputToHandle!: ElementRef<HTMLInputElement>;

  paymentMethodEnum = paymentMethodEnum;
  salesTypeEnum = salesTypeEnum;
  faBankIcon = faBank;
  faCreditCardIcon = faCreditCard;
  faSearchIcon = faSearch;
  faLinkIcon = faLink;
  faMobileIcon = faWifi;
  searchValue = this.transactionService.getFilterByText();


  ngAfterViewInit(): void {

    this.inputChange$ = fromEvent(this.inputToHandle.nativeElement,'keyup');

    this.inputSubscription = this.inputChange$.pipe(debounceTime(1500),distinctUntilChanged())
    .subscribe(()=>{
        this.transactionService.updateFilterByText( this.searchValue )
    }) 
  }

  ngOnDestroy(): void {
    this.inputSubscription.unsubscribe(); 
  }
  
  getTitle(type:transactionFilterByTimeEnum):string {
    switch (type) {
      case transactionFilterByTimeEnum.MONTH:
          const currentMonth = monthNameList[this.transactionService.MONTH_TO_SEARCH]; 
          return `Tus de ventas de ${currentMonth}`;
      case transactionFilterByTimeEnum.WEEK:
          return `Tus de ventas de esta semana`;
      case transactionFilterByTimeEnum.TODAY:
          return `Tus de ventas de hoy`;
    }
  }

  showDetail(transaction:TransactionModel){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.curtainService.showCurtain({component:TransactionDetailComponent,data:transaction});
  }

  trackById(index: number, item: TransactionModel): string {
    return item.id
  }
}
