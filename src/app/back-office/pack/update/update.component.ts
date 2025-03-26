import { IPack } from '@/types/output';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-update',
  standalone: false,
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent {
  @Input() selectedPack: IPack | null = null;
  loading: boolean = false;
}
