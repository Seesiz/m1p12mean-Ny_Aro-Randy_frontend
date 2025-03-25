import { EventObject } from '@/types/event';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideX } from '@ng-icons/lucide';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';

@Component({
  selector: 'app-form-popup',
  standalone: true,
  templateUrl: './form-popup.component.html',
  styleUrl: './form-popup.component.css',
  imports: [HlmButtonDirective, NgIcon, HlmInputDirective, HlmLabelDirective],
  providers: [provideIcons({ lucideX })],
})
export class FormPopupComponent {
  @Input() data: EventObject | null = null;
  @Output() close = new EventEmitter<void>();

  closeData() {
    this.close.emit();
  }
}
