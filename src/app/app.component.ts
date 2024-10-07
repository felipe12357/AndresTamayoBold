import { Component, inject } from '@angular/core';
import { CurtainService } from './layout/curtain.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'bold_test';

  private curtainService = inject(CurtainService);

  curtainComponent$ = this.curtainService.curtainState$
}
