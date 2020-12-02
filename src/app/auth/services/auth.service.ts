import {AngularFireAuth} from '@angular/fire/auth'
import { Injectable } from '@angular/core';
import {first} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()

export class AuthService {
  constructor(public afAuth: AngularFireAuth) { }

  async login(email:string, password: string) {
    try {
      const RESULT = await this.afAuth.signInWithEmailAndPassword(
        email, 
        password
        );
        return RESULT;
    } catch (error) {
      console.log(error)
       let errorMessage= document.querySelector('.error_message')
       errorMessage.textContent = 'Datos inválidos.'
    
    }
  }

  async register(email:string, password:string){
    try {
      const RESULT = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return RESULT;
    } catch (error) {
      console.log(error)
      
    }
  }
  async logout(){
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error)
      
    }
  }
}

// export class LoginService {
//   constructor(private http: HttpClient) {
//     console.log("Persona service is running");
//   }
//   getUserAndPass() {
//     console.log('obtengo datos')
//     this.http.get('http://localhost:44300/api/login/1433')
//     .subscribe(Response => {
//       console.log(Response)
//       return Response
//     })
//   }
// }
