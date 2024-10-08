import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { transactionFilterBySalesEnum } from '../../utils/enumtypes';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { TransactionService } from '../transaction.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { NgFor, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-custom-filter',
    templateUrl: './custom-filter.component.html',
    styleUrl: './custom-filter.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FaIconComponent, NgFor, AsyncPipe]
})
export class CustomFilterComponent {

  faXIcon = faX;
  private SHOW_ALL_LABEL = 'Ver Todos';
  private transactionService = inject(TransactionService);
  selectedTypes$ = this.transactionService.filterBySalesType$;
  selectedTypes:transactionFilterBySalesEnum[]= this.transactionService.getFilterBySalesTypeSubjectValue();

  @Output() closeEvent = new EventEmitter<string>();
  paymentTypes = this.setPaymentTypes() ;


  setPaymentTypes(){
    return [...Object.keys(transactionFilterBySalesEnum).map((val )=>{
      
      const labelTyped = val as keyof typeof transactionFilterBySalesEnum;
      let labelValue =  transactionFilterBySalesEnum[labelTyped];
      const label = (labelValue === transactionFilterBySalesEnum.ALL as string) ? this.SHOW_ALL_LABEL
                                                                                :`Cobro con ${labelValue.toLowerCase()  }`;
      const valueTyped = val as transactionFilterBySalesEnum;

     return { value:valueTyped, label } 
    }) ]
  }

  
  setSelectedTypes(payment:transactionFilterBySalesEnum,event:Event){
    const inputElment = event.target as HTMLInputElement;

    if(inputElment.checked)
      this.selectedTypes = [...this.selectedTypes,payment];
    else
      this.selectedTypes = this.selectedTypes.filter(type => type!==payment) 
  }

  setFilter(){
    this.transactionService.updateFilterBySaleType(this.selectedTypes)
  }

  close(){
    this.closeEvent.emit('');
  }
}
