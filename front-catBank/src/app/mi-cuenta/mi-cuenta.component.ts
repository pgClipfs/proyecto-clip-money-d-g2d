import { HttpRequest } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {authToken} from 'src/app/models/authToken';
import { ModifyUser } from '../models/ModifyUserModel';
import { MiCuentaService } from '../services/mi-cuenta.service';


@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.scss']

})



export class MiCuentaComponent implements OnInit {
  public ModifyInfo: ModifyUser[];
  selectedModifyInfo: ModifyUser = new ModifyUser();
  setValue() {
    this.selectedModifyInfo.Id = localStorage.getItem('Cliente')
    
  }
  modifyUserInfoForm= new FormGroup({
    Id: new FormControl(localStorage.getItem('Cliente')),
    Pais: new FormControl({value: null, disabled: true}),
    Localidad: new FormControl({value: null, disabled: true}),
    Mail: new FormControl({value: null, disabled: true}),
    Telefono: new FormControl({value: null, disabled: true})
  })


  token = new authToken();
  getPais: string = ''
  getCiudad: string = ''
  getMail: string = ''
  getTelefono: string = ''
  

  constructor(private miCuentaService: MiCuentaService,  private router: Router) { }

  ngOnInit(): void {
    this.token.Jwt = localStorage.getItem('token');
    
    this.miCuentaService.userInfo()
      .subscribe( resp =>{
        const id= localStorage.setItem('Cliente', resp['idCliente'])
          const nombre= document.getElementById('nombre')
          const apellido = document.getElementById('apellido')
          const dni = document.getElementById('dni')
          const usuario = document.getElementById('usuario')
          nombre.innerHTML = `${resp['nombre']}`
          apellido.innerHTML = `${resp['apellido']}`
          dni.innerHTML = `${resp['dni']}`
          usuario.innerHTML = `${resp['usuario']}`
          this.getPais = resp['pais'] 
          this.getCiudad = resp['localidad']
          this.getMail = resp['mail']
          this.getTelefono = resp['telefono']
           
    
    },
    err =>{
      console.log(err)
    });
    
  }

  public editarPais() { 
    let editarButton = document.getElementById('btnPais')
    let aceptarButton = document.getElementById('aceptarPais')
    this.modifyUserInfoForm.get('Pais').enable()
    editarButton.classList.add("noVisible");
    aceptarButton.classList.remove("noVisible");
  }
  public aceptarValorPais(form: NgForm, ModifyInfo: ModifyUser ) {  
    console.log(ModifyInfo)
    console.log(form) 
    let editarButton = document.getElementById('btnPais')
    let aceptarButton = document.getElementById('aceptarPais')
    this.modifyUserInfoForm.get('Pais').disable()
    editarButton.classList.remove("noVisible");
    aceptarButton.classList.add("noVisible"); 
    this.setValue() 
    this.miCuentaService.modifyInfo(ModifyInfo).subscribe(resp =>{
      
      
      console.log(resp)
    },
    err =>{
      if(err.status == 401) console.log(err)
    });
  }

  public editarCiudad() { 
    let editarButton = document.getElementById('btnCiudad')
    let aceptarButton = document.getElementById('aceptarCiudad')
    this.modifyUserInfoForm.get('Localidad').enable()
    editarButton.classList.add("noVisible");
    aceptarButton.classList.remove("noVisible");

  }
  public aceptarValorCiudad(form: NgForm, ModifyInfo: ModifyUser ) {    
    let editarButton = document.getElementById('btnCiudad')
    let aceptarButton = document.getElementById('aceptarCiudad')
    this.modifyUserInfoForm.get('Localidad').disable()
    editarButton.classList.remove("noVisible");
    aceptarButton.classList.add("noVisible");
    this.setValue() 
    this.miCuentaService.modifyInfo(ModifyInfo).subscribe(resp =>{
      
      
      console.log(resp)
    },
    err =>{
      if(err.status == 401) console.log(err)
    });
  }

  public editarMail() { 
    let editar= document.getElementById('btnMail')
    let aceptar = document.getElementById('aceptarMail')
    this.modifyUserInfoForm.get('Mail').enable()
    editar.classList.add("noVisible");
    aceptar.classList.remove("noVisible");

  }
  public aceptarValorMail(form: NgForm, ModifyInfo: ModifyUser ) {    
    let editarButton = document.getElementById('btnMail')
    let aceptarButton = document.getElementById('aceptarMail')
    this.modifyUserInfoForm.get('Mail').disable()
    editarButton.classList.remove("noVisible");
    aceptarButton.classList.add("noVisible");
    this.setValue() 
    this.miCuentaService.modifyInfo(ModifyInfo).subscribe(resp =>{
      
      
      console.log(resp)
    },
    err =>{
      if(err.status == 401) console.log(err)
    });
  }


  public editarTelefono() { 
    let editarButton = document.getElementById('btnTelefono')
    let aceptarButton = document.getElementById('aceptarTelefono')
    this.modifyUserInfoForm.get('Telefono').enable() 
    editarButton.classList.add("noVisible");
    aceptarButton.classList.remove("noVisible");
  }
  public aceptarValorTelefono(form: NgForm, ModifyInfo: ModifyUser ) {    
    let editarButton = document.getElementById('btnTelefono')
    let aceptarButton = document.getElementById('aceptarTelefono')
    this.modifyUserInfoForm.get('Telefono').disable()
    editarButton.classList.remove("noVisible");
    aceptarButton.classList.add("noVisible");
    this.setValue() 
    this.miCuentaService.modifyInfo(ModifyInfo).subscribe(resp =>{
      
      
      console.log(resp)
    },
    err =>{
      if(err.status == 401) console.log(err)
    });
  }




}
