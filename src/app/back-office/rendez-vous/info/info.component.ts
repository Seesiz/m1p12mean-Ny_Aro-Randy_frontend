import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRendez_vous } from '@/types/output';
@Component({
  selector: 'app-info',
  standalone: false,
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent {
  @Input() selectedRDV: IRendez_vous | null = null;
  @Output() confirm = new EventEmitter<string>();
  @Output() refuse = new EventEmitter<string>();

  onConfirm() {
    if (this.selectedRDV) this.confirm.emit(this.selectedRDV._id);
  }

  onRefuse() {
    if (this.selectedRDV) this.refuse.emit(this.selectedRDV._id);
  }
}
