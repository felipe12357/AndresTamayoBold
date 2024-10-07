import { Component, inject } from '@angular/core';
import { CurtainService } from '../curtain.service';
import { faX } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  faXIcon = faX;
  private curtainService = inject(CurtainService);
  curtainComponent$ = this.curtainService.curtainComponent$;

  close(){
    this.curtainService.hideCurtain()
  }
}
