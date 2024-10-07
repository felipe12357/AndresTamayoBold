import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports:[FontAwesomeModule],
  standalone:true
})
export class HeaderComponent {
  faQuestionIcon = faQuestionCircle;
}
