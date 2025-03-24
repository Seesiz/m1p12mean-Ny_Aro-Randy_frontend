import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PrestationService } from '@/app/back-office/services/prestation/prestation.service';
import { IPrestation } from '@/types/output';
import { viewChild } from '@angular/core';
import { BrnDialogComponent } from '@spartan-ng/brain/dialog';
import { Component } from '@angular/core';
@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  addForm: FormGroup;
  public viewchildDialogRef = viewChild(BrnDialogComponent);

  constructor(
    private fb: FormBuilder,
    private prestationService: PrestationService
  ) {
    this.addForm = this.fb.group({
      label: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required]],
      duree: [0, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      const prestation: IPrestation = {
        ...this.addForm.value,
        type: {
          status: this.addForm.value.status,
          reduction: 0,
        },
      };
      this.prestationService.savePrestation(prestation).then(
        () => {
          this.viewchildDialogRef()?.close({});
        },
        (error) => {
          console.error('Error updating user:', error);
        }
      );
    }
  }
}
