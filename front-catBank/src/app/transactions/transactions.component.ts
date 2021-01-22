import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { OperatoriaPesos } from '../models/operatoriaPesos';
import { OperatoriaPesosService } from '../services/operatoria-pesos.service';
import { HttpRequest } from '@angular/common/http';


@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public OperatoriaPesos: OperatoriaPesos[];
  selectedingresarSaldo: OperatoriaPesos = new OperatoriaPesos();
  setValue() {
    this.selectedingresarSaldo.Id = localStorage.getItem('Cliente')
  }
  ingresarSaldoForm = new FormGroup({
    Id: new FormControl(localStorage.getItem('Cliente')),
    Monto: new FormControl(),
  })

  constructor(private transactionsService: OperatoriaPesosService,  private router: Router) { }

  ngOnInit(): void {
  }


  //Hace visible el input para ingresar dinero 

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

  public ingresarAceptarMonto(form: NgForm, IngresarSaldo: OperatoriaPesos ) {
    var ingresarMont = document.getElementById('ingresar_monto')
    const MsjeOperación = document.querySelector('.MsjeOperación')
    ingresarMont.classList.add("noVisible");
    this.setValue() 
    console.log(IngresarSaldo)
    console.log(form)
    this.transactionsService.ingresarSaldo(IngresarSaldo)
      .subscribe( resp =>{
        this.Modal()
        MsjeOperación.textContent =  `Operacíon sealizada con éxito. Su saldo es ${resp}`
        const saldoActual = document.getElementById('saldoActual')
        console.log(saldoActual)
        saldoActual.innerHTML = resp
    },
    err =>{
      this.Modal()
      MsjeOperación.textContent =  `Lo sentimos, no se puede realizar esta operación.`
    });
  }
  // Cancela el ingreso de saldo 
  public cancelarAceptarMonto( ) {
    var ingresarMont = document.getElementById('ingresar_monto')
    ingresarMont.classList.add("noVisible");
  }

  //Acepta el monto a retirar   

  public retirarAceptarMonto(form: NgForm, IngresarSaldo: OperatoriaPesos) {
    var ingresarMont = document.getElementById('ingresar_monto_retirar')
    const MsjeOperación = document.querySelector('.MsjeOperación')
    ingresarMont.classList.add("noVisible");
    this.setValue() 
    this.transactionsService.retirarSaldo(IngresarSaldo)
      .subscribe( async resp =>{
        this.Modal()
        MsjeOperación.textContent =  `Operacíon sealizada con éxito. Su saldo es ${await resp}`
        const saldoActual = document.getElementById('saldoActual')
        console.log(saldoActual)
        saldoActual.innerHTML = resp
       
    },
    err =>{
      this.Modal()
      MsjeOperación.textContent =  `Lo sentimos, no se puede realizar esta operación.`
    });
  }

  // Cancela retiro
  public cancelarRetiro() {
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
