import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss']
})
export class TransaccionesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  public aceptarMonto() {
    var ingresarMont = document.getElementById('ingresar_monto')
    ingresarMont.classList.add("noVisible");
  }

  public ingresarMonto() {
    var ingresarMont = document.getElementById('ingresar_monto')
    ingresarMont.classList.remove("noVisible");
  }



}
