import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { INote } from '@/types/output';
import { NoteService } from '@/app/back-office/services/note/note.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  animations: [
    trigger('fadeInOut', [
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      state('hidden', style({ opacity: 0, transform: 'translateY(20px)' })),
      transition('hidden => visible', [animate('500ms ease-in')]),
      transition('visible => hidden', [animate('500ms ease-out')]),
    ]),
  ],
})
export class ListComponent implements OnInit {
  // testimonials: INote[] = [
  //   {
  //     description:
  //       "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
  //     fullName: 'Sarah Chen',
  //     note: 1,
  //     src: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   },
  //   {
  //     description:
  //       "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
  //     fullName: 'Michael Rodriguez',
  //     note: 2,
  //     src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   },
  //   {
  //     description:
  //       "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
  //     fullName: 'Emily Watson',
  //     note: 3,
  //     src: 'https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   },
  //   {
  //     description:
  //       "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
  //     fullName: 'James Kim',
  //     note: 4,
  //     src: 'https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   },
  //   {
  //     description:
  //       'The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.',
  //     fullName: 'Lisa Thompson',
  //     note: 5,
  //     src: 'https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //   },
  // ];

  testimonials: INote[] = [];

  currentIndex = 0;
  animationState = 'visible';

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    this.loadNote();
    this.startRotation();
  }

  loadNote() {
    this.noteService.getAll().then((notes) => {
      this.testimonials = notes;
    });
  }

  startRotation(): void {
    setInterval(() => {
      this.animationState = 'hidden';

      setTimeout(() => {
        this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
        this.animationState = 'visible';
      }, 500);
    }, 5000);
  }
}
