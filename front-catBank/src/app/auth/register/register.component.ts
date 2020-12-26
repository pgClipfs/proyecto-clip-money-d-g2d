import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import {RegisterService} from '../../services/register.service';
import { Register } from 'src/app/models/RegisteModels';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [AuthService]
})
export class RegisterComponent implements OnInit {
  public register: Register[];
  selectedRegister: Register = new Register();

  registerForm= new FormGroup({
    Nombre: new FormControl(''),
    Apellido: new FormControl(''),
    Dni: new FormControl(''),
    Pais: new FormControl(''),
    Localidad: new FormControl(''),
    Mail: new FormControl(''),
    Telefono: new FormControl(''),
    Pass: new FormControl(''),
    Usuario: new FormControl('')
  // registerForm= new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl('')
  });

   constructor(private authSvc:AuthService, private registerService: RegisterService, private router: Router) { }

   ngOnInit(): void {

  }
  // async onRegister(){
  //   //  const{email, password} = this.registerForm.value;
  //   //  try {
  //   //    const user= await this.authSvc.register(email, password);
  //   //    if(user){
  //   //      this.router.navigate(['/home'])
  //   //    }
  //   //  } catch (error) {
  //   //    console.log(error)
  //   //  }
    
  // }
  public onRegister(form: NgForm, register: Register){
    console.log('click')
    const {usuario, password} = this.registerForm.value;
    if ("") //form.invalid
    {
      return;
    }
    else
    {
      console.log('funca')
      this.registerService.onCreateUsuario(register).subscribe(resp =>{
        // localStorage.setItem('token', resp);
        this.router.navigate(['/home'])
        console.log(resp)
      },
      err =>{
        if(err.status == 401) alert("Compruebe su email o contraseña...")
        console.log('error')
      });
    }
    console.log(this.selectedRegister);
    // try {
    //   const user = this.authSvc.login(email, password);
    //   //const user =  this.http.post('http://localhost:44300/api/login/authenticate', {email: email, password: password} )
     
    //   // const user =  this.http.get('http://tlp.news/' )
    //   // console.log('holis')
    //   // console.log(this.http.get('http://tlp.news/' ))
    //   // if (user) {
    //   //   // this.router.navigate(['/home'])
    //   //   console.log('holaa')
    //   // }
    //   this.loginService.userLogin(login).subscribe(resp =>{
    //     localStorage.setItem('token', resp);
    //     this.router.navigateByUrl('/micuenta');
    //     console.log(resp);
    // } 
    // catch (error) {
    //   console.log(error)
    // }
  }

}


(function () {
  'use strict';
  window.addEventListener('load', function () {
    var forms = document.getElementsByClassName('needs-validation')

    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    });
  }, false)
})()
