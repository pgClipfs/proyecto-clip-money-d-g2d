import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.scss']
})
export class MiCuentaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public editarPais(){
    let editarInput = document.getElementById('inputPais')
    let editarButton = document.getElementById('btnPais')
    let aceptarButton = document.getElementById('aceptarPais')

    editarButton.classList.add("noVisible");
    aceptarButton.classList.remove("noVisible");    
    editarInput.textContent = " ";
  }

  public aceptarValorPais() {
    let editarInput = document.getElementById('inputPais')
    let editarButton = document.getElementById('btnPais')
    let aceptarButton = document.getElementById('aceptarPais')

    editarButton.classList.remove("noVisible");
    aceptarButton.classList.add("noVisible");
    editarInput.innerText = editarInput.textContent; 
  }

}
