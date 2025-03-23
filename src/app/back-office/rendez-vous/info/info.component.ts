import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRendez_vous } from '@/types/output';
import { viewChild } from '@angular/core';
import { BrnDialogComponent } from '@spartan-ng/brain/dialog';
@Component({
  selector: 'app-info',
  standalone: false,
  templateUrl: './info.component.html',
  styleUrl: './info.component.css',
})
export class InfoComponent {
  public viewchildDialogRef = viewChild(BrnDialogComponent);

  @Input() selectedRDV: IRendez_vous | null = null;
  @Output() confirm = new EventEmitter<string>();
  @Output() refuse = new EventEmitter<string>();
  isSubmit: boolean = false;

  onConfirm() {
    this.isSubmit = true;
    this.viewchildDialogRef()?.close({});
    if (this.selectedRDV) this.confirm.emit(this.selectedRDV._id);
  }

  onRefuse() {
    this.isSubmit = true;
    this.viewchildDialogRef()?.close({});
    if (this.selectedRDV) this.refuse.emit(this.selectedRDV._id);
  }
}
