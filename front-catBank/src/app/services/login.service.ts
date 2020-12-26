import { Injectable } from '@angular/core';
import { Login } from '../models/loginModel';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'https://localhost:44300/api/login/authenticate';

  constructor( private http: HttpClient, private _router: Router) {
    console.log('Auth Service Running');
   }
   public isLogged: boolean = false;


  userLogin(login: Login): Observable<string>{
    document.querySelector('#UsernameTag').innerHTML = login.Username;
    document.querySelector('#UsernameTag').classList.add("nav-link")
   
     let header = new HttpHeaders().set('Content-Type', 'aplication/json');
     return this.http.post<string>(this.url, login);
  }


  loggedIn() {
    return !!localStorage.getItem('token')    
  }

  async onLogout(){
    try {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      console.log('borró el token')
      this._router.navigate(['/login'])
    } catch (error) {
      console.log(error)
    }
  }
  
}
