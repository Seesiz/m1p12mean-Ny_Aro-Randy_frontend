import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@/app/back-office/services/user/user.service';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  userForm: FormGroup;
  currentRole: string = '';
  @Output() loadUsers = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
    });

    this.route.params.subscribe((params) => {
      this.currentRole = params['role'];
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService
        .addUser(
          this.userForm.value.lastname,
          this.userForm.value.firstname,
          this.userForm.value.email,
          this.userForm.value.pass,
          [this.currentRole]
        )
        .then(() => {
          this.loadUsers.emit();
        })
        .catch((error) => {
          console.error('Error adding user:', error);
        });
    }
  }
}
