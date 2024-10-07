import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  imports:[FontAwesomeModule],
  standalone:true,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() title!: string;
  @Input() mainContent!: string |null;
  @Input() subContent!: string;

  faInfoCircle = faInfoCircle;
  tooltipText: string = 'title'
}
