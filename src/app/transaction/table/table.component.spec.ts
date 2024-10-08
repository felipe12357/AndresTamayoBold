import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { TransactionService } from '../transaction.service';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { TransactionModel } from '../transactionTypes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { paymentMethodEnum, salesTypeEnum, transactionFilterByTimeEnum, transationStateEnum } from '../../utils/enumtypes';
import { CurtainService } from '../../layout/curtain.service';
import { TransactionDetailComponent } from '../transaction-detail/transaction-detail.component';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  const transactionServiceSpy = jasmine.createSpyObj('TransactionService',
    ['updateFilterByText','getFilterByText']);

  const curtainServiceSpy = jasmine.createSpyObj('CurtainService',
    ['showCurtain']);

  let mockTransactionFilteredSubject = new BehaviorSubject<TransactionModel[]>([]);
  transactionServiceSpy.transactionFiltered$ =mockTransactionFilteredSubject.asObservable();

  let mockfiterByTimeSubject = new BehaviorSubject<TransactionModel[]>([]);
  transactionServiceSpy.fiterByTime$ =mockfiterByTimeSubject.asObservable();


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[FontAwesomeModule,FormsModule],
      declarations: [TableComponent],
      providers:[
        { provide: TransactionService, useValue: transactionServiceSpy },
        { provide: CurtainService, useValue: curtainServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call updateFilterByText when keyup event is emitted after debounceTime', fakeAsync(() => {
    const inputElement = fixture.nativeElement.querySelector('.input-container input');
    component.inputToHandle = { nativeElement: inputElement };
    component.searchValue = 'test';
    component.ngAfterViewInit();
    inputElement.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    tick(1700);
    expect(transactionServiceSpy.updateFilterByText).toHaveBeenCalledWith('test');
  }));

  it('should return a message depending on the property sent',()=>{
    transactionServiceSpy.MONTH_TO_SEARCH = '9';
    const val0 = component.getTitle(transactionFilterByTimeEnum.MONTH);
    expect(val0).toBe('Tus de ventas de Octubre');

    const val1 = component.getTitle(transactionFilterByTimeEnum.WEEK);
    expect(val1).toBe('Tus de ventas de esta semana');

    const val2 = component.getTitle(transactionFilterByTimeEnum.TODAY);
    expect(val2).toBe('Tus de ventas de hoy');
  })

  it('should call showDetail from  curtain service',()=>{
    const data:TransactionModel = {
      "id": "GZENBQ0HPKJPD",
      "status": transationStateEnum.REJECTED,
      "paymentMethod": paymentMethodEnum.BANCOLOMBIA,
      "salesType": salesTypeEnum.PAYMENT_LINK,
      "createdAt": 1728259200000,
      "transactionReference": 8354,
      "amount": 8103233
    }
    component.showDetail(data);
    expect(curtainServiceSpy.showCurtain).toHaveBeenCalledWith({component:TransactionDetailComponent,data});
  })

  it('should return object id',()=>{
    const data:TransactionModel = {
      "id": "GZENBQ0HPKJPD",
      "status": transationStateEnum.REJECTED,
      "paymentMethod": paymentMethodEnum.BANCOLOMBIA,
      "salesType": salesTypeEnum.PAYMENT_LINK,
      "createdAt": 1728259200000,
      "transactionReference": 8354,
      "amount": 8103233
    }
    const result = component.trackById(1,data);
    expect(result).toBe('GZENBQ0HPKJPD')
  })
});
