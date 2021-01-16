import { HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {authToken} from 'src/app/models/authToken';
import { MiCuentaService } from '../services/mi-cuenta.service';


@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.scss']

})



export class MiCuentaComponent implements OnInit {

<<<<<<< HEAD
  token = new authToken();
  

  constructor(private miCuentaService: MiCuentaService,  private router: Router) { }

  ngOnInit(): void {
    this.token.Jwt = localStorage.getItem('token');
    console.log(this.token)
    this.miCuentaService.getUserInfo(this.token).subscribe(resp =>{
      
      this.router.navigate(['/login'])
      console.log(resp)
    },
    err =>{
      console.log(err)
    });
  }
=======
  disabledBtn: boolean = true
  disabledBtnTelefono: boolean = true
  disabledBtnMail: boolean = true 
  disabledBtnCiudad: boolean = true
  

  constructor() { }

  ngOnInit(): void {

    
  }

  public editarPais() { 
    let editarButton = document.getElementById('btnPais')
    let aceptarButton = document.getElementById('aceptarPais')
    this.disabledBtn = false 
    editarButton.classList.add("noVisible");
    aceptarButton.classList.remove("noVisible");
  }
  public aceptarValorPais() {    
    let editarButton = document.getElementById('btnPais')
    let aceptarButton = document.getElementById('aceptarPais')
    this.disabledBtn = true 
    editarButton.classList.remove("noVisible");
    aceptarButton.classList.add("noVisible");
  }

  public editarCiudad() { 
    let editarButton = document.getElementById('btnCiudad')
    let aceptarButton = document.getElementById('aceptarCiudad')
    this.disabledBtnCiudad = false 
    editarButton.classList.add("noVisible");
    aceptarButton.classList.remove("noVisible");

  }
  public aceptarValorCiudad() {    
    let editarButton = document.getElementById('btnCiudad')
    let aceptarButton = document.getElementById('aceptarCiudad')
    this.disabledBtnCiudad = true 
    editarButton.classList.remove("noVisible");
    aceptarButton.classList.add("noVisible");
  }

  public editarMail() { 
    let editar= document.getElementById('btnMail')
    let aceptar = document.getElementById('aceptarMail')
    this.disabledBtnMail = false 
    editar.classList.add("noVisible");
    aceptar.classList.remove("noVisible");

  }
  public aceptarValorMail() {    
    let editarButton = document.getElementById('btnMail')
    let aceptarButton = document.getElementById('aceptarMail')
    this.disabledBtnMail = true 
    editarButton.classList.remove("noVisible");
    aceptarButton.classList.add("noVisible");
  }


  public editarTelefono() { 
    let editarButton = document.getElementById('btnTelefono')
    let aceptarButton = document.getElementById('aceptarTelefono')
    this.disabledBtnTelefono = false 
    editarButton.classList.add("noVisible");
    aceptarButton.classList.remove("noVisible");
  }
  public aceptarValorTelefono() {    
    let editarButton = document.getElementById('btnTelefono')
    let aceptarButton = document.getElementById('aceptarTelefono')
    this.disabledBtnTelefono = true 
    editarButton.classList.remove("noVisible");
    aceptarButton.classList.add("noVisible");
  }




>>>>>>> cbe8fc2b487171b054a1961aeb67650ebb6978c8
}
