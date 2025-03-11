import { SideBarMenuOption } from '@/types/side-bar-menu-option';
import {
  Component,
  ElementRef,
  Renderer2,
  AfterViewInit,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

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

  isDarkMode: boolean = false;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('theme')) {
      this.setTheme(localStorage.getItem('theme') === 'dark');
    }
  }

  setTheme(value: boolean) {
    this.isDarkMode = value;
    localStorage.setItem('theme', value ? 'dark' : 'light');
    if (value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  ngAfterViewInit() {
    this.routerEventsSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.updateActiveButtonPosition();
        }, 100);
      }
    });

    setTimeout(() => {
      this.updateActiveButtonPosition();
    }, 100);

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
