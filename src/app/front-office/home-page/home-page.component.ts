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
  @ViewChild('aboutUsSection', { static: true }) aboutUsSection!: ElementRef;
  @ViewChild('aboutUsText', { static: true }) aboutUsText!: ElementRef;
  @ViewChild('leftBlock', { static: true }) leftBlock!: ElementRef;
  @ViewChild('middleBlock', { static: true }) middleBlock!: ElementRef;
  @ViewChild('rightBlock', { static: true }) rightBlock!: ElementRef;
  @ViewChild('whyChooseUsSection', { static: true })
  whyChooseUsSection!: ElementRef;
  @ViewChild('whyChooseUsTrack', { static: true })
  whyChooseUsTrack!: ElementRef;
  @ViewChild('whyChooseUsText', { static: true })
  whyChooseUsText!: ElementRef;

  ratedUsers: RatedUser[] = ratedUsers;

  ngAfterViewInit() {
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
      this.whyChooseUsTrack.nativeElement,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: 'elastic.out' },
      0
    );
    const textUp =
      this.whyChooseUsTrack.nativeElement.querySelectorAll('.text-up');

    textUp.forEach((text: any) => {
      const startValue = text.getAttribute('data-start');
      const speed = text.getAttribute('data-speed');
      tl2.fromTo(
        text,
        { top: startValue },
        {
          top: `calc(${startValue} - 200%)`,
          ease: 'power4.inOut',
          scrollTrigger: { scrub: +speed },
        },
        0
      );
    });
  }
}

interface RatedUser {
  name: string;
  rating: number;
  scale: string;
  left: string;
  start: string;
  speed: string;
}

const ratedUsers: RatedUser[] = [
  {
    name: 'ANDRIAMPARANY Ny Aro',
    rating: 4,
    left: '60%',
    start: '100%',
    scale: '1',
    speed: '1',
  },
  {
    name: 'RAJAONSON Randy',
    rating: 5,
    left: '10%',
    scale: '0.9',
    start: '130%',
    speed: '0.5',
  },
  {
    name: 'JOHN DOE',
    rating: 5,
    scale: '0.8',
    left: '50%',
    start: '160%',
    speed: '0.8',
  },
];
