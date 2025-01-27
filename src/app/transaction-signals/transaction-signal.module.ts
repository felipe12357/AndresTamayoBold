import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionSignalsComponent } from './transaction/transaction-signals.component';
import { TransactionSignalsRoutingModule } from './transaction-signal.routing';
import { TableSignalsComponent } from './table-signals/table-signals.component';




@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    TransactionSignalsRoutingModule
  ]
})
export class TransactionSignalModule { }
