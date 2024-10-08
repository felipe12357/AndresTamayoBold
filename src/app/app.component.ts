import { Component, inject } from '@angular/core';
import { CurtainService } from './layout/curtain.service';
import { NgIf, AsyncPipe } from '@angular/common';
import { SideBarComponent } from './layout/side-bar/side-bar.component';
import { HeaderComponent } from './layout/header/header.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    standalone: true,
    imports: [NgIf, SideBarComponent, HeaderComponent, RouterOutlet, AsyncPipe]
})
export class AppComponent {
  title = 'bold_test';

  private curtainService = inject(CurtainService);

  curtainComponent$ = this.curtainService.curtainState$
}
