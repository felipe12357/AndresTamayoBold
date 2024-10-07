import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { dinamicType } from '../directives/dinamicType';

@Injectable({
  providedIn: 'root'
})
export class CurtainService {

  curtainStateSubject = new BehaviorSubject<boolean>(false);
  curtainState$ = this.curtainStateSubject.asObservable();

  curtainComponentSubject = new BehaviorSubject<dinamicType | null>(null);
  curtainComponent$ = this.curtainComponentSubject.asObservable();

  constructor() { }

  showCurtain(data:dinamicType){
    this.curtainStateSubject.next(true);
    this.curtainComponentSubject.next(data)
  }

  hideCurtain(){
    this.curtainStateSubject.next(false);
  }
}
