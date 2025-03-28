import { EventObject } from '@/types/event';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideUser, lucideX } from '@ng-icons/lucide';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmLabelDirective } from '@spartan-ng/ui-label-helm';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-form-popup',
  standalone: true,
  templateUrl: './form-popup.component.html',
  styleUrl: './form-popup.component.css',
  imports: [
    CommonModule,
    FormsModule,
    HlmButtonDirective,
    NgIcon,
    HlmInputDirective,
    HlmLabelDirective,
  ],
  providers: [provideIcons({ lucideX, lucideUser })],
})
export class FormPopupComponent {
  @Input() data: EventObject | null = null;
  @Output() close = new EventEmitter<void>();
  closeData() {
    this.close.emit();
  }
}
