import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TransactionComponent } from './transaction.component';
import { TransactionService } from '../transaction.service';
import { BehaviorSubject, of } from 'rxjs';
import { franchiseEnum, paymentMethodEnum, salesTypeEnum, transactionFilterByTimeEnum, transationStateEnum } from '../../utils/enumtypes';
import { TransactionModel } from '../transactionTypes';
import { TableComponent } from '../table/table.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardComponent } from '../../shared/card/card.component';
import { FormsModule } from '@angular/forms';
import { TransactionStatePipe } from '../../pipes/transaction-state.pipe';

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;
  const mockTransactions:TransactionModel[]= [
    {
      "id": "GZENBQ0HPKJPD",
      "status": transationStateEnum.REJECTED,
      "paymentMethod": paymentMethodEnum.BANCOLOMBIA,
      "salesType": salesTypeEnum.PAYMENT_LINK,
      "createdAt": 1728259200000,
      "transactionReference": 8354,
      "amount": 8103233
    },
    {
      "id": "GZENBBGZQCN2W",
      "status": transationStateEnum.SUCCESSFULL,
      "paymentMethod": paymentMethodEnum.BANCOLOMBIA,
      "salesType": salesTypeEnum.TERMINAL,
      "createdAt": 1727827200000,
      "transactionReference": 3825,
      "amount": 311859,
      "deduction": 3685
    },
    {
      "id": "GZENIH9PZX8AD",
      "status": transationStateEnum.SUCCESSFULL,
      "paymentMethod": paymentMethodEnum.DAVIPLATA,
      "salesType": salesTypeEnum.PAYMENT_LINK,
      "createdAt": 1728324302776,
      "transactionReference": 6264,
      "amount": 7298382
    },
    {
      "id": "GZENXHCZCQJ7I",
      "status": transationStateEnum.SUCCESSFULL,
      "paymentMethod": paymentMethodEnum.PSE,
      "salesType": salesTypeEnum.PAYMENT_LINK,
      "createdAt": 1728259200000,
      "transactionReference": 7027,
      "amount": 5122141
    },
    {
      "id": "GZENR9D6HU81J",
      "status": transationStateEnum.REJECTED,
      "paymentMethod": paymentMethodEnum.CARD,
      "salesType": salesTypeEnum.PAYMENT_LINK,
      "createdAt": 1728324302776,
      "transactionReference": 6959,
      "amount": 3344484,
      "franchise": franchiseEnum.VISA
    },
    {
      "id": "GZENZLQZGP1GQ",
      "status": transationStateEnum.REJECTED,
      "paymentMethod": paymentMethodEnum.CARD,
      "salesType": salesTypeEnum.TERMINAL,
      "createdAt": 1728259200000,
      "transactionReference": 7439,
      "amount": 5809850,
      "franchise": franchiseEnum.MASTERCARD
    }
  ];
  let mockTransactionFilteredSubject = new BehaviorSubject<TransactionModel[]>(mockTransactions);
  let mockfilterByTimeSubject = new BehaviorSubject<transactionFilterByTimeEnum>(transactionFilterByTimeEnum.MONTH);
  const transactionServiceSpy = jasmine.createSpyObj('TransactionService',
     ['updateFilterByTime','getFilterByTimeTypeSubjectValue','getFilterByText']);


  transactionServiceSpy.transactionFiltered$ =mockTransactionFilteredSubject.asObservable();
  transactionServiceSpy.fiterByTime$ =mockfilterByTimeSubject.asObservable();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[FontAwesomeModule,CardComponent,FormsModule,TransactionStatePipe],
      declarations: [TransactionComponent,TableComponent],
      providers:[
        { provide: TransactionService, useValue: transactionServiceSpy },
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setCardContent',()=>{
    beforeEach(()=>{
      component.currentMonth ='Octubre';
    })

    it('should return the correct content according to the time lapse',()=>{
        const result = component.setCardContent(transactionFilterByTimeEnum.MONTH);
        expect(result.title).toBe('Total de ventas de Octubre');
        const result1 = component.setCardContent(transactionFilterByTimeEnum.WEEK);
        expect(result1.title).toBe('Total de ventas de esta semana');
        const result2 = component.setCardContent(transactionFilterByTimeEnum.TODAY);
        expect(result2.title).toBe('Total de ventas de hoy');
    })
  })

  it('should update showfilteState',()=>{
      expect(component.showFiltersState).toBe(false);
      component.showFilters(true);
      expect(component.showFiltersState).toBe(true);
  })

  it('should call updateFilterByTime from transactionService',()=>{
    component.setFilter(transactionFilterByTimeEnum.TODAY);
    expect(transactionServiceSpy.updateFilterByTime).toHaveBeenCalledWith(transactionFilterByTimeEnum.TODAY)
  })

  it('should toggle the visibility of custom filters when button is clicked',() => {
    const button = fixture.nativeElement.querySelector('.custom-filters button');
    button.click();
    fixture.detectChanges();
    expect(component.showFiltersState).toBe(true);
  });

});
