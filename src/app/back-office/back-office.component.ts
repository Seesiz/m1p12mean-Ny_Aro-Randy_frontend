import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-office',
  standalone: false,
  templateUrl: './back-office.component.html',
  styleUrl: './back-office.component.css',
})
export class BackOfficeComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
