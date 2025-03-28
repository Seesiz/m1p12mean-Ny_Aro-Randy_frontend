import { IPack, IPrestation } from '@/types/output';
import {
  Component,
  Input,
  signal,
  SimpleChanges,
  effect,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackService } from '../../services/pack/pack.service';

type Framework = { label: string; value: string };

@Component({
  selector: 'app-update',
  standalone: false,
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent {
  @Input() selectedPack: IPack | null = null;
  @Input() prestations: IPrestation[] = [];
  @Output() loadPack = new EventEmitter<void>();

  public currentPrestations = signal<IPrestation[]>([]);
  public state = signal<'closed' | 'open'>('closed');
  selectablePrestations = signal<IPrestation[]>([]);

  updateForm: FormGroup;

  constructor(private fb: FormBuilder, private packService: PackService) {
    this.updateForm = this.fb.group({
      label: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      prestations: [[]],
    });

    effect(() => {
      this.updateForm
        .get('prestations')
        ?.setValue(this.currentPrestations().map((p) => p._id));
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['prestations']) {
      this.selectablePrestations.set(this.prestations);
    }
    if (changes['selectedPack'] && this.selectedPack) {
      this.updateForm.patchValue({
        label: this.selectedPack.label,
        price: this.selectedPack.price,
      });
      this.currentPrestations.set(this.selectedPack.services);
      if (
        this.selectedPack &&
        this.selectedPack.services &&
        this.selectedPack.services.length > 0
      ) {
        this.selectablePrestations.set(
          this.prestations.filter(
            (p) => !this.selectedPack?.services.some((s) => s._id === p._id)
          )
        );

        this.updateForm
          .get('prestations')
          ?.setValue(this.selectedPack.services.map((s) => s._id));
      }
    }
  }

  onSubmit(): void {
    if (this.updateForm.valid && !this.selectedPack) {
      const newPack = {
        ...this.updateForm.value,
      };
      this.packService
        .savePack(newPack)
        .then(() => {
          this.updateForm.reset();
          this.loadPack.emit();
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
            this.loadPack.emit();
          },
          (error) => {
            console.error('Error updating pack:', error);
          }
        );
    }
  }

  stateChanged(state: 'open' | 'closed') {
    this.state.set(state);
  }

  commandSelected(prestation: IPrestation) {
    this.state.set('closed');
    this.currentPrestations.update((value) => [...value, prestation]);
    this.selectablePrestations.update((value) =>
      value.filter((p) => p._id !== prestation._id)
    );
  }

  removePrestation(prestation: IPrestation) {
    this.currentPrestations.update((value) =>
      value.filter((p) => p._id !== prestation._id)
    );
    this.selectablePrestations.update((value) => [...value, prestation]);
  }
}
