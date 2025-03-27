import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  standalone: false,
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent {
  @Input() rating: number = 5;
}
