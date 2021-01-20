import {FormGroup, FormControl} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {LoginService} from '../../services/login.service';
import { Login } from 'src/app/models/loginModel';
import { NgForm } from '@angular/forms';
import { Mail } from 'src/app/models/mailModel';




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
  public mail: Mail[];
  selectedMail: Mail = new Mail();
  mailForm= new FormGroup({
    mail: new FormControl('')
    
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
    let msj = document.querySelector('.msj')
    if ('') //form.invalid
    {
      // let msj = document.querySelector('.msj')
      console.log("a")
      msj.innerHTML = "contraseña o usuario erroneo"
      return;
    }
    else
    {
      msj.innerHTML= ""
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
  }

  public checkMail(form: NgForm, mail: Mail) {
    console.log(this.selectedMail)
    console.log(mail)
    this.loginService.sendMail(mail).subscribe(resp =>{
      
      this.router.navigate(['/home'])
      console.log(resp)
    },
    err =>{
      if(err.status == 401) alert("Compruebe su email o contraseña...")
    });
  }

  public Modal(){
      let mailInput= document.getElementById("modal_popup")
      console.log(mailInput)
      mailInput.style.display = "flex"
      document.querySelector('.close-btn').addEventListener('click', ()=> {
      mailInput.style.display = "none"
    })
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
