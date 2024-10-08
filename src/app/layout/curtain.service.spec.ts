import { TestBed } from '@angular/core/testing';

import { CurtainService } from './curtain.service';
import { Type } from '@angular/core';

class MockComponent {
}

describe('CurtainService', () => {
  let service: CurtainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurtainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update curtainStateSubject and ,curtainComponentSubject', ()=>{
    expect(service.curtainStateSubject.getValue()).toBe(false);
    const mockComponent: Type<unknown> = MockComponent;
    service.showCurtain({component:mockComponent,data:'mundo'})
    expect(service.curtainStateSubject.getValue()).toBe(true);
    expect(service.curtainComponentSubject.getValue()).toEqual({component:mockComponent,data:'mundo'});
  })

  it('should update curtainStateSubject with false',()=>{
    service.curtainStateSubject.next(true);
    expect(service.curtainStateSubject.getValue()).toBe(true);
    service.hideCurtain();
    expect(service.curtainStateSubject.getValue()).toBe(false);
  })
});
