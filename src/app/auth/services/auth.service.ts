import {AngularFireAuth} from '@angular/fire/auth'
import { Injectable } from '@angular/core';
// import {auth} from "firebase/app";
// import { User } from "firebase";
import {first} from 'rxjs/operators';
@Injectable()
export class AuthService {
  public user: '';
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
  getCurrentUser(){
    try {
      return this.afAuth.authState.pipe(first()).toPromise();
    } catch (error) {
      console.log(error)
    }
  }
}
