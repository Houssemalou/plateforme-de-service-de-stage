import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Etudiant } from '../../../../models/étudiant';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { EtudiantInfoComponent } from '../etudiant-info/etudiant-info.component';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatPaginatorModule, MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule,MatCardModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  etudiants : Etudiant[]=[{
    nom : "sami nefzi",
    email:"aloui9861@gmail.com",
    tel:24655913,
    specialite:"info",
    encadrant: "ali balha",
    datePfe: new Date(24-2-2024)
  },
  {
    nom : "zitouni ali",
    email:"aloui9861@gmail.com",
    tel:24655913,
    specialite:"info",
    encadrant: "ali balha",
    datePfe: new Date(24-4-2024)
  },
  {
    nom : "aloui houssem",
    email:"aloui9861@gmail.com",
    tel:24655913,
    specialite:"info",
    encadrant: "ali balha",
    datePfe: new Date(24-5-2024)
   
  }];

  displayedColumns: string[] = ["nom", "email", "tel", "specialite","encadrant", "datePfe","action"];
  dataSource = new MatTableDataSource<Etudiant>(this.etudiants);
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
    constructor(private dialog : MatDialog){}
    
    ngOnInit(): void {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }

    Filterchange(data: Event) {
      const value = (data.target as HTMLInputElement).value;
      this.dataSource.filter = value;
    }

    editStudent(code: number) {
      this.Openpopup(code, 'modifier les informations',EtudiantInfoComponent);
    }
  
    addStudent(){
      this.Openpopup(0, 'ajouter un étudient',EtudiantInfoComponent);
    }
    
    deleteStudent(nom : string, code:number){
      this.Openpopup(code, nom,EtudiantInfoComponent);
    }
    Openpopup(code: number, title: any,component:any) {
      var _wd = title === "modifier les informations"|| title === "ajouter un étudient" ? "60%":"auto";
      var _popup = this.dialog.open(component, {
        width: _wd,
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        data: {
          title: title,
          code: code
        }
      });
      _popup.afterClosed().subscribe(item => {
        // console.log(item)
      })
    }
}
