import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.css'
})
export class AuthentificationComponent {
  submitted = false;
  form = new FormGroup({
   email: new FormControl('', [Validators.required, Validators.email]),
   password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  
  get f(){
    return this.form.controls;
  }
  
  onSubmit() {
  
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    if(this.submitted)
    {
      alert("Great!!");
    }
   
  }
}
