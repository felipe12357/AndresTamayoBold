import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardComponent } from './card/card.component';
import { TransactionStatePipe } from '../pipes/transaction-state.pipe';
import { FirstUppercasePipe } from '../pipes/first-uppercase.pipe';

@NgModule({
  declarations: [

  ],
  imports: [
    FontAwesomeModule,
    CardComponent,
    TransactionStatePipe,
    FirstUppercasePipe
  ],
  providers:[

  ],
  exports:[
    FontAwesomeModule,
    CardComponent,
    TransactionStatePipe,
    FirstUppercasePipe
  ]
})
export class SharedModule { }
