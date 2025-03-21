import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@/app/back-office/services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocaleService } from '@/app/services/locale.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  type!: 'MANAGER' | 'CLIENT' | 'MECANIC';

  constructor(
    private fb: FormBuilder,
    private translate: TranslateService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private localeService: LocaleService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const typeParam = params.get('type');
      if (
        typeParam &&
        ['MANAGER', 'CLIENT', 'MECANIC'].includes(typeParam.toUpperCase())
      ) {
        this.type = typeParam.toUpperCase() as 'MANAGER' | 'CLIENT' | 'MECANIC';
      } else {
        this.type = 'CLIENT';
      }
    });

    const role = localStorage.getItem('role');
    if (
      localStorage.getItem('user') &&
      localStorage.getItem('token') &&
      role &&
      role === this.type
    ) {
      this.router.navigate([
        `dashboard/${this.type.toLowerCase()}/statistique`,
      ]);
    }
  }

  setTranslation(lang: string) {
    this.translate.use(lang);
    this.localeService.setLocale(lang);
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const response = await this.authService.login(
        this.loginForm.value.email,
        this.loginForm.value.password,
        this.type
      );

      if (response.token && response.user) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('role', this.type);

        this.router.navigate([
          `dashboard/${this.type.toLowerCase()}/statistique`,
        ]);
      }
    }
  }
}
