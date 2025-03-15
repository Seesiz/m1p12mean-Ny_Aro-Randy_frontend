import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '@/app/back-office/services/user/user.service';
@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  userForm: FormGroup;
  type!: 'MANAGER' | 'CLIENT' | 'MECANIC';
  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    //to do get all role
  }
  async onSubmit() {
    if (this.userForm.valid) {
      const response = await this.userService.addUser(
        this.userForm.value.lastname,
        this.userForm.value.firstname,
        this.userForm.value.email,
        this.userForm.value.pass
      );
    }
  }
}
