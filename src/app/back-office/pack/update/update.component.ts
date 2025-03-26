import { IPack, IPrestation } from '@/types/output';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { PackService } from '../../services/pack/pack.service';

@Component({
  selector: 'app-update',
  standalone: false,
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent {
  @Input() selectedPack: IPack | null = null;
  @Input() prestations: IPrestation[] = [];

  updateForm: FormGroup;

  constructor(private fb: FormBuilder, private packService: PackService) {
    this.updateForm = this.fb.group({
      label: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      prestations: this.fb.array([]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPack'] && this.selectedPack) {
      this.updateForm.patchValue({
        label: this.selectedPack.label,
        price: this.selectedPack.price,
      });

      const prestations = this.updateForm.get('prestations') as FormArray;
      prestations.clear();

      if (this.selectedPack.services && this.selectedPack.services.length > 0) {
        this.selectedPack.services.forEach((service) => {
          const serviceId = typeof service === 'string' ? service : service._id;
          prestations.push(this.fb.control(serviceId));
        });
      }
    }
  }

  trackPrestationById(index: number, prestation: any): string {
    return prestation._id;
  }

  isPrestationSelected(prestationId: string): boolean {
    if (!this.selectedPack || !this.selectedPack.services) {
      return false;
    }

    return this.selectedPack.services.some((service) =>
      typeof service === 'string'
        ? service === prestationId
        : service._id === prestationId
    );
  }

  onSubmit(): void {
    if (this.updateForm.valid && !this.selectedPack) {
      const newPack = {
        ...this.updateForm.value,
      };
      console.log(newPack);
      this.packService
        .savePack(newPack)
        .then(() => {
          this.updateForm.reset();
        })
        .catch((error) => {
          console.error('Error creating pack:', error);
        });
    } else if (this.updateForm.valid && this.selectedPack) {
      const updatedPack = {
        _id: this.selectedPack._id,
        ...this.updateForm.value,
      };

      this.packService
        .updatePack(
          updatedPack._id,
          updatedPack.label,
          updatedPack.price,
          updatedPack.prestations
        )
        .then(
          () => {
            //this.loadPrestations.emit();
          },
          (error) => {
            console.error('Error updating pack:', error);
          }
        );
    }
  }

  onPrestationChange(event: any, prestationId: string): void {
    const prestationsArray = this.updateForm.get('prestations') as FormArray;

    if (event.target.checked) {
      prestationsArray.push(this.fb.control(prestationId));
    } else {
      const index = prestationsArray.controls.findIndex(
        (control) => control.value === prestationId
      );
      if (index !== -1) {
        prestationsArray.removeAt(index);
      }
    }
  }
}
