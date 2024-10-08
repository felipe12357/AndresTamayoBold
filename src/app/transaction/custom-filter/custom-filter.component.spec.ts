import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomFilterComponent } from './custom-filter.component';
import { TransactionService } from '../transaction.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { transactionFilterBySalesEnum } from '../../utils/enumtypes';

describe('CustomFilterComponent', () => {
  let component: CustomFilterComponent;
  let fixture: ComponentFixture<CustomFilterComponent>;
  const transactionServiceSpy = jasmine.createSpyObj('TransactionService',
    ['updateFilterByTime','getFilterByTimeTypeSubjectValue','getFilterByText','getFilterBySalesTypeSubjectValue','updateFilterBySaleType']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[FontAwesomeModule],
      declarations: [CustomFilterComponent],
      providers:[
        { provide: TransactionService, useValue: transactionServiceSpy },
      ]
      
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('setPaymentTypes',()=>{
    it('should return value and label, according to transactionFilterBySalesEnum',()=>{
      const values = component.setPaymentTypes()
      expect(values).toEqual([{ value: 'PAYMENT_LINK' as transactionFilterBySalesEnum, label: 'Cobro con link de pago' }, 
                               { value: 'TERMINAL' as transactionFilterBySalesEnum, label: 'Cobro con datáfono' }, 
                               { value: 'ALL' as transactionFilterBySalesEnum, label: 'Ver Todos' }]);
    })
  })

  describe('setSelectedTypes',()=>{
    it('should update selectedTypes properties',()=>{
      component.selectedTypes = [];
      const mockEvent = { target: { checked: true } } as unknown as Event;
      const mockEvent1 = { target: { checked: false } } as unknown as Event;
      component.setSelectedTypes(transactionFilterBySalesEnum.PAYMENT_LINK,mockEvent);
      expect(component.selectedTypes).toEqual([transactionFilterBySalesEnum.PAYMENT_LINK]);
      component.setSelectedTypes(transactionFilterBySalesEnum.TERMINAL,mockEvent);
      expect(component.selectedTypes).toEqual([transactionFilterBySalesEnum.PAYMENT_LINK,transactionFilterBySalesEnum.TERMINAL]);
      component.setSelectedTypes(transactionFilterBySalesEnum.PAYMENT_LINK,mockEvent1);
      expect(component.selectedTypes).toEqual([transactionFilterBySalesEnum.TERMINAL]);
    })
  })

  it('should send selectedTypes to transactionService',()=>{
    component.selectedTypes = [transactionFilterBySalesEnum.PAYMENT_LINK,transactionFilterBySalesEnum.TERMINAL];
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(transactionServiceSpy.updateFilterBySaleType).toHaveBeenCalledWith([transactionFilterBySalesEnum.PAYMENT_LINK,transactionFilterBySalesEnum.TERMINAL])
  })
});
