import {FormGroup, FormControl} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {LoginService} from '../../services/login.service'
import { Login } from 'src/app/models/loginModel';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  public login: Login[];
  selectedLogin: Login = new Login();

  loginForm= new FormGroup({
    usuario: new FormControl(''),
    password: new FormControl('')
  })
  constructor(private authSvc: AuthService,private loginService: LoginService, private router: Router) { 
    // const login = new Login()
    // login.usuario = 'maria'
    // login.pass = 'maria'
    // this.loginService.userLogin(login)
  }
  

  ngOnInit(): void {

  }
  public onLogin(form: NgForm, login: Login){
    console.log('click')
    const {usuario, password} = this.loginForm.value;
    if (form.invalid)
    {
      return;
    }
    else
    {
      console.log('funca')
      this.loginService.userLogin(login).subscribe(resp =>{
        localStorage.setItem('token', resp);
        this.router.navigate(['/home'])
        console.log(resp)
      },
      err =>{
        if(err.status == 401) alert("Compruebe su email o contraseña...")
      });
    }
    console.log(this.selectedLogin);
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
