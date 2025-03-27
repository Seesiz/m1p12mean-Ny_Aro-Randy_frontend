import { SideBarMenuOption } from '@/types/side-bar-menu-option';
import {
  Component,
  ElementRef,
  Renderer2,
  AfterViewInit,
  Input,
  OnDestroy,
  OnInit,
  Inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AuthService } from '@/app/back-office/services/auth/auth.service';
import { DOCUMENT } from '@angular/common';
import { LocaleService } from '@/app/services/locale.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: false,
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements AfterViewInit, OnDestroy, OnInit {
  @Input() options: SideBarMenuOption[] = [];
  private routerEventsSubscription!: Subscription;
  private resizeTimeout!: any;

  langueValue = signal<'fr' | 'en'>('fr');
  isDarkMode = signal(false);
  routerLinkActive = signal('');

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private translate: TranslateService,
    private authService: AuthService,
    @Inject(DOCUMENT) private document: Document,
    private localeService: LocaleService
  ) {}

  ngOnInit(): void {
    setInterval(() => {
      this.updateActiveButtonPosition();
    }, 100);
    if (localStorage.getItem('theme')) {
      this.setTheme(localStorage.getItem('theme') === 'dark');
    }
    if (localStorage.getItem('langue')) {
      this.setLangue(localStorage.getItem('langue') === 'fr' ? 'fr' : 'en');
    }

    this.routerLinkActive.set(this.router.url);

    this.routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routerLinkActive.set(event.url);

        const activeOption = this.options.find((option) =>
          option.subOptions?.some(
            (subOption) => subOption.path === this.routerLinkActive()
          )
        );

        if (activeOption) {
          this.routerLinkActive.set(activeOption.path);
        }
        this.updateActiveButtonPosition();
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }
  setLangue(langue: 'fr' | 'en') {
    this.langueValue.set(langue);
    this.localeService.setLocale(langue);
    this.translate.use(langue);

    setTimeout(() => {
      this.updateActiveButtonPosition();
    }, 100);
  }

  setTheme(value: boolean) {
    this.isDarkMode.set(value);
    localStorage.setItem('theme', value ? 'dark' : 'light');
    if (value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  ngAfterViewInit() {
    window.addEventListener('resize', this.onResize);
  }

  ngOnDestroy() {
    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }

    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    window.removeEventListener('resize', this.onResize);
  }

  private updateActiveButtonPosition() {
    const activeButton = this.el.nativeElement.querySelector('.active-button');
    const activeButtonElement = this.el.nativeElement.querySelector(
      '.header-option.is-active'
    );

    if (activeButton && activeButtonElement) {
      const rect = activeButtonElement.getBoundingClientRect();
      const activeRect = activeButton.getBoundingClientRect();

      this.renderer.setStyle(
        activeButton,
        'left',
        `${rect.left + rect.width / 2 - activeRect.width / 2 - 8}px`
      );
    }
  }

  private onResize = () => {
    if (this.resizeTimeout) {
      clearTimeout(this.resizeTimeout);
    }
    this.resizeTimeout = setTimeout(() => {
      this.updateActiveButtonPosition();
    }, 100);
  };
}
