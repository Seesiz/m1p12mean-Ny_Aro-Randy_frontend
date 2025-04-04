import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrestationService } from '@/app/back-office/services/prestation/prestation.service';
import { IPrestation } from '@/types/output';
import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  addForm: FormGroup;
  isSubmit: boolean = false;
  @Output() loadServices = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private prestationService: PrestationService
  ) {
    this.addForm = this.fb.group({
      label: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      duree: [0, [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      this.isSubmit = true;
      const prestation: IPrestation = {
        ...this.addForm.value,
        type: {
          status: this.addForm.value.status,
          reduction: 0,
        },
      };
      this.prestationService
        .savePrestation(prestation)
        .then(
          () => {
            this.loadServices.emit();
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        )
        .finally(() => {
          this.isSubmit = false;
        });
    }
  }
}
