import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-offre-de-stage',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  templateUrl: './offre-de-stage.component.html',
  styleUrl: './offre-de-stage.component.css'
})
export class OffreDeStageComponent {
  offreStageForm: FormGroup; // Créez un FormGroup

  constructor(private fb: FormBuilder) {
    this.offreStageForm = this.fb.group({
      companyName: ['', Validators.required], // Initialisez les FormControls avec des validateurs
      profile: ['', Validators.required],
      stageDescription: ['', Validators.required],
      duration: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  onSubmit() {
    // Récupérez les données du formulaire ici
    const formData = this.offreStageForm.value;
    console.log('Données du formulaire :', formData);
  }
}
