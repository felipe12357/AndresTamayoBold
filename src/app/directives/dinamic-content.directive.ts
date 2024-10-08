import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { dinamicType } from './dinamicType';

@Directive({
  selector: '[appDinamicContent]'
})
export class DinamicContentDirective implements OnInit {
  @Input() componentToDisplay!:dinamicType |null;
  constructor(private viewContainerRef: ViewContainerRef) {}
  ngOnInit(): void {
    if(this.componentToDisplay){
      const componentRef = this.viewContainerRef.createComponent( this.componentToDisplay.component );
      componentRef.setInput('data', this.componentToDisplay.data );  
    }
  }

}
