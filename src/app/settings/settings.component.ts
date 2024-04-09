import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {


    userForm: FormGroup = new FormGroup({
      baseUrl: new FormControl('', [Validators.required]),
      token: new FormControl('', [Validators.required]),
      dailyQueryId: new FormControl('', [Validators.required]),
      monthlyQueryId: new FormControl('', [Validators.required]),
      lastMonthQueryId: new FormControl('', [Validators.required])
    });


    onSubmit() {
  console.log('First Name:', this.userForm.get("baseUrl")?.value);


}

}
