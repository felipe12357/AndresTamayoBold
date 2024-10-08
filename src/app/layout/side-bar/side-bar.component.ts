import { Component, inject } from '@angular/core';
import { CurtainService } from '../curtain.service';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { DinamicContentDirective } from '../../directives/dinamic-content.directive';
import { AsyncPipe } from '@angular/common';


@Component({
    selector: 'app-side-bar',
    templateUrl: './side-bar.component.html',
    styleUrl: './side-bar.component.scss',
    standalone: true,
    imports: [FaIconComponent, DinamicContentDirective, AsyncPipe]
})
export class SideBarComponent {
  faXIcon = faX;
  private curtainService = inject(CurtainService);
  curtainComponent$ = this.curtainService.curtainComponent$;

  close(){
    this.curtainService.hideCurtain()
  }
}
