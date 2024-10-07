import { ChangeDetectionStrategy, Component, Input, SimpleChanges } from '@angular/core';
import { TransactionModel } from '../transactionTypes';
import { paymentMethodEnum, salesTypeEnum, transactionFilterBySalesEnum, transationStateEnum } from '../../utils/enumtypes';
import { faXmarkCircle,faCheckCircle, faBank, faCreditCard, faLink, faWifi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { TRANSACTION_REJECTED_MESSAGE, TRANSACTION_SUCCESS_MESSAGE } from '../../utils/constants';
import { FirstUppercasePipe } from '../../pipes/first-uppercase.pipe';


@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrl: './transaction-detail.component.scss',
  standalone:true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  imports:[FontAwesomeModule,CommonModule,FirstUppercasePipe],
})
export class TransactionDetailComponent {

  statusEnum =transationStateEnum;
  paymentMethodEnum =paymentMethodEnum;
  salesTypeEnum =salesTypeEnum;

  faXmarkCircleIcon = faXmarkCircle;
  faCheckCircleIcon = faCheckCircle;
  faBankIcon = faBank;
  faCreditCardIcon = faCreditCard;
  faLinkIcon = faLink;
  faMobileIcon = faWifi;

  TRANSACTION_REJECTED_MESSAGE = TRANSACTION_REJECTED_MESSAGE;
  TRANSACTION_SUCCESS_MESSAGE = TRANSACTION_SUCCESS_MESSAGE;

  @Input() data!: TransactionModel;
  salesTypeLabel:string ='';

 
  ngOnChanges(changes: SimpleChanges): void {
    if(this.data)
      this.salesTypeLabel = transactionFilterBySalesEnum[this.data?.salesType ]
  }
 
   
}
