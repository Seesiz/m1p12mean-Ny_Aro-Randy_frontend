import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrestationService } from '../../services/prestation/prestation.service';
import { IPrestation } from '@/types/output';

@Component({
  selector: 'app-update',
  standalone: false,
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit, OnChanges {
  updateForm!: FormGroup;
  isSubmit: boolean = false;
  @Input() selectedPrestation: IPrestation | null = null;
  @Output() loadServices = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private prestationService: PrestationService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedPrestation'] && this.selectedPrestation) {
      this.updateForm.patchValue({
        label: this.selectedPrestation.label,
        description: this.selectedPrestation.description,
        price: this.selectedPrestation.price,
        duree: this.selectedPrestation.duree,
        status: this.selectedPrestation.type?.status || 0,
      });
    }
  }

  private initForm(): void {
    this.updateForm = this.fb.group({
      label: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      duree: [0, [Validators.required, Validators.min(0)]],
      status: [0, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid && this.selectedPrestation) {
      this.isSubmit = true;
      const updatedPrestation = {
        ...this.selectedPrestation,
        label: this.updateForm.value.label,
        description: this.updateForm.value.description,
        price: this.updateForm.value.price,
        duree: this.updateForm.value.duree,
        type: {
          ...this.selectedPrestation.type,
          status: this.updateForm.value.status,
        },
      };

      this.prestationService
        .updatePrestation(updatedPrestation)
        .then(() => {
          this.loadServices.emit();
        })
        .catch((error) => {
          console.error('Error updating prestation:', error);
        })
        .finally(() => {
          this.isSubmit = false;
        });
    }
  }
}
