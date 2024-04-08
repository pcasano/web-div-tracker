import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {


  baseUrl: string;
  token: string;

  baseUrlControl = new FormControl('');
  tokenControl = new FormControl('');

  userForm: FormGroup = new FormGroup({
    baseUrl: new FormControl('', [Validators.required]),
    token: new FormControl('', [Validators.required]),
    dailyQueryId: new FormControl('', [Validators.required]),
    monthlyQueryId: new FormControl('', [Validators.required]),
    lastMonthQueryId: new FormControl('', [Validators.required])
});

submitForm() {
  console.log('First Name:', this.baseUrl);
  console.log('Last Name:', this.token);
  // Here you can implement form submission logic
}

}
