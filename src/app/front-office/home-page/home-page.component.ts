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
  @ViewChild('heroText', { static: true }) heroText!: ElementRef;
  @ViewChild('aboutUsSection', { static: true }) aboutUsSection!: ElementRef;
  @ViewChild('aboutUsText', { static: true }) aboutUsText!: ElementRef;
  @ViewChild('leftBlock', { static: true }) leftBlock!: ElementRef;
  @ViewChild('middleBlock', { static: true }) middleBlock!: ElementRef;
  @ViewChild('rightBlock', { static: true }) rightBlock!: ElementRef;
  @ViewChild('whyChooseUsSection', { static: true })
  whyChooseUsSection!: ElementRef;
  @ViewChild('whyChooseUsText', { static: true })
  whyChooseUsText!: ElementRef;

  ngAfterViewInit() {
    //Text animation
    const letters = this.heroText.nativeElement.querySelectorAll('span');
    letters.forEach((letter: any, index: number) => {
      gsap.fromTo(
        letter,
        { opacity: 0 },
        {
          opacity: 1,
          delay: index * 0.1,
          duration: 1,
          ease: 'power4.inOut',
        }
      );
    });
    //Line
    gsap.fromTo(
      '#animated-line',
      { width: '0' },
      { width: '33%', duration: 2 }
    );
    // Animation "About Us"
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.aboutUsSection.nativeElement,
        start: 'top 30%',
        end: 'bottom 50%',
      },
    });

    tl.to(this.aboutUsText.nativeElement, {
      opacity: 1,
      translateY: 0,
      duration: 1,
      ease: 'power4.inOut',
    });
    tl.fromTo(
      this.leftBlock.nativeElement,
      {
        translateX: '50%',
        opacity: 0,
      },
      {
        translateX: '30%',
        duration: 1,
        opacity: 1,
        ease: 'power4.inOut',
      },
      0
    );
    tl.to(
      this.middleBlock.nativeElement,
      {
        transform: 'scale(1.1)',
        duration: 1,
        ease: 'power4.inOut',
      },
      0
    );
    tl.fromTo(
      this.rightBlock.nativeElement,
      {
        translateX: '-50%',
        opacity: 0,
      },
      {
        translateX: '-30%',
        duration: 1,
        opacity: 1,
        ease: 'power4.inOut',
      },
      0
    );
    // Animation "Why Choose Us"
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: this.whyChooseUsSection.nativeElement,
        start: 'top 0%',
        end: 'bottom 100%',
        pin: true,
        pinnedContainer: this.whyChooseUsSection.nativeElement,
        pinSpacing: false,
      },
    });
    tl2.fromTo(
      this.whyChooseUsText.nativeElement,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'bounce.out' },
      0
    );
  }
}
