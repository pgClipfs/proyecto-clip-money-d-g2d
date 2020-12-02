import { Injectable } from '@angular/core';
import { Login } from '../models/loginModel';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'https://localhost:44300/api/login/authenticate';

  constructor( private http: HttpClient) {
    console.log('Auth Service Running');
   }
   public isLogged: boolean = false;

  getUserName() {
    return 'Pablo';
  }

  userLogin(login: Login): Observable<string>{
    // const data = new Login()
    // data.usuario = login.usuario
    // data.pass = login.pass
    // this.http.post('http://localhost:44300/', data)
    // .subscribe(Response => {
    //   console.log(Response)
    // }
    console.log(login)
   
     let header = new HttpHeaders().set('Content-Type', 'aplication/json');
     return this.http.post<string>(this.url, login);
   
  }
}
