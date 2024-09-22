import { Routes } from '@angular/router';
import { DeroulementComponent } from './étudiant/deroulement/deroulement.component';
import { TacheComponent } from './étudiant/tache/tache.component';
import { KanbanBordComponent } from './étudiant/kanban-bord/kanban-bord.component';
import { TelechargementRapportComponent } from './étudiant/telechargement-rapport/telechargement-rapport.component';
import { EtudiantComponent } from './étudiant/etudiant/etudiant.component';
import { LesStagesComponent } from './étudiant/les-stages/les-stages.component';
import { AuthentificationComponent } from './authentification/authentification/authentification.component';
import { DashboardComponent } from './étudiant/dashboard/dashboard.component';


export const routes: Routes = [
    { path: '', component: AuthentificationComponent },
    {
        path: 'etudiant', component: EtudiantComponent, children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            {path:'dashboard', component : DashboardComponent},
            { path: 'calendar', component: DeroulementComponent },
            { path: 'taches', component: TacheComponent },
            { path: 'kanban-bord', component: KanbanBordComponent },
            { path: 'upload-report', component: TelechargementRapportComponent },
            { path: 'stages', component: LesStagesComponent }
        ]
    },
];
