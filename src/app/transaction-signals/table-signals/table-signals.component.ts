import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { TransactionSignalService } from '../transaction-signal.service';
import { TransactionModel } from '../../transaction/transactionTypes';
import { TransactionDetailComponent } from '../../transaction/transaction-detail/transaction-detail.component';
import { CurtainService } from '../../layout/curtain.service';
import { NgFor, NgClass, NgIf, AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TransactionStatePipe } from '../../pipes/transaction-state.pipe';
import { faBank, faCreditCard, faSearch, faLink, faWifi } from '@fortawesome/free-solid-svg-icons';
import { paymentMethodEnum, salesTypeEnum } from '../../utils/enumtypes';
import { debounceTime, distinctUntilChanged, fromEvent, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-table-signals',
  templateUrl: './table-signals.component.html',
  styleUrl: './table-signals.component.scss',
  standalone: true,
  imports: [FormsModule, FaIconComponent, NgFor, NgClass, NgIf, CurrencyPipe, DatePipe, TransactionStatePipe]
})
export class TableSignalsComponent {

  private curtainService = inject(CurtainService);
  private transactionSignalService = inject(TransactionSignalService);
  transactionFilteredS = this.transactionSignalService.transactionFilteredS;

  @ViewChild('inputToHandle') inputToHandle!: ElementRef<HTMLInputElement>;
  paymentMethodEnum = paymentMethodEnum;
  salesTypeEnum = salesTypeEnum;
  faBankIcon = faBank;
  faCreditCardIcon = faCreditCard;
  faSearchIcon = faSearch;
  faLinkIcon = faLink;
  faMobileIcon = faWifi;

  inputSubscription!:Subscription;

 ngAfterViewInit(): void {

    this.inputSubscription = fromEvent(this.inputToHandle.nativeElement,'keyup').pipe(debounceTime(1500),distinctUntilChanged())
    .subscribe(()=>{
      this.transactionSignalService.filterByTextS.set(this.inputToHandle.nativeElement.value)
    }) 
  }

  ngOnDestroy(): void {
    this.inputSubscription.unsubscribe(); 
  }


  showDetail(transaction:TransactionModel){
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.curtainService.showCurtain({component:TransactionDetailComponent,data:transaction});
  }
}
