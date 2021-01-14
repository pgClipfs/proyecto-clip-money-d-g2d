import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  
  //Hace visible el input para ingresar dinero 

  public verRetirarMonto() {
    var ingresarMont = document.getElementById('ingresar_monto')
    ingresarMont.classList.remove("noVisible");
    var ingresarMont = document.getElementById('ingresar_monto_retirar')
    ingresarMont.classList.add("noVisible");
  }

  //Hace visible el input para retirar dinero 

  public verIngresarMonto() {
    var ingresarMont = document.getElementById('ingresar_monto_retirar')
    ingresarMont.classList.remove("noVisible");
    var ingresarMont = document.getElementById('ingresar_monto')
    ingresarMont.classList.add("noVisible");
  }

  //Acepta el monto ingresado   

  public ingresarAceptarMonto() {
    var ingresarMont = document.getElementById('ingresar_monto')
    ingresarMont.classList.add("noVisible");
  }

  //Acepta el monto a retirar   

  public retirarAceptarMonto() {
    var ingresarMont = document.getElementById('ingresar_monto_retirar')
    ingresarMont.classList.add("noVisible");
  }

}
