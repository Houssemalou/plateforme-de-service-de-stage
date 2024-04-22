import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ListEtudiantService } from '../../../services/etudiant/list-etudiant.service';
import { Etudiant } from '../../../../models/étudiant';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-etudiant-info',
  standalone: true,
  providers:[ListEtudiantService],
  imports: [MatButtonModule,MatDatepickerModule,MatInputModule,MatNativeDateModule,MatFormFieldModule,ReactiveFormsModule, CommonModule],
  templateUrl: './etudiant-info.component.html',
  styleUrl: './etudiant-info.component.css'
})
export class EtudiantInfoComponent {
  submitted = false;
  inputdata: any;
  editdata!: Etudiant;
  closemessage = 'closed using directive'
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<EtudiantInfoComponent>, private buildr : FormBuilder,
    private service: ListEtudiantService) {

  }
  ngOnInit(): void {
    this.inputdata = this.data;
    if(this.inputdata.code>0){
      this.setStudentData(this.inputdata.code)
    }
  }

  setStudentData( code: number) {
    this.service.getStudentById(code).subscribe(item => {
      this.editdata = item;
      this.etudiantForm.setValue({nom:this.editdata.nom,email:this.editdata.email,tel:this.editdata.tel,
      specialite:this.editdata.specialite, encadrant:this.editdata.encadrant, datePfe:this.editdata.datePfe})
    });
  }

  closepopup() {
    this.ref.close('Closed using function');
  }

  etudiantForm : FormGroup = new FormGroup({
    nom: new FormControl('', [Validators.required]),
    prenom: new FormControl('',[ Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tel: new FormControl('', [Validators.required, Validators.pattern('[2-5-9][0-9]*')]),
    specialite: new FormControl('',[ Validators.required]),
    encadrant: new FormControl('',[ Validators.required]),
    datePfe: new FormControl('',[ Validators.required])
  });

  get f(){
    return this.etudiantForm.controls;
  }
  

  saveStudent() {
    this.submitted = true;
    if (this.etudiantForm.invalid) {
      return;
    }
    if(this.inputdata.code === 0 ){
      this.service.saveStudent(this.etudiantForm.value).subscribe(res => {
        this.closepopup();  });
    }
    this.service.updateStudent(this.inputdata.code,this.etudiantForm.value).subscribe(res => {
      this.closepopup();
    })
    
  
  }

  supprimerStudent(id :number){
    this.service.deleteStudent(id).subscribe(res => {
      
    })
    this.closepopup();
  }
}
