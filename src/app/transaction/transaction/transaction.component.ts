import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { transactionFilterByTimeEnum } from '../../utils/enumtypes';
import { map } from 'rxjs';
import { monthNameList } from '../../utils/getMonthName';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
import { NgIf, NgClass, AsyncPipe, CurrencyPipe } from '@angular/common';
import { CardComponent } from '../../shared/card/card.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { CustomFilterComponent } from '../custom-filter/custom-filter.component';
import { TableComponent } from '../table/table.component';


@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.component.html',
    styleUrl: './transaction.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgIf, CardComponent, NgClass, FaIconComponent, CustomFilterComponent, TableComponent, AsyncPipe, CurrencyPipe]
})
export class TransactionComponent {

  private transactionService = inject(TransactionService);
  transactionXTimeFilterEnum = transactionFilterByTimeEnum;

  transactionFiltered$ = this.transactionService.transactionFiltered$;
  fiterByTime$ = this.transactionService.fiterByTime$;
  cardContent$ = this.fiterByTime$.pipe(map(val =>this.setCardContent(val)))

  currentMonth = monthNameList[this.transactionService.MONTH_TO_SEARCH]; 

  showFiltersState = false;
  faSlidersIcon = faSliders;

  constructor(){
    const lastValue = this.transactionService.getFilterByTimeTypeSubjectValue();
    this.setCardContent(lastValue)
  }

  transactonResultAmount$ = this.transactionFiltered$.pipe(
    map( transationList => 
      transationList.reduce((acc,transaction)=> acc + transaction.amount,0)
    )
  )

  setFilter(type:transactionFilterByTimeEnum){
    this.transactionService.updateFilterByTime(type);
  }

  setCardContent(type:transactionFilterByTimeEnum):{title:string,subContent:string}{
    let cardContent;
    switch (type) {
      case transactionFilterByTimeEnum.MONTH:
          cardContent = { 
            title:`Total de ventas de ${this.currentMonth}`,
            subContent: `${monthNameList[this.transactionService.MONTH_TO_SEARCH]}, ${new Date().getFullYear()}`
          };
          return cardContent;
      case transactionFilterByTimeEnum.WEEK:
        cardContent = { 
          title:`Total de ventas de esta semana`,
          subContent: `${monthNameList[this.transactionService.MONTH_TO_SEARCH]}, ${new Date().getFullYear()}`
        };
        return cardContent;
      case transactionFilterByTimeEnum.TODAY:
        cardContent = { 
          title:`Total de ventas de hoy`,
          subContent: `${new Date().getDate()} ${monthNameList[this.transactionService.MONTH_TO_SEARCH]}, ${new Date().getFullYear()}`
        };
        return cardContent;
    }
  }

  showFilters(val:boolean){
    this.showFiltersState = val;
  }
}
