import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionSignalsComponent } from './transaction-signals.component';

describe('TransactionSignalsComponent', () => {
  let component: TransactionSignalsComponent;
  let fixture: ComponentFixture<TransactionSignalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionSignalsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionSignalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
