import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { newPass } from 'src/app/models/newPassModel';
import { NewPassService } from 'src/app/services/new-pass.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-new-pass',
  templateUrl: './new-pass.component.html',
  styleUrls: ['./new-pass.component.scss']
})


export class NewPassComponent implements OnInit {
  coche: {token: string};
  public newPass: newPass[];
  selectedPassReset: newPass = new newPass();
  public tok = this.rutaActiva.snapshot.params.token;
  setValue() {
    this.selectedPassReset.Token = this.rutaActiva.snapshot.params.token;
  }
  

  newPassForm= new FormGroup({
    token: new FormControl( this.selectedPassReset.Token == this.rutaActiva.snapshot.params.token),
    password: new FormControl(''),
    password2: new FormControl('')
  })
  constructor(private passReset: NewPassService, private router: Router, private rutaActiva: ActivatedRoute) { }
  
  ngOnInit(): void {
  }
  
  public mostrarPassword(){
    let passwordTypeInput  =  'password';
    console.log('mostrar pass')
    let Password = document.querySelector('#password');
    let pass2 = document.querySelector('#password2');
    let icon = document.querySelector('.icon');
    console.log(icon)
    if ( Password ) {
      // Password.type = "password"
      // pass2.type = "password"
      icon.classList.remove('fa', 'fa-eye')
      icon.classList.add("fa", "fa-eye-slash");
  } else {
    typeof Password === "string"
    typeof pass2 === "string"
      icon.classList.remove('fa', 'fa-eye-slash')
      icon.classList.add("fa", "fa-eye");      
  }
  }

  public checkPass(form: NgForm, newPass: newPass) { 
    let msje_error = document.querySelector('.error_message')
    this.setValue()
    if(this.selectedPassReset.Password === this.selectedPassReset.Password2) {
     
      msje_error.textContent = ''
      this.passReset.resetPass(newPass).subscribe(resp =>{
      
        this.router.navigate(['/login'])
        console.log(resp)
      },
      err =>{
        if(err.status == 401) msje_error.textContent = "No tienes permisos para realizar esta operación"
      });
    } else {
      msje_error.textContent = "Las contraseñas no son iguales."
    }
  }

}
