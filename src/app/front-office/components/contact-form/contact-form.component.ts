import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RendezVousService } from '@/app/back-office/services/rendez_vous/rendez-vous.service';

@Component({
  selector: 'app-contact-form',
  standalone: false,
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent {
  form: FormGroup;
  minDate: Date = new Date();

  constructor(
    private fb: FormBuilder,
    private rendez_vousService: RendezVousService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: [new Date(), Validators.required],
      time: ['', Validators.required],
      message: ['', Validators.required],
      contact: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const splitTime = formData.time.split(':');
      formData.date.setHours(Number(splitTime[0]), Number(splitTime[1]));
      const { time, ...dataToSend } = formData;

      const data = {
        date: dataToSend.date,
        info: {
          email: dataToSend.email,
          fullname: dataToSend.name,
          contact: dataToSend.contact,
          message: dataToSend.message,
        },
        duree: 15,
      };
      this.rendez_vousService
        .add_rendez_vous_from_client(data)
        .then(() => {
          this.form.reset();
        })
        .catch((error) => {
          console.error('Error adding rendez-vous:', error);
        });
    }
  }
}
