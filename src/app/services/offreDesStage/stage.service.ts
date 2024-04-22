import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Stage } from '../../../models/stage';

@Injectable({
  providedIn: 'root'
})
export class StageService {
  apiUrl = "";
  constructor(private http: HttpClient) { }

  getInterships():Observable<Stage[]>{
    return this.http.get<Stage[]>(this.apiUrl)
  }

  saveIntership(data:Stage){
    console.log(data)
    return this.http.post(this.apiUrl,data);
  }

  deleteIntership(intershipId: number): Observable<Stage> {
    const url = `${this.apiUrl}/students/${intershipId}`;
    return this.http.delete<Stage>(url);
  }
}
