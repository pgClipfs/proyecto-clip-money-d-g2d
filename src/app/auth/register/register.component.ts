import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
// import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm= new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  // constructor(private authSvc:AuthService) { }
  constructor(){}

  ngOnInit(): void {
  }
  onRegister(){
     console.log(this.registerForm.value)
    // this.authSvc.register(email, password);
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
