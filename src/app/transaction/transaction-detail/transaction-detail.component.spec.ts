import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionDetailComponent } from './transaction-detail.component';
import { SimpleChanges } from '@angular/core';
import { paymentMethodEnum, salesTypeEnum, transactionFilterBySalesEnum, transationStateEnum } from '../../utils/enumtypes';
import { TransactionModel } from '../transactionTypes';

describe('TransactionDetailComponent', () => {
  let component: TransactionDetailComponent;
  let fixture: ComponentFixture<TransactionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update salesTypeLabel when data changes', () => {
    const data:TransactionModel = {
      "id": "GZENBQ0HPKJPD",
      "status": transationStateEnum.REJECTED,
      "paymentMethod": paymentMethodEnum.BANCOLOMBIA,
      "salesType": salesTypeEnum.PAYMENT_LINK,
      "createdAt": 1728259200000,
      "transactionReference": 8354,
      "amount": 8103233
    }
    component.data = data; 

    const changes: SimpleChanges = {
      data: {
        currentValue: component.data,
        previousValue: null,
        firstChange: true,
        isFirstChange: () => true
      }
    };
    component.ngOnChanges(changes);

    expect(component.salesTypeLabel).toBe(transactionFilterBySalesEnum.PAYMENT_LINK);
  });
});
