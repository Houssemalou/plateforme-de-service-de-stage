import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Etudiant } from '../../../models/étudiant';

@Injectable({
  providedIn: 'root'
})
export class ListEtudiantService {
  apiUrl = "http://localhost:3000/etudiant";
  
  constructor(private http : HttpClient) { 
     
  }
  
  
  getStudents():Observable<Etudiant[]>{
    return this.http.get<Etudiant[]>(this.apiUrl)
  }

  getStudentById(code:number){
    return this.http.get<Etudiant>(`${this.apiUrl}/${code}`);
  }

  saveStudent(data:Etudiant){
    console.log(data)
    return this.http.post(this.apiUrl,data);
  }

  deleteStudent(studentId: number): Observable<Etudiant> {
    const url = `${this.apiUrl}/students/${studentId}`;
    return this.http.delete<Etudiant>(url);
  }

  updateStudent(studentId: number, updatedStudent: Etudiant): Observable<Etudiant> {
    const url = `${this.apiUrl}/students/${studentId}`;
    return this.http.put<Etudiant>(url, updatedStudent);
  }
}
