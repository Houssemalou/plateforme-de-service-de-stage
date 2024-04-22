import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EtudiantComponent } from './étudiant/etudiant/etudiant.component';
import { AdminComponent } from './administration/admin/admin.component';
import { AuthentificationComponent } from './authentification/authentification/authentification.component';
import { TableComponent } from './administration/extrat-etudiant/table/table.component';
import { OffreDeStageComponent } from './administration/offre-de-stage/offre-de-stage.component';
import { LesStagesComponent } from './étudiant/les-stages/les-stages.component';
import { HttpClientModule } from '@angular/common/http';
import { DeroulementComponent } from './étudiant/deroulement/deroulement.component';
import { TacheComponent } from './étudiant/tache/tache.component';
import { KanbanBordComponent } from './étudiant/kanban-bord/kanban-bord.component';
import { TelechargementRapportComponent } from './étudiant/telechargement-rapport/telechargement-rapport.component';
import { MessagerieComponent } from './administration/messagerie/messagerie.component';

@Component({
  selector: 'app-root',
  standalone: true,
  providers:[HttpClientModule],
  imports: [CommonModule,RouterLink,MessagerieComponent, RouterOutlet,TelechargementRapportComponent, EtudiantComponent, AdminComponent, AuthentificationComponent, TableComponent, OffreDeStageComponent, LesStagesComponent, DeroulementComponent, TacheComponent, KanbanBordComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  status = false;
  addToggle()
  {
    this.status = !this.status;       
  }
}
