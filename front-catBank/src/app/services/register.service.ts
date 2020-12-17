import { Injectable } from '@angular/core';
import { Login } from '../models/loginModel';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Register } from '../models/RegisteModels';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url = 'https://localhost:44300/api/persona';
  list:Register[]
  constructor(private http: HttpClient) {
    console.log('Register Service Running');
   }
   getUsuarios(): Observable<Register[]>{
    let header = new HttpHeaders().set('Content-Type','application/json');
    return this.http.get<Register[]>(this.url);
  }

  onDeleteUsuario(id:number): Observable<number>{
    let header = new HttpHeaders().set('Content-Type','application/json');
    return this.http.delete<number>(this.url + "/" + id);
  }

  onCreateUsuario(usuario:Register): Observable<Register>{
    let header = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post<Register>(this.url, usuario);
  }

  onUpdateUsuario (usuario:Register): Observable<Register>{
    let header = new HttpHeaders().set('Content-Type','application/json');
    return this.http.put<Register>(this.url, usuario);
  }
}
