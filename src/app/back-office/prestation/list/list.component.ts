import { Component } from '@angular/core';
import { IPrestation } from '@/types/output';
import { PrestationService } from '@/app/back-office/services/prestation/prestation.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  prestations: IPrestation[] = [];
  constructor(private prestationsService: PrestationService) {}

  ngOnInit(): void {
    this.prestationsService.getAllPrestations().then((prestations) => {
      this.prestations = prestations;
    });
  }
}
