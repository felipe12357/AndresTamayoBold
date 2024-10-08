import { fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { TransactionService } from './transaction.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { TransactionModel } from './transactionTypes';
import { franchiseEnum, paymentMethodEnum, salesTypeEnum, transactionFilterBySalesEnum, transationStateEnum } from '../utils/enumtypes';
import { firstValueFrom, of } from 'rxjs';

describe('TransactionService', () => {
  let service: TransactionService;
  let httpMock: HttpTestingController;
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


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers:[
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(TransactionService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  describe('getTransations method',()=>{

    it('should return an array of TransactionModel', async() => {
      const promise = firstValueFrom(service['getTransations']());
      const req = httpMock.expectOne(service['URL']);
      expect(req.request.method).toBe('GET');
      req.flush({ data: mockTransactions });

      const transactions = await promise;
      expect(transactions.length).toBe(6);
      expect(transactions).toEqual(mockTransactions);
    });

    it('should handle errors and call handleError', async() => {
      const handleErrorSpy = spyOn<any>(service, 'handleError').and.returnValue(of('hello'));
      const promise = firstValueFrom(service['getTransations']());
      const mockError = { status: 500, statusText: 'Server Error' };

      const req = httpMock.expectOne(service['URL']);
      req.flush(null, mockError);
      await promise;
      expect(handleErrorSpy).toHaveBeenCalled();
    });

  })

  describe('handleError method',()=>{
    it('should return a client-side error message when error is an ErrorEvent', async () => {
      const mockErrorEvent = new ErrorEvent('Network error', {
        message: 'Client-side error',
      });
  
      const mockErrorResponse = new HttpErrorResponse({
        error: mockErrorEvent,
        status: 0, // Client-side error typically has status code 0
      });
  
      try {
        await firstValueFrom(service['handleError'](mockErrorResponse));
        fail('Expected an error, but none was thrown');
      } catch (errorMessage) {
        expect(errorMessage).toBe('An error occurred: Client-side error');
      }
    });
  
    it('should return a generic error message when error is a server-side error', async () => {
      const mockErrorResponse = new HttpErrorResponse({
        status: 500, // Server-side error
        statusText: 'Internal Server Error',
      });
  
      try {
        await firstValueFrom(service['handleError'](mockErrorResponse));
        fail('Expected an error, but none was thrown');
      } catch (errorMessage) {
        expect(errorMessage).toBe('There was an error');
      }
    });
  })

  describe('filtering',()=>{

    beforeEach(()=>{
      service.updateFilterByText('');
      service.updateFilterBySaleType([transactionFilterBySalesEnum.ALL])
    })
    it('should return all elements',async()=>{
      const promise = firstValueFrom(service.transactionFiltered$);
      const req = httpMock.expectOne(service['URL']);
      req.flush({ data: mockTransactions });
      const transactions = await promise;
      expect(transactions.length).toBe(6); 
      expect(transactions).toEqual(mockTransactions);
      httpMock.verify();
    })

    it('should filter elements by string id',async()=>{
      service.updateFilterByText('GZENBQ0HPKJPD')
      const promise = firstValueFrom(service.transactionFiltered$);
      const req = httpMock.expectOne(service['URL']);
      req.flush({ data: mockTransactions });
      const transactions = await promise;
      expect(transactions.length).toBe(1); 
      expect(transactions[0]).toEqual(mockTransactions[0]);
      httpMock.verify();
    })

    it('should filter elements by strign terminal',async()=>{
      service.updateFilterByText('term')
      const promise = firstValueFrom(service.transactionFiltered$);
      const req = httpMock.expectOne(service['URL']);
      req.flush({ data: mockTransactions });
      const transactions = await promise;
      expect(transactions.length).toBe(2); 
      expect(transactions[0]).toEqual(mockTransactions[1]);
      expect(transactions[1]).toEqual(mockTransactions[5]);
      httpMock.verify();
    })

    it('should filter elements by salestype',async()=>{
      service.updateFilterBySaleType([transactionFilterBySalesEnum.TERMINAL])
      const promise = firstValueFrom(service.transactionFiltered$);
      const req = httpMock.expectOne(service['URL']);
      req.flush({ data: mockTransactions });
      const transactions = await promise;
      expect(transactions.length).toBe(0); 
      httpMock.verify();
    })

    it('should filter elements by all salestype',async()=>{
      service.updateFilterBySaleType([transactionFilterBySalesEnum.ALL])
      const promise = firstValueFrom(service.transactionFiltered$);
      const req = httpMock.expectOne(service['URL']);
      req.flush({ data: mockTransactions });
      const transactions = await promise;
      expect(transactions.length).toBe(6); 
      httpMock.verify();
    })
  })
});
