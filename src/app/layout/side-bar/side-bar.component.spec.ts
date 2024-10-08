import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarComponent } from './side-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DinamicContentDirective } from '../../directives/dinamic-content.directive';
import { CurtainService } from '../curtain.service';

describe('SideBarComponent', () => {
  let component: SideBarComponent;
  let fixture: ComponentFixture<SideBarComponent>;

  const curtainServiceSpy = jasmine.createSpyObj('CurtainService',
    ['showCurtain','hideCurtain']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FontAwesomeModule, SideBarComponent, DinamicContentDirective,],
    providers: [
        { provide: CurtainService, useValue: curtainServiceSpy }
    ]
})
    .compileComponents();

    fixture = TestBed.createComponent(SideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showDetail from  curtain service',()=>{

    component.close();
    expect(curtainServiceSpy.hideCurtain).toHaveBeenCalled();
  })

});
