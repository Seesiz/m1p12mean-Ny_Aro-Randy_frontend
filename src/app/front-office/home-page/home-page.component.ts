import { Component, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  @ViewChild('heroSection', { static: true }) heroSection!: ElementRef;
  @ViewChild('heroText', { static: true }) heroText!: ElementRef;

  ngAfterViewInit() {
    //Text animation
    const letters = this.heroText.nativeElement.querySelectorAll('span');
    letters.forEach((letter: any, index: number) => {
      gsap.fromTo(
        letter,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          delay: index * 0.1,
          duration: 1,
          ease: 'power3.out',
        }
      );
    });
    //Line
    gsap.fromTo(
      '#animated-line',
      { width: '0' },
      { width: '33%', duration: 2 }
    );
  }
}
