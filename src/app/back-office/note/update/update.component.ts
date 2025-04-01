import { Component, Output, EventEmitter, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../../services/note/note.service';
import { IUser } from '@/types/output';

@Component({
  selector: 'app-update',
  standalone: false,
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent {
  updateForm: FormGroup;
  @Output() loadNote = new EventEmitter<void>();
  connectedUser = signal<IUser | null>(null);

  constructor(private fb: FormBuilder, private noteService: NoteService) {
    this.connectedUser.set(JSON.parse(localStorage.getItem('user') || '{}'));
    this.updateForm = this.fb.group({
      fullName: [
        this.connectedUser()?.firstname + ' ' + this.connectedUser()?.lastname,
        Validators.required,
      ],
      note: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.updateForm.valid) {
      const note = this.updateForm.value;
      this.noteService
        .add(note)
        .then(() => {
          this.updateForm.reset();
          this.loadNote.emit();
        })
        .catch((error) => {
          console.error('Error creating note:', error);
        });
    }
  }
}
