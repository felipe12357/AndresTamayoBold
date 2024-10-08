import { Component, Input, NgModule, ViewContainerRef, ComponentRef } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { DinamicContentDirective } from "./dinamic-content.directive";

@Component({
  selector: 'app-dinamic-test-component',
  template: '<p>Test Component</p>',
})
class DinamicTestComponent {
  @Input() data: any;
}

@NgModule({
  declarations: [DinamicTestComponent],
})
class TestModule {}

describe('DinamicContentDirective', () => {
  let directive: DinamicContentDirective;
  let viewContainerRefSpy: jasmine.SpyObj<ViewContainerRef>;
  let componentRefSpy: jasmine.SpyObj<ComponentRef<any>>;
  let mockComponentInstance: any;

  beforeEach(() => {
    viewContainerRefSpy = jasmine.createSpyObj('ViewContainerRef', ['createComponent']);
    mockComponentInstance = {};
    componentRefSpy = jasmine.createSpyObj('ComponentRef', ['setInput'], { instance: mockComponentInstance });
    viewContainerRefSpy.createComponent.and.returnValue(componentRefSpy);

    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [DinamicContentDirective],
      providers: [{ provide: ViewContainerRef, useValue: viewContainerRefSpy }],
    });

    directive = new DinamicContentDirective(viewContainerRefSpy);
  });
  
  it('should call dynamic componente when data is not null', () => {
    const dinamicTypeMock = {
      component: DinamicTestComponent,
      data: { someData: 'test data' },
    };

    directive.componentToDisplay = dinamicTypeMock;
    directive.ngOnInit();
    expect(componentRefSpy.setInput).toHaveBeenCalledWith('data', dinamicTypeMock.data);
    mockComponentInstance.data = dinamicTypeMock.data;
    expect(mockComponentInstance.data).toEqual(dinamicTypeMock.data);
  });

});