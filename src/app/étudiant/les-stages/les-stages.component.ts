import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-les-stages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './les-stages.component.html',
  styleUrl: './les-stages.component.css'
})
export class LesStagesComponent {
  offres = [
    {
      title: 'Développeur Front-End',
      company: 'ABC Tech',
      location: 'Paris, France',
      duration: '6 mois',
      description: 'Concevez et développez des interfaces utilisateur réactives pour nos applications Web.',
      isExpanded: false,
    },
    {
      title: 'Analyste de Données',
      company: 'XYZ Analytics',
      location: 'Montréal, Canada',
      duration: '4 mois',
      description: 'Analysez les données clients et proposez des solutions pour améliorer la performance.',
      isExpanded: false,
    },
    // Ajoutez plus d'offres ici
  ];
}
