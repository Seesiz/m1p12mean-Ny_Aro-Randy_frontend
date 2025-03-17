import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { IUser, IRole } from '@/types/output';
import { UserService } from '@/app/back-office/services/user/user.service';
import { RoleService } from '@/app/back-office/services/role/role.service';

@Component({
  selector: 'app-update',
  standalone: false,
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css'],
})
export class UpdateComponent implements OnInit, OnChanges {
  @Input() selectedUser: IUser | null = null;
  type!: 'MANAGER' | 'CLIENT' | 'MECANIC';

  updateForm: FormGroup;
  roles: IRole[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService
  ) {
    this.updateForm = this.fb.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
    this.loadRoles();
  }

  isRoleSelected(roleId: string): boolean {
    if (!this.selectedUser || !this.selectedUser.roles) {
      return false;
    }

    return this.selectedUser.roles.some((role) =>
      typeof role === 'string' ? role === roleId : role._id === roleId
    );
  }

  onRoleChange(event: any, roleId: string): void {
    const rolesArray = this.updateForm.get('roles') as FormArray;

    if (event.target.checked) {
      rolesArray.push(this.fb.control(roleId));
    } else {
      const index = rolesArray.controls.findIndex(
        (control) => control.value === roleId
      );
      if (index !== -1) {
        rolesArray.removeAt(index);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedUser'] && this.selectedUser) {
      console.log(`Faire appelle à l'user avec l'id ${this.selectedUser?._id}`);

      this.findUserById(this.selectedUser._id);
      this.updateForm.patchValue({
        lastname: this.selectedUser.lastname,
        firstname: this.selectedUser.firstname,
        email: this.selectedUser.email,
        pass: this.selectedUser.pass,
      });

      const rolesArray = this.updateForm.get('roles') as FormArray;
      rolesArray.clear();

      if (this.selectedUser.roles && this.selectedUser.roles.length > 0) {
        this.selectedUser.roles.forEach((role) => {
          const roleId = typeof role === 'string' ? role : role._id;
          rolesArray.push(this.fb.control(roleId));
        });
      }
    }
  }

  /*ngOnChanges(changes: SimpleChanges): void {
    // Mettre à jour le formulaire quand l'utilisateur sélectionné change
    if (changes['selectedUser'] && this.selectedUser) {
      this.updateForm.patchValue({
        lastname: this.selectedUser.lastname,
        firstname: this.selectedUser.firstname,
        email: this.selectedUser.email,
      });
    }
  }*/

  onSubmit(): void {
    if (this.updateForm.valid && this.selectedUser) {
      const updatedUser = {
        ...this.selectedUser,
        ...this.updateForm.value,
      };

      this.userService
        .updateUser(
          updatedUser._id,
          updatedUser.lastname,
          updatedUser.firstname,
          updatedUser.email,
          updatedUser.pass,
          updatedUser.roles
        )
        .then(
          () => {
            window.location.reload();
            console.log('User updated successfully');
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        );
    }
  }

  private loadRoles(): void {
    this.roleService
      .getAll()
      .then((roles) => {
        this.roles = roles;
      })
      .catch((error) => {
        console.error('Error loading roles:', error);
      });
  }

  trackRoleById(index: number, role: any): string {
    return role._id;
  }

  findUserById(id: string): void {
    this.userService
      .getUserById(id)
      .then((user) => {
        this.selectedUser = user;
      })
      .catch((error) => {
        console.error('Error loading user:', error);
      });
  }
}
