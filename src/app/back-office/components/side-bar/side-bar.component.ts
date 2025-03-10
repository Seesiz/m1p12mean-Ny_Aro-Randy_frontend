import { SideBarMenuOption } from '@/types/side-bar-menu-option';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  standalone: false,
  styleUrl: './side-bar.component.css',
})
export class SideBarComponent {
  @Input() options: SideBarMenuOption[] = [];

  ngOnInit(): void {
    console.log(this.options);
  }
}
