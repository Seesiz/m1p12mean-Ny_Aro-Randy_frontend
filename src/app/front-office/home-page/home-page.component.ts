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
    const cursorFollow = document.getElementById('cursor-follow')!;
    const hero = document.getElementById('hero')!;

    hero.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      gsap.to(cursorFollow, {
        duration: 0.2,
        x: mouseX - 20,
        y: mouseY - 20,
        opacity: 1,
      });
    });

    hero.addEventListener('mouseout', () => {
      gsap.to(cursorFollow, {
        duration: 0.2,
        opacity: 0,
      });
    });
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
