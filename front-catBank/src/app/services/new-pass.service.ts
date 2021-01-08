import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { newPass } from '../models/newPassModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewPassService {

  url = 'https://localhost:44300/api';

  constructor(private http: HttpClient, private router: Router) { }

  resetPass(newPass: newPass): Observable<string>{
    let header = new HttpHeaders().set('Content-Type', 'aplication/json');
     return this.http.post<string>(this.url+'/startReset/resetPass', newPass);
  }

}
