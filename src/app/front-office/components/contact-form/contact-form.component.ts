import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: false,
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css'],
})
export class ContactFormComponent {
  form: FormGroup;
  minDate: Date = new Date();

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: [new Date(), Validators.required],
      time: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      const splitTime = formData.time.split(':');
      formData.date.setHours(Number(splitTime[0]), Number(splitTime[1]));
      const { time, ...dataToSend } = formData;
      console.log('Form data:', dataToSend);
    }
  }
}
