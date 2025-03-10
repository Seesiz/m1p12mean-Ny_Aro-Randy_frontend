import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  protected notifications = [
    {
      id: 1,
      title: 'Your call has been confirmed.',
      description: '1 hour ago',
    },
    {
      id: 2,
      title: 'You have a new message!',
      description: '1 hour ago',
    },
    {
      id: 3,
      title: 'Your subscription is expiring soon!',
      description: '2 hours ago',
    },
  ];
}
