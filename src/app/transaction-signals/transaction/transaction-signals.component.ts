import { Component, inject } from '@angular/core';
import { TransactionSignalService } from '../transaction-signal.service';
import { TransactionModel } from '../../transaction/transactionTypes';
import { NgIf, NgClass, AsyncPipe, CurrencyPipe } from '@angular/common';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CustomFilterComponent } from '../../transaction/custom-filter/custom-filter.component';
import { TableSignalsComponent } from '../table-signals/table-signals.component';

@Component({
  selector: 'app-transaction-signals',
  templateUrl: './transaction-signals.component.html',
  styleUrl: './transaction-signals.component.scss',
  standalone: true,
  imports: [NgIf, NgClass, FaIconComponent, CustomFilterComponent, TableSignalsComponent, AsyncPipe, CurrencyPipe]
})
export class TransactionSignalsComponent {

  private transactionSignalService = inject(TransactionSignalService);
  transactionFilteredS = this.transactionSignalService.transactionFilteredS

  trackById(index: number, item: TransactionModel): string {
    return item.id
  }
}
