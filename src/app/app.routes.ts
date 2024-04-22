import { Routes } from '@angular/router';
import { DeroulementComponent } from './étudiant/deroulement/deroulement.component';
import { TacheComponent } from './étudiant/tache/tache.component';
import { KanbanBordComponent } from './étudiant/kanban-bord/kanban-bord.component';
import { TelechargementRapportComponent } from './étudiant/telechargement-rapport/telechargement-rapport.component';
import { EtudiantComponent } from './étudiant/etudiant/etudiant.component';


export const routes: Routes = [
    {path:'',component : EtudiantComponent},
    {path:'calendrier',component : DeroulementComponent},
    {path:'taches',component:TacheComponent},
    {path:'kanban-bord',component : KanbanBordComponent}, 
    {path:'upload-report',component : TelechargementRapportComponent}
    
];
