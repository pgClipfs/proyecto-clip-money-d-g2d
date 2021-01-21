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




  //Hace visible el input del giro 

  public giro() {
    var ingresarMont = document.getElementById('ingresar_giro')
    ingresarMont.classList.remove("noVisible");
  }

  //Acepta el monto ingresado   

  public aceptarGiro() {
    var ingresarMont = document.getElementById('ingresar_giro')
    ingresarMont.classList.add("noVisible");
  }

  //Cancela el monto ingresado   

  public cancelarGiro() {
    var ingresarMont = document.getElementById('ingresar_giro')
    ingresarMont.classList.add("noVisible");
  }


   //Hace visible el input del prestamo

   public prestamo() {
    var ingresarMont = document.getElementById('ingresar_prestamo')
    ingresarMont.classList.remove("noVisible");
  }

  //Acepta el monto ingresado   

  public aceptarPrestamo() {
    var ingresarMont = document.getElementById('ingresar_prestamo')
    ingresarMont.classList.add("noVisible");
  }

  //Cancela el monto ingresado   

  public cancelarPrestamo() {
    var ingresarMont = document.getElementById('ingresar_prestamo')
    ingresarMont.classList.add("noVisible");
  }








}
