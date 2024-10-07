import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './transaction/transaction.component';
import { TransactionRoutingModule } from './transaction.routing';
import { SharedModule } from '../shared/shared.module';
import { CustomFilterComponent } from './custom-filter/custom-filter.component';
import {FormsModule} from '@angular/forms';
import { TableComponent } from './table/table.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';

@NgModule({
  declarations: [
    TransactionComponent,
    CustomFilterComponent,
    TableComponent,
  ],
  imports: [
    TransactionDetailComponent,
    FormsModule,
    CommonModule,
    SharedModule,
    TransactionRoutingModule,
  ]
})
export class TransactionModule { }
