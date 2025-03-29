import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RendezVousService } from '../../services/rendez_vous/rendez-vous.service';
import { IRendez_vous } from '@/types/output';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-mission',
  standalone: false,
  templateUrl: './create-mission.component.html',
  styleUrl: './create-mission.component.css',
})
export class CreateMissionComponent implements OnInit {
  rendez_vous = signal<IRendez_vous | null>(null);
  form = new FormGroup({
    manager: new FormControl('', [Validators.required]),
    client: new FormControl('', [Validators.required]),
  });
  constructor(
    private route: ActivatedRoute,
    private rendezVousService: RendezVousService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const rdvId = params.get('rdvId');
      if (rdvId) {
        this.getRendezVous(rdvId).then((rendez_vous) => {
          this.rendez_vous.set(rendez_vous);
        });
      }
    });
  }

  async getRendezVous(id: string) {
    try {
      const resp = await this.rendezVousService.findById(id);
      return resp;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
