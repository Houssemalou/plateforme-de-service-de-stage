import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-etudiant',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, FooterComponent],
  templateUrl: './etudiant.component.html',
  styleUrl: './etudiant.component.css'
})
export class EtudiantComponent {
    //Sidebar toggle show hide function
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }

  activeLink : string = '';
  
  setActiveLink(link : string){
    this.activeLink = link;
  }
}
